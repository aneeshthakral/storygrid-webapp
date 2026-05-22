import { Instagram, Linkedin } from "lucide-react";
import { socialLinks } from "@/data/social";

const icons = {
  linkedin: Linkedin,
  instagram: Instagram,
} as const;

export default function SocialLinks({
  className = "",
  iconSize = 18,
}: {
  className?: string;
  iconSize?: number;
}) {
  return (
    <ul className={"flex flex-wrap gap-3 " + className}>
      {socialLinks.map((link) => {
        const Icon = icons[link.id];
        return (
          <li key={link.id}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="social-icon-link group"
            >
              <Icon
                size={iconSize}
                strokeWidth={1.75}
                className="transition-transform duration-300 group-hover:scale-110"
                aria-hidden
              />
              <span className="sr-only">{link.label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
