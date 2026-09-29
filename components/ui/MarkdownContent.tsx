import ReactMarkdown from "react-markdown";

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose-blog">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
