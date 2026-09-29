import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  content: string;
  className?: string;
  block?: boolean;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ content, className = '', block = false }) => {
  const renderedHtml = useMemo(() => {
    if (!content) return '';

    // If whole string is meant to be rendered as LaTeX directly
    if (block) {
      try {
        return katex.renderToString(content, {
          displayMode: true,
          throwOnError: false,
        });
      } catch (e) {
        console.error('KaTeX rendering error:', e);
        return content;
      }
    }

    // Parse inline ($...$) and display ($$...$$) math in markdown-like text
    // Replace $$...$$ first, then $...$
    const displayMathRegex = /\$\$([\s\S]+?)\$\$/g;
    const inlineMathRegex = /\$([^\$\n]+?)\$/g;

    let processed = content.replace(displayMathRegex, (_, math) => {
      try {
        return `<div class="katex-display">${katex.renderToString(math.trim(), {
          displayMode: true,
          throwOnError: false,
        })}</div>`;
      } catch {
        return `$$${math}$$`;
      }
    });

    processed = processed.replace(inlineMathRegex, (_, math) => {
      try {
        return katex.renderToString(math.trim(), {
          displayMode: false,
          throwOnError: false,
        });
      } catch {
        return `$${math}$`;
      }
    });

    return processed;
  }, [content, block]);

  if (block || content.includes('$')) {
    return (
      <span
        className={`math-rendered ${className}`}
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
      />
    );
  }

  return <span className={className}>{content}</span>;
};
