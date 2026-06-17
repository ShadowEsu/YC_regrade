import { useEffect } from "react";
import { buildJsonLdGraph } from "../data/site-seo";

const SCRIPT_ID = "regrade-jsonld";

export function SeoSchema() {
  useEffect(() => {
    const graph = buildJsonLdGraph();
    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(graph);
  }, []);

  return null;
}
