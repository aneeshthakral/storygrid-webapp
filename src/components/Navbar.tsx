import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { mainNavLinks } from "@/data/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const navLinks = mainNavLinks;

  return (
    <header
      className={
        "fixed left-0 right-0 top-0 z-50 transition-all duration-500 " +
        (scrolled
          ? "border-b border-white/5 bg-background/75 backdrop-blur-xl"
          : "bg-transparent")
      }
    >
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 lg:px-10">
        <Logo />

        <nav className="hidden items-center gap-7 xl:gap-9 lg:flex">
          {navLinks.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={
                  "relative font-mono text-[0.72rem] uppercase tracking-[0.22em] transition-colors duration-300 hover:text-ember " +
                  (active ? "text-foreground" : "text-muted-foreground")
                }
              >
                {l.label}
                <span
                  className={
                    "absolute -bottom-2 left-0 h-px bg-ember transition-all duration-500 " +
                    (active ? "w-full" : "w-0")
                  }
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/contact" className="btn-radial hidden sm:inline-flex !px-5 !py-2.5 !text-[0.65rem]">
            Talk to Us
          </Link>
          <button
            aria-label="Menu"
            className="grid h-10 w-10 place-items-center rounded-md border border-white/10 text-foreground transition hover:border-ember hover:text-ember lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div
        className={
          "overflow-hidden border-t border-white/5 bg-background/95 backdrop-blur-xl transition-[max-height] duration-500 lg:hidden " +
          (open ? "max-h-[700px]" : "max-h-0")
        }
      >
        <nav className="flex flex-col gap-1 px-5 py-6">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="flex items-center justify-between rounded-md px-3 py-3 font-mono text-[0.78rem] uppercase tracking-[0.22em] text-muted-foreground transition hover:bg-white/5 hover:text-ember"
            >
              <span>{l.label}</span>
              <span className="text-ember">→</span>
            </Link>
          ))}
          <Link to="/contact" className="btn-radial mt-4 self-start">
            Talk to Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
