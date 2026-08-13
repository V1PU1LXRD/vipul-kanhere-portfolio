"use client";

import { useEffect, useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import gsap from "gsap";

const PROJECTS = [
  {
    num: "01",
    title: "Star Silver Group",
    status: "Live",
    year: "2025",
    tags: ["E-commerce", "Warranty", "Next.js"],
    url: "https://starsilvergroup.com",
    external: true,
    image: "",
    desc: "Product catalog & warranty registration platform for pumps, cables, panels & pipes.",
  },
  {
    num: "02",
    title: "Smart Attendance Pattern Analyzer",
    status: "Academic Project",
    year: "2025",
    tags: ["Data Viz", "Python", "Analytics"],
    url: "https://github.com/V1PU1LXRD/SAPA-Smart-Attendance-Pattern-Analyzer",
    external: true,
    image: "",
    desc: "Local-hosted analytics tool that surfaces attendance patterns from student/class data.",
    github: true,
  },
  {
    num: "03",
    title: "Portfolio Website",
    status: "Case study",
    year: "2025",
    tags: ["Personal", "React", "GSAP"],
    url: "#",
    external: false,
    image: "",
    desc: "The site you're on — quiet, typographic, hand-animated with GSAP & Lenis.",
  },
  {
    num: "04",
    title: "Live Weather Forecasting",
    status: "Academic Project",
    year: "2025",
    tags: ["API", "JavaScript", "Weather"],
    url: "https://github.com/V1PU1LXRD/Live-Weather-Forecasting-with-Integration-of-Open-Weather-API",
    external: true,
    github: true,
    image: "",
    desc: "Real-time weather app integrating the OpenWeather API with live location search and forecasts.",
  },
];

export default function Work() {
  const listRef = useRef(null);
  const rowsRef = useRef([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const list = listRef.current;
    if (!list) return;

    rowsRef.current.forEach((row) => {
      if (!row) return;
      const arrowSvg = row.querySelector(".proj-arrow svg");
      const arrowPath = row.querySelector(".proj-arrow path");
      const title = row.querySelector(".proj-title");
      const num = row.querySelector(".proj-num");
      const meta = row.querySelectorAll(".proj-meta > *");

      gsap.set([arrowSvg, meta], { opacity: 0.4 });
      if (arrowPath) gsap.set(arrowPath, { strokeDasharray: 40, strokeDashoffset: 40 });

      const onEnter = () => {
        if (prefersReduced) return;
        const siblings = rowsRef.current.filter((r) => r && r !== row);
        gsap.to(siblings, { opacity: 0.25, duration: 0.4, ease: "power2.out" });
        gsap.to(row, { backgroundColor: "rgba(255,77,0,0.04)", duration: 0.4 });
        gsap.to(title, { x: 16, color: "#ff4d00", duration: 0.4, ease: "power3.out" });
        gsap.to(arrowSvg, { x: 8, opacity: 1, duration: 0.4, ease: "power3.out" });
        if (arrowPath) gsap.to(arrowPath, { strokeDashoffset: 0, stroke: "#ff4d00", duration: 0.45, ease: "power3.out" });
        gsap.to(num, { opacity: 1, duration: 0.3 });
        gsap.to(meta, { opacity: 1, duration: 0.3, stagger: 0.03 });
      };
      const onLeave = () => {
        if (prefersReduced) return;
        gsap.to(rowsRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" });
        gsap.to(row, { backgroundColor: "rgba(0,0,0,0)", duration: 0.4 });
        gsap.to(title, { x: 0, color: "#f5f1ea", duration: 0.4, ease: "power3.out" });
        gsap.to(arrowSvg, { x: 0, opacity: 0.4, duration: 0.4, ease: "power3.out" });
        if (arrowPath) gsap.to(arrowPath, { strokeDashoffset: 40, stroke: "rgba(245,241,234,0.4)", duration: 0.4, ease: "power3.out" });
        gsap.to(num, { opacity: 0.4, duration: 0.3 });
        gsap.to(meta, { opacity: 0.4, duration: 0.3 });
      };

      row.addEventListener("mouseenter", onEnter);
      row.addEventListener("mouseleave", onLeave);
    });
  }, []);

  return (
    <div className="px-5 md:px-10 lg:px-16 py-28 md:py-40 max-w-[1800px] mx-auto">
      <Reveal>
        <div className="flex items-center gap-4 mb-16 md:mb-24">
          <span className="font-mono text-[10px] md:text-xs tracking-mega uppercase text-muted">
            02 / Selected work
          </span>
          <span className="flex-1 h-px bg-hair" />
          <span className="font-mono text-[10px] md:text-xs tracking-mega uppercase text-muted">
            {String(PROJECTS.length).padStart(2, "0")} projects
          </span>
        </div>
      </Reveal>

      <ul ref={listRef} className="border-t border-hair">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.num} delay={i * 80} y={20}>
            <li>
              <a
                ref={(el) => {
                  rowsRef.current[i] = el;
                }}
                href={p.url}
                target={p.external ? "_blank" : undefined}
                rel={p.external ? "noopener noreferrer" : undefined}
                data-cursor
                {...(p.image ? { "data-preview": p.image } : {})}
                className="group block border-b border-hair py-8 md:py-12 transition-colors duration-300"
              >
                <div className="grid grid-cols-12 items-center gap-4 md:gap-6">
                  <div className="proj-num col-span-2 md:col-span-1 font-mono text-[10px] md:text-xs tracking-mega text-muted opacity-40">
                    {p.num}
                  </div>
                  <div className="col-span-10 md:col-span-5 min-w-0">
                    <h3
                      className="proj-title font-serif leading-none truncate transition-all duration-400"
                      style={{ fontSize: "clamp(1.75rem, 4vw, 3.75rem)" }}
                    >
                      {p.title}
                    </h3>
                    <p className="mt-2 text-xs md:text-sm text-muted/70 max-w-md truncate">
                      {p.desc}
                    </p>
                  </div>
                  <div className="proj-meta col-span-10 col-start-3 md:col-span-5 md:col-start-7 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] md:text-xs tracking-mega uppercase text-muted opacity-40">
                    <span>{p.status}</span>
                    <span className="hidden md:inline h-px w-6 bg-dim" />
                    <span>{p.year}</span>
                    <span className="hidden md:inline h-px w-6 bg-dim" />
                    <span className="flex flex-wrap gap-x-3">
                      {p.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </span>
                    {p.external && (
                      <>
                        <span className="hidden md:inline h-px w-6 bg-dim" />
                        <span className="text-accent">
                          {p.github ? "↗ GitHub" : "↗ live"}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="proj-arrow col-span-2 md:col-span-1 flex justify-end">
                    <svg
                      width="28"
                      height="12"
                      viewBox="0 0 28 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-fg/40"
                      aria-hidden="true"
                    >
                      <path
                        d="M0 6H26M26 6L21 1M26 6L21 11"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            </li>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={500}>
        <div className="mt-12 flex items-center gap-4 font-mono text-[10px] md:text-xs tracking-mega uppercase text-muted">
          <span className="text-accent">✦</span>
          More work available on request
          <span className="flex-1 h-px bg-hair" />
        </div>
      </Reveal>
    </div>
  );
}
