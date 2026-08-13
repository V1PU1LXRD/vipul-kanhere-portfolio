"use client";

import { useEffect, useState, useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import Tilt from "@/components/ui/Tilt";
import gsap from "gsap";

/**
 * Designs grid.
 *
 * - If `image` exists → click opens lightbox.
 * - If `figma` exists and is a real URL → small "Figma ↗" chip opens link in new tab.
 * - Placeholder tiles (image: null) show the title + "Export coming soon" and
 *   still link to Figma if a URL is provided.
 */
const DESIGNS = [
  {
    id: "01",
    title: "Richard Mille",
    tag: "Luxury · Watch UI",
    image: "/designs/richard-mille.png",
    figma: "https://www.figma.com/design/tTpmPl3RT43vkyYRlb2fkl/RICHARD-MILLE?node-id=1-4&t=F4ugahdWUAcdjzBz-1",
  },
  {
    id: "02",
    title: "Audemars Piguet",
    tag: "Luxury · Watch UI",
    image: "/designs/audemars-piguet.png",
    figma: "https://www.figma.com/design/aUyVtqAkcCAELakbvIdsWA/Audemars-Piguet?node-id=0-1&t=4TlGls3K6sT7sIlE-1",
  },
  {
    id: "03",
    title: "Koenigsegg",
    tag: "Automotive · Brand",
    image: "/designs/koenigsegg-sadair's-spear.png",
    figma: "https://www.figma.com/design/XhwaLYcFiugaH8BwNfTkXt/Koenigsegg-Sadairs-Sphere?node-id=0-1&t=WlDXE0QnAdXA8YmK-1",
  },
  {
    id: "04",
    title: "Toyota Hilux",
    tag: "Automotive · Product",
    image: "/designs/toyota-hilux.png",
    figma: "https://www.figma.com/design/irbXLRKVluWhe7TrtR1jaR/Toyota-Hilux-Random-?node-id=0-1&t=vJ3M3ZHVKVNmEcfy-1",
  },
  {
    id: "05",
    title: "Nucleus Programming",
    tag: "Education · Brand",
    image: "/designs/nucleus-programming.png",
    figma: "https://www.figma.com/design/79PZeAPAVdDGoNTL3NM5aD/Nucleus-Programming?node-id=0-1&t=uMvCCP9TqBDsu1aW-1",
  },
  {
    id: "06",
    title: "Cold Solutions",
    tag: "Industrial · Web",
    image: "/designs/cold-solutions.png",
    figma: "https://www.figma.com/design/h6dMQrLpZgi2HfeBY3tYca/COLD-SOLUTIONS?node-id=2-2&t=kytt0f45pIbPbvzC-1",
  },
];

const isRealLink = (url) => url && url !== "#" && url.startsWith("http");

function FigmaChip({ href }) {
  if (!isRealLink(href)) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="absolute top-3 right-3 md:top-4 md:right-4 z-20 font-mono text-[9px] md:text-[10px] tracking-mega uppercase text-bg bg-accent/90 hover:bg-accent px-2.5 py-1 rounded-full transition-colors"
      data-cursor
    >
      Figma ↗
    </a>
  );
}

export default function Designs() {
  const [lightbox, setLightbox] = useState(null);
  const lightboxImgRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.style.overflow = "hidden";
    if (!prefersReduced && lightboxImgRef.current) {
      gsap.fromTo(
        lightboxImgRef.current,
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <div className="px-5 md:px-10 lg:px-16 py-28 md:py-40 max-w-[1800px] mx-auto">
      <Reveal>
        <div className="flex items-center gap-4 mb-16 md:mb-24">
          <span className="font-mono text-[10px] md:text-xs tracking-mega uppercase text-muted">
            03 / Designs
          </span>
          <span className="flex-1 h-px bg-hair" />
          <span className="font-mono text-[10px] md:text-xs tracking-mega uppercase text-muted">
            {String(DESIGNS.length).padStart(2, "0")} visuals
          </span>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {DESIGNS.map((d, i) => (
          <Reveal key={d.id} delay={i * 60} y={30} duration={0.8}>
            <Tilt max={2.5}>
              <div
                className={`group relative block w-full overflow-hidden text-left rounded-sm bg-[#0d0d0d] ${
                  d.image || isRealLink(d.figma) ? "cursor-pointer" : "cursor-default"
                }`}
                style={{ aspectRatio: "16 / 10" }}
              >
                <FigmaChip href={d.figma} />

                {d.image ? (
                  <button
                    onClick={() => setLightbox(d)}
                    className="absolute inset-0 w-full h-full"
                    data-cursor="open"
                    aria-label={`Open ${d.title}`}
                  >
                    <img
                      src={d.image}
                      alt={d.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-contain p-2 md:p-3 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 flex items-end justify-between translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                      <div>
                        <div className="font-serif text-lg md:text-xl text-fg">
                          {d.title}
                        </div>
                        <div className="font-mono text-[9px] md:text-[10px] tracking-mega uppercase text-fg/70 mt-1">
                          {d.tag}
                        </div>
                      </div>
                      <span className="text-accent text-base md:text-lg">↗</span>
                    </div>
                  </button>
                ) : isRealLink(d.figma) ? (
                  <a
                    href={d.figma}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-dim select-none p-6 text-center hover:text-fg/60 transition-colors"
                    data-cursor
                    aria-label={`Open ${d.title} on Figma`}
                  >
                    <div className="font-serif italic text-3xl md:text-5xl text-fg/25 group-hover:text-fg/40 transition-colors">
                      {d.title}
                    </div>
                    <div className="mt-3 font-mono text-[9px] md:text-[10px] tracking-mega uppercase text-fg/40">
                      {d.tag}
                    </div>
                    <div className="mt-4 font-mono text-[9px] tracking-mega uppercase text-accent/70 group-hover:text-accent transition-colors">
                      Open in Figma ↗
                    </div>
                  </a>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-dim select-none p-6 text-center">
                    <div className="font-serif italic text-3xl md:text-5xl text-fg/20">
                      {d.title}
                    </div>
                    <div className="mt-3 font-mono text-[9px] md:text-[10px] tracking-mega uppercase text-fg/30">
                      {d.tag}
                    </div>
                    <div className="mt-4 font-mono text-[9px] tracking-mega uppercase text-accent/50">
                      Export coming soon
                    </div>
                  </div>
                )}

                <div className="absolute top-3 left-3 md:top-4 md:left-4 font-mono text-[9px] md:text-[10px] tracking-mega uppercase text-fg/40 group-hover:text-fg/80 transition-colors z-10 pointer-events-none">
                  {d.id}
                </div>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[250] bg-black/92 backdrop-blur-md flex items-center justify-center p-4 md:p-12 safe-pt safe-pb"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${lightbox.title} preview`}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center rounded-full border border-hair text-fg hover:bg-accent hover:text-bg hover:border-accent transition-colors z-10"
            aria-label="Close"
          >
            ✕
          </button>

          {isRealLink(lightbox.figma) && (
            <a
              href={lightbox.figma}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="absolute top-5 left-5 font-mono text-[10px] md:text-xs tracking-mega uppercase text-bg bg-accent hover:bg-fg px-4 py-2 rounded-full transition-colors z-10"
              data-cursor
            >
              Open in Figma ↗
            </a>
          )}

          <div className="absolute bottom-5 left-5 md:left-10 font-mono text-[10px] md:text-xs tracking-mega uppercase text-muted">
            {lightbox.id} · {lightbox.title} — {lightbox.tag}
          </div>
          <img
            ref={lightboxImgRef}
            src={lightbox.image}
            alt={lightbox.title}
            className="max-h-[85vh] max-w-full object-contain shadow-2xl rounded-sm"
            onClick={(e) => e.stopPropagation()}
            style={{ opacity: 0, willChange: "transform, opacity" }}
          />
        </div>
      )}
    </div>
  );
}
