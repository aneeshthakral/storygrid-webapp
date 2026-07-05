import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

type SectionLightContextValue = {
  setSectionLit: (id: string, lit: boolean, options?: { instant?: boolean }) => void;
};

const SectionLightContext = createContext<SectionLightContextValue | null>(null);

export function SectionLightProvider({ children }: { children: ReactNode }) {
  const litIdsRef = useRef(new Set<string>());

  const syncDocument = useCallback((lit: boolean, instant = false) => {
    const root = document.documentElement;

    if (instant && !lit) {
      root.classList.add("site-light--instant");
      root.classList.remove("site-light--active");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          root.classList.remove("site-light--instant");
        });
      });
      return;
    }

    root.classList.remove("site-light--instant");
    root.classList.toggle("site-light--active", lit);
  }, []);

  const setSectionLit = useCallback(
    (id: string, lit: boolean, options?: { instant?: boolean }) => {
      const wasLit = litIdsRef.current.size > 0;

      if (lit) litIdsRef.current.add(id);
      else litIdsRef.current.delete(id);

      const nowLit = litIdsRef.current.size > 0;

      if (wasLit && !nowLit && options?.instant) {
        syncDocument(false, true);
      } else {
        syncDocument(nowLit);
      }
    },
    [syncDocument],
  );

  useEffect(() => {
    return () => syncDocument(false);
  }, [syncDocument]);

  return (
    <SectionLightContext.Provider value={{ setSectionLit }}>
      {children}
    </SectionLightContext.Provider>
  );
}

export function useSectionLightContext() {
  const ctx = useContext(SectionLightContext);
  if (!ctx) {
    throw new Error("useSectionLightContext must be used within SectionLightProvider");
  }
  return ctx;
}
