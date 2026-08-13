"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor — minimal dot. Resting = small off-white blend-difference dot.
 * Hovering any link/button = larger orange dot (still blend-difference so it
 * stays visible against any background). No labels, no pills — quiet.
 */
export default function Cursor() {
  const dotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const hover = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const onOver = (e) => {
      if (e.target.closest("a, button, [role='button'], [data-cursor]")) {
        hover.current = true;
        dot.style.width = "28px";
        dot.style.height = "28px";
        dot.style.background = "rgba(255,77,0,0.5)";
        dot.style.border = "1px solid rgba(255,77,0,0.8)";
        dot.style.backdropFilter = "blur(2px)";
      }
    };
    const onOut = (e) => {
      if (e.target.closest("a, button, [role='button'], [data-cursor]")) {
        hover.current = false;
        dot.style.width = "6px";
        dot.style.height = "6px";
        dot.style.background = "#f5f1ea";
        dot.style.border = "none";
        dot.style.backdropFilter = "none";
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    let first = true;
    const snap = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      target.current = { x: e.clientX, y: e.clientY };
      first = false;
      window.removeEventListener("mousemove", snap);
    };
    window.addEventListener("mousemove", snap, { once: true });

    let raf;
    const loop = () => {
      const k = hover.current ? 0.15 : 0.25;
      pos.current.x += (target.current.x - pos.current.x) * k;
      pos.current.y += (target.current.y - pos.current.y) * k;
      dot.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="hidden md:block fixed top-0 left-0 z-[200] pointer-events-none rounded-full transition-[width,height,background,border] duration-200 ease-out"
      style={{
        width: "6px",
        height: "6px",
        background: "#f5f1ea",
        mixBlendMode: "difference",
        willChange: "transform, width, height",
      }}
    />
  );
}
