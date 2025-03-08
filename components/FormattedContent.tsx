import React from "react";

interface FormattedContentProps {
  content: string;
}

const FormattedContent: React.FC<FormattedContentProps> = ({ content }) => {
  // Split content by span tags (but keep them)
  const parts = content.split(/(<span.*?<\/span>)/);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("<span")) {
          // Extract style and content from span tags
          const styleMatch = part.match(/style="([^"]*)"/);
          const contentMatch = part.match(/<span.*?>(.*?)<\/span>/);

          const style = styleMatch
            ? styleMatch[1].split(";").reduce((acc, style) => {
                const [key, value] = style.split(":");
                if (key && value) {
                  // Convert CSS property names to camelCase for React
                  const camelKey = key
                    .trim()
                    .replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                  acc[camelKey] = value.trim();
                }
                return acc;
              }, {} as Record<string, string>)
            : {};

          const textContent = contentMatch ? contentMatch[1] : "";

          return (
            <span key={index} style={style}>
              {textContent}
            </span>
          );
        }

        // Handle line breaks for plain text
        return (
          <React.Fragment key={index}>
            {part.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {i > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default FormattedContent;
