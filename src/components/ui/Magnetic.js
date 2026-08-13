"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Magnetic — children are subtly pulled toward the cursor on hover.
 * Wraps children in a span that moves via transform.
 */
export default function Magnetic({ children, strength = 0.3, className = "" }) {
  const ref = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const active = useRef(false);
  const rafRef = useRef();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e) => {
      if (!active.current) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      target.current.x = (e.clientX - cx) * strength;
      target.current.y = (e.clientY - cy) * strength;
    };

    const onEnter = () => {
      active.current = true;
    };
    const onLeave = () => {
      active.current = false;
      target.current.x = 0;
      target.current.y = 0;
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      const inner = el.firstElementChild || el;
      inner.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      <span
        style={{ display: "inline-block", willChange: "transform", transition: "transform 0.05s linear" }}
      >
        {children}
      </span>
    </span>
  );
}
