#!/usr/bin/env bash
# Turns a screen recording into a web-ready preview loop for VideoPreview cards.
#
#   scripts/compress-preview.sh <input.mp4> [output-name] [start-seconds] [length-seconds]
#
#   output-name     defaults to the input's file name; files land next to the input
#   start-seconds   where the loop starts in the recording (default 0)
#   length-seconds  12–15 (default 14)
#
# Writes <name>-preview.mp4 (H.264, CRF 26), <name>-preview.webm (VP9) and <name>-poster.jpg
# (first frame of the loop): 1280px wide, no audio. If the MP4 lands over 3 MB the CRF is raised
# in steps until it fits. Upload all three in Sanity Studio: Landing Page → Video preview.
# Needs ffmpeg on PATH.
set -euo pipefail

TARGET_BYTES=$((3 * 1024 * 1024))
MAX_CRF=34

if [[ $# -lt 1 || ! -f "$1" ]]; then
  sed -n '2,15p' "$0" | sed 's/^# \{0,1\}//'
  exit 1
fi
command -v ffmpeg >/dev/null || { echo "ffmpeg not found on PATH" >&2; exit 1; }

input=$1
name=${2:-$(basename "${input%.*}")}
start=${3:-0}
length=${4:-14}
if ! awk -v l="$length" 'BEGIN { exit !(l >= 12 && l <= 15) }'; then
  echo "length must be 12–15 seconds (got $length)" >&2
  exit 1
fi

dir=$(dirname "$input")
mp4="$dir/$name-preview.mp4"
webm="$dir/$name-preview.webm"
poster="$dir/$name-poster.jpg"

# 1280px wide, height rounded to an even number (needed by H.264/VP9), 30fps keeps loops smooth and small.
filters="scale=1280:-2:flags=lanczos,fps=30,format=yuv420p"
trim=(-ss "$start" -t "$length" -i "$input")

size() { wc -c <"$1" | tr -d ' '; }
mb() { awk -v b="$1" 'BEGIN { printf "%.2f MB", b / 1048576 }'; }

crf=26
while :; do
  echo "→ MP4 (H.264, CRF $crf)"
  ffmpeg -hide_banner -loglevel error -y "${trim[@]}" -vf "$filters" -an \
    -c:v libx264 -preset slow -crf "$crf" -profile:v high -movflags +faststart "$mp4"
  bytes=$(size "$mp4")
  if (( bytes <= TARGET_BYTES || crf >= MAX_CRF )); then break; fi
  echo "  $(mb "$bytes") is over 3 MB, retrying"
  crf=$((crf + 2))
done
mp4_crf=$crf

# VP9 CRF runs on a different scale; 36 is roughly as sharp as H.264 at 26, and smaller.
crf=36
while :; do
  echo "→ WebM (VP9, CRF $crf)"
  ffmpeg -hide_banner -loglevel error -y "${trim[@]}" -vf "$filters" -an \
    -c:v libvpx-vp9 -crf "$crf" -b:v 0 -row-mt 1 -deadline good -cpu-used 2 "$webm"
  bytes=$(size "$webm")
  if (( bytes <= TARGET_BYTES || crf >= MAX_CRF + 10 )); then break; fi
  echo "  $(mb "$bytes") is over 3 MB, retrying"
  crf=$((crf + 3))
done

echo "→ Poster (first frame)"
ffmpeg -hide_banner -loglevel error -y -ss "$start" -i "$input" -frames:v 1 \
  -vf "scale=1280:-2:flags=lanczos" -q:v 3 "$poster"

echo
printf '%-40s %s\n' "$mp4" "$(mb "$(size "$mp4")") (CRF $mp4_crf)" "$webm" "$(mb "$(size "$webm")")" "$poster" "$(mb "$(size "$poster")")"
for f in "$mp4" "$webm"; do
  if (( $(size "$f") > TARGET_BYTES )); then
    echo "⚠ $f is still over 3 MB — try a shorter or calmer part of the recording." >&2
  fi
done
