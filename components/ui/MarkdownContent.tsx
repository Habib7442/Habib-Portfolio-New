import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// remark-gfm adds GitHub-flavoured Markdown: tables, strikethrough, task lists, autolinked URLs.
export default function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose-blog">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Wide tables scroll sideways inside their card on phones instead of breaking the page width.
          table: ({ node: _node, ...props }) => (
            <div className="table-wrap">
              <table {...props} />
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
