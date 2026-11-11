import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Some posts start with their own title as "# Title", which the page header already shows as the h1.
function withoutRepeatedTitle(content: string, title: string) {
  const [firstLine, ...rest] = content.trimStart().split("\n");
  // trim() first: content pasted from Windows ends its lines with \r, which "." won't match.
  const heading = firstLine.trim().match(/^#\s+(.*)$/)?.[1];
  return heading === title.trim() ? rest.join("\n") : content;
}

// remark-gfm adds GitHub-flavoured Markdown: tables, strikethrough, task lists, autolinked URLs.
export default function MarkdownContent({ content, title }: { content: string; title: string }) {
  return (
    <div className="prose-blog">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // The page header owns the only h1.
          h1: ({ node: _node, ...props }) => <h2 {...props} />,
          // Wide tables scroll sideways inside their card on phones instead of breaking the page width.
          table: ({ node: _node, ...props }) => (
            <div className="table-wrap">
              <table {...props} />
            </div>
          ),
        }}
      >
        {withoutRepeatedTitle(content, title)}
      </ReactMarkdown>
    </div>
  );
}
