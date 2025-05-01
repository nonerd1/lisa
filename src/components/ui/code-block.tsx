"use client";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const customStyle = {
  fontSize: '15px',
  lineHeight: '1.6',
  margin: 0,
  padding: '1.5rem',
  background: '#1e1e1e',
  borderRadius: '0.75rem',
};

export default function CodeBlock({ code, language = 'c' }: CodeBlockProps) {
  return (
    <div className="rounded-xl overflow-hidden">
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={customStyle}
        showLineNumbers
        wrapLines
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
} 