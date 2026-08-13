"use client";

import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "designs", label: "Designs" },
  { id: "contact", label: "Contact" },
];

export default function SectionDots() {
  const [active, setActive] = useState("home");
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.4 }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.scrollIntoView({ behavior: "auto" });
      return;
    }
    // Try Lenis
    if (window.lenis) {
      window.lenis.scrollTo(el, { duration: 1.6 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={containerRef}
      aria-label="Section navigation"
      className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-[120] flex-col gap-4"
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="group flex items-center gap-3 justify-end"
            aria-label={`Scroll to ${s.label}`}
            aria-current={isActive ? "true" : "false"}
          >
            <span
              className={`font-mono text-[10px] tracking-mega uppercase transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 ${
                isActive ? "!opacity-100 !translate-x-0 text-accent" : "text-muted"
              }`}
            >
              {s.label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? "w-2 h-2 bg-accent"
                  : "w-1 h-1 bg-dim group-hover:bg-muted group-hover:w-1.5 group-hover:h-1.5"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
