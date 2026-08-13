"use client";

import { useEffect, useRef } from "react";

/**
 * Tilt — subtle 3D rotation on mouse move (gentle, quiet-luxury grade).
 * Max rotation is configurable (defaults to 4°, very restrained).
 * Auto-disabled on touch & reduced-motion.
 */
export default function Tilt({ children, max = 4, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let raf;
    let rx = 0,
      ry = 0;
    let trx = 0,
      ty_target = 0;

    const reset = () => {
      trx = 0;
      ty_target = 0;
    };

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      trx = (0.5 - y) * max * 2;
      ty_target = (x - 0.5) * max * 2;
    };

    const onEnter = () => {
      el.style.transition = "transform 0.1s linear";
    };
    const onLeave = () => {
      reset();
      el.style.transition = "transform 0.5s cubic-bezier(0.22,1,0.36,1)";
      el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    const loop = () => {
      rx += (trx - rx) * 0.12;
      ry += (ty_target - ry) * 0.12;
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [max]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: "transform", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
