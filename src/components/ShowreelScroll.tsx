import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

/**
 * Showreel section. As the user scrolls the section into view the
 * video scales up and eases upward, then locks. Pure scroll-progress
 * driven (no scrolling-pinning library) so it stays smooth and simple.
 */
export default function ShowreelScroll() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when section bottom hits bottom of viewport,
      // 1 when section top reaches top of viewport.
      const total = rect.height + vh;
      const seen = vh - rect.top;
      const p = Math.max(0, Math.min(1, seen / total));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Animate from p=0.15 to p=0.65
  const t = Math.max(0, Math.min(1, (progress - 0.15) / 0.5));
  const ease = 1 - Math.pow(1 - t, 3); // ease-out cubic
  const scale = 0.78 + ease * 0.22;
  const translateY = (1 - ease) * 80; // px upward
  const radius = 28 - ease * 18;
  const opacity = 0.4 + ease * 0.6;

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  return (
    <section ref={wrapRef} className="relative mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
      {/* <div className="mb-12 flex items-end justify-between gap-6">
        <div>
          <p className="label-mono">The Showreel</p>
          <h2 className="mt-4 max-w-2xl text-4xl md:text-5xl">
            A narrative machine in motion.
          </h2>
        </div>
        <p className="hidden max-w-sm text-sm text-muted-foreground md:block">
          Scroll to play. The reel rises with you — the same way a category
          rises with its story.
        </p>
      </div> */}

      <div
        className="relative mx-auto aspect-video w-full max-w-6xl overflow-hidden border border-white/10 bg-black/40 shadow-[0_50px_120px_-40px_rgba(255,92,43,0.35)] will-change-transform"
        style={{
          transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
          borderRadius: `${radius}px`,
          opacity,
          transition: "border-color 400ms ease",
        }}
      >
        {/* Frame ticks */}
        <span className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-ember/60" />
        <span className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r border-t border-ember/60" />
        <span className="pointer-events-none absolute left-3 bottom-3 h-4 w-4 border-l border-b border-ember/60" />
        <span className="pointer-events-none absolute right-3 bottom-3 h-4 w-4 border-r border-b border-ember/60" />

        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src="https://cdn.coverr.co/videos/coverr-typing-on-a-laptop-keyboard-0246/1080p.mp4"
          poster="https://media.istockphoto.com/id/2154500787/photo/3d-rendering-coming-soon-text-with-screen-effects-of-technological-glitches.jpg?s=1024x1024&w=is&k=20&c=KnKCnK9rkFs-Q8uLAbjgsXMM3cDtDs3ghlWNV954Ldo="
          loop
          muted
          playsInline
          preload="metadata"
        />

        {/* Veil */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 55%, rgba(0,0,0,0) 30%, rgba(15,8,6,0.8) 95%)",
          }}
        />

        <button
          onClick={togglePlay}
          aria-label={playing ? "Pause showreel" : "Play showreel"}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-3 text-foreground"
        >
          <span className="relative grid h-16 w-16 place-items-center rounded-full border border-ember/70 bg-background/30 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:bg-ember/80">
            <Play size={20} className="translate-x-[1px] fill-current" />
            {!playing && <span className="absolute inset-0 rounded-full pulse-ring" />}
          </span>
          <span className="label-mono !text-foreground/80">
            {playing ? "Now Playing" : "Showreel — Coming Soon"}
          </span>
        </button>
      </div>
    </section>
  );
}
