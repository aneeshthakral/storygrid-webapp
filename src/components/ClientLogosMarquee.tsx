import LogoLoop from "@/components/LogoLoop/LogoLoop";
import Reveal from "@/components/Reveal";
import { clientLogos } from "@/data/clientLogos";

export default function ClientLogosMarquee() {
  return (
    <section
      className="client-logos-marquee relative z-[1] border-t border-white/5 py-14 lg:py-20"
      aria-labelledby="client-logos-heading"
    >
      <Reveal>
        <p id="client-logos-heading" className="label-mono text-center">
          Trusted by teams we&apos;ve worked with
        </p>
      </Reveal>

      <div className="relative mt-10 w-full overflow-hidden">
        <LogoLoop
          logos={clientLogos}
          speed={80}
          direction="left"
          logoHeight={52}
          gap={72}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="var(--background)"
          ariaLabel="Client company logos"
          className="w-full"
        />
      </div>
    </section>
  );
}
