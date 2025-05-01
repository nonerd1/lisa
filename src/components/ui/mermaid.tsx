"use client";

import { useEffect, useRef } from "react";

interface MermaidProps {
  chart: string;
}

const Mermaid = ({ chart }: MermaidProps) => {
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderMermaid = async () => {
      try {
        if (typeof window !== "undefined" && mermaidRef.current) {
          const { default: mermaid } = await import("mermaid");

          // Configure Mermaid with dark theme
          mermaid.initialize({
            startOnLoad: false,
            theme: "dark",
            securityLevel: "loose",
            themeVariables: {
              primaryColor: "#2563eb",
              primaryTextColor: "#ffffff",
              primaryBorderColor: "#2563eb",
              lineColor: "#ffffff",
              secondaryColor: "#252525",
              tertiaryColor: "#1e1e1e",
              tertiaryTextColor: "#ffffff",
            },
          });

          // Clear any previous diagrams
          if (mermaidRef.current) {
            const id = "mermaid-" + Math.random().toString(36).substr(2, 9);
            const { svg } = await mermaid.render(id, chart);
            mermaidRef.current.innerHTML = svg;
          }
        }
      } catch (error) {
        console.error("Error rendering Mermaid diagram:", error);
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = '<div class="text-red-500">Error rendering diagram</div>';
        }
      }
    };

    renderMermaid();
  }, [chart]);

  return (
    <div className="mermaid-wrapper overflow-auto">
      <div ref={mermaidRef} className="mermaid">
        {chart}
      </div>
    </div>
  );
};

export default Mermaid; 