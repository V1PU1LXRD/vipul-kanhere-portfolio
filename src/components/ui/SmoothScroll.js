"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // On touch devices, don't smooth — let native momentum scroll handle it
      smoothWheel: !isTouch,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      // Important: let native touch events pass through on mobile
      prevent: false,
    });
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);

    // Anchor link handling
    const handleClick = (e) => {
      const a = e.target.closest?.("a[href^='#']");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: 0, duration: 1.6 });
    };
    document.addEventListener("click", handleClick);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
