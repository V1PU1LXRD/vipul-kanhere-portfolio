"use client";

import { useEffect, useRef } from "react";

/**
 * Reveal — wraps children in a masked container and animates them up on view.
 * Usage: <Reveal><h2>Hello</h2></Reveal>
 */
export default function Reveal({
  children,
  delay = 0,
  y = 30,
  duration = 0.9,
  className = "",
  as: Tag = "div",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    el.style.opacity = "0";
    el.style.transform = `translateY(${y}px)`;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => {
              el.style.transition = `opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1), transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1)`;
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);

    return () => io.disconnect();
  }, [delay, y, duration]);

  return (
    <Tag ref={ref} className={className} style={{ willChange: "transform, opacity" }}>
      {children}
    </Tag>
  );
}
