import { useEffect, useRef } from "react";

/**
 * Dot-field background with cursor "bulge" displacement and ember glow,
 * inspired by reactbits.dev/backgrounds/dot-field. Pure canvas, no deps.
 */
type Props = {
  dotRadius?: number;
  dotSpacing?: number;
  bulgeStrength?: number;
  glowRadius?: number;
  cursorRadius?: number;
  cursorForce?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
  className?: string;
};

export default function DotField({
  dotRadius = 1.4,
  dotSpacing = 22,
  bulgeStrength = 55,
  glowRadius = 220,
  cursorRadius = 360,
  cursorForce = 0.12,
  gradientFrom = "#FF5A2E",
  gradientTo = "#7A1F12",
  glowColor = "#1A0A08",
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, dpr = 1;
    type Dot = { x: number; y: number; ox: number; oy: number };
    let dots: Dot[] = [];

    const lerpColor = (a: string, b: string, t: number) => {
      const pa = parseInt(a.slice(1), 16);
      const pb = parseInt(b.slice(1), 16);
      const ar = (pa >> 16) & 255, ag = (pa >> 8) & 255, ab = pa & 255;
      const br = (pb >> 16) & 255, bg = (pb >> 8) & 255, bb = pb & 255;
      const r = Math.round(ar + (br - ar) * t);
      const g = Math.round(ag + (bg - ag) * t);
      const bl = Math.round(ab + (bb - ab) * t);
      return `rgb(${r},${g},${bl})`;
    };

    const setup = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      const cols = Math.ceil(w / dotSpacing) + 2;
      const rows = Math.ceil(h / dotSpacing) + 2;
      const offX = (w - (cols - 1) * dotSpacing) / 2;
      const offY = (h - (rows - 1) * dotSpacing) / 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = offX + c * dotSpacing;
          const y = offY + r * dotSpacing;
          dots.push({ x, y, ox: x, oy: y });
        }
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const onLeave = () => { mouseRef.current.active = false; };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // Background radial glow
      const bg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.7);
      bg.addColorStop(0, glowColor + "00");
      bg.addColorStop(1, glowColor);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const active = mouseRef.current.active;

      for (const d of dots) {
        let x = d.ox, y = d.oy;
        let glow = 0;
        if (active) {
          const dx = d.ox - mx;
          const dy = d.oy - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < cursorRadius) {
            const f = 1 - dist / cursorRadius;
            const push = bulgeStrength * f * f * cursorForce;
            x = d.ox + (dx / (dist || 1)) * push;
            y = d.oy + (dy / (dist || 1)) * push;
          }
          if (dist < glowRadius) {
            glow = 1 - dist / glowRadius;
          }
        }
        const col = lerpColor(gradientTo, gradientFrom, glow);
        ctx.beginPath();
        ctx.fillStyle = col;
        ctx.globalAlpha = 0.35 + 0.65 * glow;
        ctx.arc(x, y, dotRadius + glow * 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    setup();
    draw();
    const ro = new ResizeObserver(setup);
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [dotRadius, dotSpacing, bulgeStrength, glowRadius, cursorRadius, cursorForce, gradientFrom, gradientTo, glowColor]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={"absolute inset-0 h-full w-full " + className}
    />
  );
}
