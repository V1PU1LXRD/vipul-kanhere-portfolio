"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "home", num: "00" },
  { id: "about", num: "01" },
  { id: "work", num: "02" },
  { id: "designs", num: "03" },
  { id: "contact", num: "04" },
];
const TOTAL = "04";

/**
 * SectionCounter — bottom-left page-number style (01 / 04) that updates on scroll.
 * Shows "- - / 04" when at the very top between home and first section.
 */
export default function SectionCounter() {
  const [current, setCurrent] = useState("00");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const found = SECTIONS.find((s) => s.id === e.target.id);
            if (found) setCurrent(found.num);
          }
        });
      },
      { threshold: 0.35 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="hidden lg:flex fixed bottom-6 left-8 z-[120] font-mono text-[10px] tracking-mega uppercase text-muted items-center gap-2">
      <span className="text-fg transition-colors duration-500">{current}</span>
      <span className="text-dim">/</span>
      <span>{TOTAL}</span>
    </div>
  );
}
