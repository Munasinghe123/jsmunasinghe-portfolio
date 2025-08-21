"use client";
import { useEffect, useRef } from "react";

/**
 * Colorful cursor trail (particles) using a full-screen canvas overlay.
 * - additive glow (globalCompositeOperation = "lighter")
 * - hue shifts over time; each particle fades & shrinks
 * - smart emission along the path (no gaps on fast moves)
 * - DPR-aware & paused on tab blur
 */
export default function CursorSnailTrail({
  maxParticles = 180,
  size = [20, 30],           // min/max initial radius
  friction = 0.92,
  fade = 0.965,              // alpha decay per frame
  shrink = 0.965,            // radius decay per frame
  hueSpeed = 0.8,            // hue change per frame
  opacity = 0.9,             // starting opacity of a particle
  enabled = true,
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const particlesRef = useRef([]);
  const lastRef = useRef({ x: 0, y: 0, has: false });
  const hueRef = useRef(200);

  useEffect(() => {
    if (!enabled) return;
    const canvas = document.createElement("canvas");
    canvasRef.current = canvas;
    Object.assign(canvas.style, {
      position: "fixed",
      inset: 0,
      width: "100vw",
      height: "100vh",
      pointerEvents: "none",
      zIndex: 50,              // pull above content; tune to your app
      mixBlendMode: "screen",  // looks great on dark UIs; remove if not wanted
    });
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "lighter";

    // resize for devicePixelRatio
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(innerWidth * dpr);
      canvas.height = Math.floor(innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);

    let running = true;

    const emitAt = (x, y, vx = 0, vy = 0) => {
      const ps = particlesRef.current;
      if (ps.length > maxParticles) ps.splice(0, ps.length - maxParticles);

      const r = rand(size[0], size[1]);
      const hue = (hueRef.current + rand(-12, 12)) % 360;
      ps.push({
        x,
        y,
        vx: vx + rand(-0.2, 0.2),
        vy: vy + rand(-0.2, 0.2),
        r,
        a: opacity,
        h: hue,
      });
    };

    const onPointerMove = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return; // ignore touch pen
      const x = e.clientX;
      const y = e.clientY;
      const last = lastRef.current;

      if (!last.has) {
        last.x = x; last.y = y; last.has = true;
        emitAt(x, y);
        return;
      }
      // emit along the path so fast moves leave a continuous trail
      const dx = x - last.x;
      const dy = y - last.y;
      const dist = Math.hypot(dx, dy);
      const step = 6; // px between spawned dots
      const steps = Math.max(1, Math.floor(dist / step));
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        emitAt(last.x + dx * t, last.y + dy * t, dx * 0.02, dy * 0.02);
      }
      last.x = x; last.y = y;
    };

    const onLeave = () => (lastRef.current.has = false);

    const tick = () => {
      if (!running) return;
      hueRef.current += hueSpeed;

      const ps = particlesRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.vx *= friction;
        p.vy *= friction;
        p.x += p.vx;
        p.y += p.vy;
        p.r *= shrink;
        p.a *= fade;

        if (p.a < 0.02 || p.r < 0.8) {
          ps.splice(i, 1);
          continue;
        }

        // soft glow circle
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        grad.addColorStop(0, `hsla(${p.h}, 95%, 62%, ${p.a})`);
        grad.addColorStop(1, `hsla(${p.h}, 95%, 62%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", () => (running = false));
    window.addEventListener("focus", () => {
      running = true;
      rafRef.current = requestAnimationFrame(tick);
    });

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", () => (running = false));
      window.removeEventListener("focus", () => {
        running = true;
        rafRef.current = requestAnimationFrame(tick);
      });
      canvas.remove();
      particlesRef.current.length = 0;
    };
  }, [enabled, maxParticles, size, friction, fade, shrink, hueSpeed, opacity]);

  return null; // it injects its own canvas
}

/* utils */
function rand(min, max) {
  return Math.random() * (max - min) + min;
}
