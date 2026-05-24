import { useEffect, useState, type RefObject } from "react";

export type LogoLook = { x: number; y: number };

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

/**
 * Normalized look direction from global pointer position vs logo center (-1 … 1).
 * Tracks cursor anywhere on the screen, not only over the logo.
 */
export function useLogoLook(ref: RefObject<HTMLElement | null>) {
  const [look, setLook] = useState<LogoLook>({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = clientX - cx;
      const dy = clientY - cy;

      // Scale by viewport so moving anywhere on screen tilts the agent.
      const nx = dx / (window.innerWidth * 0.42);
      const ny = dy / (window.innerHeight * 0.42);

      setLook({
        x: clamp(nx, -1, 1),
        y: clamp(ny, -1, 1),
      });
    };

    const onMove = (e: MouseEvent) => update(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) update(touch.clientX, touch.clientY);
    };
    const onLeaveWindow = (e: MouseEvent) => {
      if (!e.relatedTarget) setLook({ x: 0, y: 0 });
    };

    const onTouchEnd = () => setLook({ x: 0, y: 0 });

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
    };
  }, [ref]);

  return look;
}
