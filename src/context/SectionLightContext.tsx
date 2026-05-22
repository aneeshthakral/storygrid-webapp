import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

type SectionLightContextValue = {
  setSectionLit: (id: string, lit: boolean) => void;
};

const SectionLightContext = createContext<SectionLightContextValue | null>(null);

export function SectionLightProvider({ children }: { children: ReactNode }) {
  const litIdsRef = useRef(new Set<string>());

  const syncDocument = useCallback((lit: boolean) => {
    document.documentElement.classList.toggle("site-light--active", lit);
  }, []);

  const setSectionLit = useCallback(
    (id: string, lit: boolean) => {
      if (lit) litIdsRef.current.add(id);
      else litIdsRef.current.delete(id);

      syncDocument(litIdsRef.current.size > 0);
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
