"use client";

import { useEffect, useRef, useState } from "react";

export default function ImagePreview() {
  const ref = useRef(null);
  const [src, setSrc] = useState(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const visible = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const onEnter = (e) => {
      const a = e.target.closest("[data-preview]");
      if (!a) return;
      const url = a.getAttribute("data-preview");
      if (!url) return;
      setSrc(url);
      visible.current = true;
      el.style.opacity = "1";
      el.style.scale = "1";
    };

    const onLeave = (e) => {
      const a = e.target.closest("[data-preview]");
      if (!a) return;
      visible.current = false;
      el.style.opacity = "0";
      el.style.scale = "0.92";
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    let raf;
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      el.style.transform = `translate3d(${pos.current.x + 20}px, ${pos.current.y - 80}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="hidden md:block fixed top-0 left-0 z-[180] pointer-events-none w-56 h-40 rounded-md overflow-hidden border border-hair bg-bg/90 backdrop-blur-md shadow-2xl"
      style={{
        opacity: 0,
        scale: "0.92",
        transition: "opacity 0.25s ease, scale 0.25s ease",
        willChange: "transform, opacity",
      }}
    >
      {src && (
        <img
          src={src}
          alt=""
          className="w-full h-full object-cover"
          draggable={false}
        />
      )}
    </div>
  );
}
