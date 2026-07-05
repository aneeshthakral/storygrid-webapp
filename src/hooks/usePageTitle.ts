import { useEffect } from "react";

type PageMetaOptions = {
  robots?: string;
};

export function usePageTitle(title: string, options?: PageMetaOptions) {
  useEffect(() => {
    document.title = title;

    if (options?.robots) {
      let el = document.querySelector('meta[name="robots"]');
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", "robots");
        document.head.appendChild(el);
      }
      el.setAttribute("content", options.robots);
    }

    return () => {
      if (options?.robots) {
        const el = document.querySelector('meta[name="robots"]');
        if (el?.getAttribute("content") === options.robots) {
          el.remove();
        }
      }
    };
  }, [title, options?.robots]);
}
