"use client";
import React from "react";
import { cn } from "@/lib/utils";

export function BackgroundGrid({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center bg-background",
        className
      )}
    >
      <div className="absolute inset-0 h-full w-full bg-background bg-[linear-gradient(to_right,rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(circle_800px_at_100%_200px,rgba(255,0,255,0.15),transparent)]" />
      {children}
    </div>
  );
}

export function BackgroundGridSmall({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center bg-background",
        className
      )}
    >
      <div className="absolute inset-0 h-full w-full bg-background bg-[linear-gradient(to_right,rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
      {children}
    </div>
  );
}
