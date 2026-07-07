import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { isNavGroup, mainNavEntries } from "@/data/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  const navEntries = mainNavEntries;

  return (
    <header
      className={
        "fixed left-0 right-0 top-0 z-50 transition-all duration-500 " +
        (scrolled ? "border-b border-border bg-background/75 backdrop-blur-xl" : "bg-transparent")
      }
    >
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 lg:px-10">
        <Logo />

        <nav className="hidden items-center gap-7 xl:gap-9 lg:flex">
          {navEntries.map((entry) => {
            if (isNavGroup(entry)) {
              return (
                <NavigationMenu key={entry.label} className="max-w-none flex-none">
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="h-auto bg-transparent p-0 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 hover:bg-transparent hover:text-ember data-[state=open]:bg-transparent data-[state=open]:text-ember">
                        {entry.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="min-w-[220px] space-y-1 rounded-md border border-white/10 bg-popover p-2 text-popover-foreground">
                          {entry.children.map((child) => (
                            <li key={child.to}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={child.to}
                                  className="block rounded-md px-3 py-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground transition hover:bg-white/5 hover:text-ember"
                                >
                                  {child.label}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              );
            }

            const active = location.pathname === entry.to;
            return (
              <Link
                key={entry.to}
                to={entry.to}
                className={
                  "relative font-mono text-[0.72rem] uppercase tracking-[0.22em] transition-colors duration-300 hover:text-ember " +
                  (active ? "text-foreground" : "text-muted-foreground")
                }
              >
                {entry.label}
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
          <Link
            to="/contact"
            className="btn-radial hidden sm:inline-flex !px-5 !py-2.5 !text-[0.65rem]"
          >
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
          "overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl transition-[max-height] duration-500 lg:hidden " +
          (open ? "max-h-[700px]" : "max-h-0")
        }
      >
        <nav className="flex flex-col gap-1 px-5 py-6">
          {navEntries.map((entry) => {
            if (isNavGroup(entry)) {
              return (
                <div key={entry.label}>
                  <button
                    type="button"
                    onClick={() => setServicesOpen((v) => !v)}
                    className="flex w-full items-center justify-between rounded-md px-3 py-3 font-mono text-[0.78rem] uppercase tracking-[0.22em] text-muted-foreground transition hover:bg-white/5 hover:text-ember"
                  >
                    <span>{entry.label}</span>
                    <ChevronDown
                      size={16}
                      className={
                        "text-ember transition-transform duration-300 " +
                        (servicesOpen ? "rotate-180" : "")
                      }
                    />
                  </button>
                  <div
                    className={
                      "overflow-hidden pl-4 transition-[max-height] duration-300 " +
                      (servicesOpen ? "max-h-60" : "max-h-0")
                    }
                  >
                    {entry.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className="flex items-center justify-between rounded-md px-3 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground transition hover:bg-white/5 hover:text-ember"
                      >
                        <span>{child.label}</span>
                        <span className="text-ember">→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={entry.to}
                to={entry.to}
                className="flex items-center justify-between rounded-md px-3 py-3 font-mono text-[0.78rem] uppercase tracking-[0.22em] text-muted-foreground transition hover:bg-white/5 hover:text-ember"
              >
                <span>{entry.label}</span>
                <span className="text-ember">→</span>
              </Link>
            );
          })}
          <Link to="/contact" className="btn-radial mt-4 self-start">
            Talk to Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
