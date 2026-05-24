import { useCallback, useEffect, useRef, useState } from "react";

/** Mixkit — "Technological information in a digital world" (free license) */
const SHOWREEL_SRC = "/videos/showreel.mp4";

export default function ShowreelScroll() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [progress, setProgress] = useState(0);

  const tryPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video || video.readyState < 2) return;

    video.muted = true;
    video.defaultMuted = true;

    const attempt = video.play();
    if (attempt !== undefined) {
      attempt.catch(() => {
        /* Browsers may block until visible; IntersectionObserver retries. */
      });
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const seen = vh - rect.top;
      setProgress(Math.max(0, Math.min(1, seen / total)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");

    const onReady = () => tryPlay();

    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);
    video.addEventListener("canplaythrough", onReady);

    if (video.readyState >= 2) tryPlay();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
      },
      { threshold: 0.1 },
    );
    observer.observe(video);

    return () => {
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("canplaythrough", onReady);
      observer.disconnect();
    };
  }, [tryPlay]);

  const t = Math.max(0, Math.min(1, (progress - 0.15) / 0.5));
  const ease = 1 - Math.pow(1 - t, 3);
  const scale = 0.78 + ease * 0.22;
  const translateY = (1 - ease) * 80;
  const radius = 28 - ease * 18;
  const opacity = 0.4 + ease * 0.6;

  return (
    <section ref={wrapRef} className="relative mx-auto max-w-7xl px-5 py-6 lg:px-10 lg:py-8">
      <div
        className="relative mx-auto aspect-video w-full max-w-6xl overflow-hidden border border-white/10 bg-black shadow-[0_50px_120px_-40px_rgba(255,92,43,0.35)] will-change-transform"
        style={{
          transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
          borderRadius: `${radius}px`,
          opacity,
          transition: "border-color 400ms ease",
        }}
      >
        <span className="pointer-events-none absolute left-3 top-3 z-10 h-4 w-4 border-l border-t border-ember/60" />
        <span className="pointer-events-none absolute right-3 top-3 z-10 h-4 w-4 border-r border-t border-ember/60" />
        <span className="pointer-events-none absolute left-3 bottom-3 z-10 h-4 w-4 border-l border-b border-ember/60" />
        <span className="pointer-events-none absolute right-3 bottom-3 z-10 h-4 w-4 border-r border-b border-ember/60" />

        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-label="Showreel preview — coming soon"
        >
          <source src={SHOWREEL_SRC} type="video/mp4" />
        </video>

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 55%, rgba(0,0,0,0) 55%, rgba(15,8,6,0.4) 100%)",
          }}
        />

        <p className="label-mono pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2 !text-foreground/75">
          Showreel — Coming Soon
        </p>
      </div>
    </section>
  );
}
