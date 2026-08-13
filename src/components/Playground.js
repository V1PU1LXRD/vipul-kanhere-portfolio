"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Playground — quiet generative constellation.
 * Desktop: mouse gravity + connecting hairlines.
 * Mobile: auto-drifting constellation, fully scrollable (touch-action: pan-y).
 */
function Playground() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  // null on server + first render; set true/false after mount to prevent hydration mismatch
  const [isTouch, setIsTouch] = useState(null);

  useEffect(() => {
    const touch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(touch);

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, dpr = 1;
    let dots = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let raf = 0;

    function resize() {
      const rect = container.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initDots();
    }

    function initDots() {
      const count = Math.min(touch ? 40 : 60, Math.floor((w * h) / 24000));
      dots = [];
      for (let i = 0; i < count; i++) {
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() < 0.08 ? 1.6 : 0.9,
          accent: Math.random() < 0.08,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        if (mouse.active && !touch) {
          const dx = mouse.x - d.x;
          const dy = mouse.y - d.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180 && dist > 0.1) {
            const force = (180 - dist) / 180;
            d.vx += (dx / dist) * force * 0.1;
            d.vy += (dy / dist) * force * 0.1;
          }
        }
        d.vx += (Math.random() - 0.5) * 0.006;
        d.vy += (Math.random() - 0.5) * 0.006;
        d.vx *= 0.98;
        d.vy *= 0.98;
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < -10) d.x = w + 10;
        if (d.x > w + 10) d.x = -10;
        if (d.y < -10) d.y = h + 10;
        if (d.y > h + 10) d.y = -10;
      }

      const linkDist = 100;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i];
          const b = dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDist) {
            const alpha = (1 - dist / linkDist) * 0.16;
            ctx.strokeStyle = a.accent || b.accent
              ? `rgba(255,77,0,${alpha * 1.5})`
              : `rgba(245,241,234,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        ctx.fillStyle = d.accent ? "#ff4d00" : "rgba(245,241,234,0.7)";
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (mouse.active && !touch) {
        const grd = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180);
        grd.addColorStop(0, "rgba(255,77,0,0.08)");
        grd.addColorStop(1, "rgba(255,77,0,0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 180, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ff4d00";
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }
    function onLeave() {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    }

    resize();
    window.addEventListener("resize", resize);
    if (!touch) {
      canvas.addEventListener("mousemove", onMove);
      canvas.addEventListener("mouseleave", onLeave);
    }
    if (!prefersReduced) {
      raf = requestAnimationFrame(draw);
    } else {
      draw();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      if (!touch) {
        canvas.removeEventListener("mousemove", onMove);
        canvas.removeEventListener("mouseleave", onLeave);
      }
    };
  }, []);

  // During SSR and first paint, render a neutral label so server and client match.
  // After useEffect runs, isTouch becomes true/false and we show the right label.
  const label = isTouch === null ? "" : isTouch ? "Constellation" : "Move your cursor";

  return (
    <div className="relative border-y border-hair" ref={containerRef}>
      <div className="absolute left-5 md:left-10 lg:left-16 top-4 md:top-5 z-10 flex items-center gap-3 pointer-events-none">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-70" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
        </span>
        <span className="font-mono text-[10px] md:text-xs tracking-mega uppercase text-accent">
          {label}
        </span>
      </div>
      <div className="absolute right-5 md:right-10 lg:right-16 top-4 md:top-5 z-10 pointer-events-none">
        <span className="font-mono text-[10px] md:text-xs tracking-mega uppercase text-muted">
          / 05 Playground
        </span>
      </div>

      <canvas
        ref={canvasRef}
        className="block w-full"
        data-cursor={isTouch === false ? "play" : undefined}
        style={{
          height: "clamp(220px, 32vh, 340px)",
          touchAction: "pan-y",
          overscrollBehavior: "contain",
        }}
        aria-label="Generative constellation"
        role="img"
      />
    </div>
  );
}

export default Playground;
export { Playground };
