import { useRef } from "react";
import { Link } from "react-router-dom";
import StoryGridLogoMark from "@/components/StoryGridLogoMark";
import { useLogoLook } from "@/hooks/useLogoLook";

export default function Logo({ className = "" }: { className?: string }) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const look = useLogoLook(linkRef);

  return (
    <Link
      ref={linkRef}
      to="/"
      aria-label="StoryGrid & Co home"
      className={"group inline-flex items-center " + className}
    >
      <StoryGridLogoMark variant="icon" look={look} className="h-10 w-10 sm:hidden" />
      <StoryGridLogoMark variant="full" look={look} className="hidden h-9 w-[12.5rem] sm:block" />
      <span className="sr-only">StoryGrid & Co</span>
    </Link>
  );
}
