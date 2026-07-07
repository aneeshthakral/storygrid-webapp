import { useEffect } from "react";

type JsonLdBlock = Record<string, unknown>;

type SeoOptions = {
  description: string;
  ogTitle?: string;
  jsonLd?: JsonLdBlock[];
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function useSeo(title: string, options: SeoOptions) {
  useEffect(() => {
    document.title = title;
    upsertMeta("name", "description", options.description);
    upsertMeta("property", "og:title", options.ogTitle ?? title);
    upsertMeta("property", "og:description", options.description);
    upsertMeta("name", "twitter:title", options.ogTitle ?? title);
    upsertMeta("name", "twitter:description", options.description);

    const scripts: HTMLScriptElement[] = [];
    (options.jsonLd ?? []).forEach((block, i) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = `seo-jsonld-${i}`;
      script.textContent = JSON.stringify(block);
      document.head.appendChild(script);
      scripts.push(script);
    });

    return () => {
      scripts.forEach((s) => s.remove());
    };
  }, [title, options.description, options.ogTitle, options.jsonLd]);
}
