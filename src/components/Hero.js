"use client";

import { useEffect, useRef } from "react";
import Magnetic from "@/components/ui/Magnetic";
import Greeting from "@/components/ui/Greeting";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef(null);
  const eyebrowRef = useRef(null);
  const h1Ref = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 1.8 });
      tl.from(eyebrowRef.current, { y: 20, opacity: 0, duration: 0.8 })
        .from(
          h1Ref.current?.querySelectorAll(".hero-line-inner") || [],
          { yPercent: 120, opacity: 0, duration: 1.1, stagger: 0.12 },
          "-=0.4"
        )
        .from(subRef.current, { y: 20, opacity: 0, duration: 0.9 }, "-=0.7")
        .from(ctaRef.current?.children || [], { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.6")
        .from(scrollRef.current, { opacity: 0, y: 10, duration: 0.7 }, "-=0.3");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-5 md:px-10 lg:px-16 pt-32 md:pt-40 pb-20 md:pb-24 safe-pt safe-pb"
    >
      {/* Eyebrow */}
      <div ref={eyebrowRef} className="opacity-0 w-full flex justify-center">
        <div className="flex items-center gap-3 font-mono text-[10px] md:text-xs tracking-mega uppercase text-muted mb-12 md:mb-16 lg:mb-20 flex-wrap justify-center">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          Creative Developer · Portfolio {new Date().getFullYear()} · <Greeting />
        </div>
      </div>

      {/* Headline */}
      <h1
        ref={h1Ref}
        className="text-center font-serif leading-[0.95] md:leading-[0.92] tracking-tight max-w-[14ch]"
        style={{ fontSize: "clamp(3rem, 13vw, 11rem)" }}
      >
        <span className="block overflow-hidden">
          <span className="hero-line-inner block">Vipul</span>
        </span>
        <span className="block overflow-hidden">
          <span className="hero-line-inner block">
            <span className="italic text-accent font-light">Kanhere</span>
          </span>
        </span>
        <span className="block overflow-hidden">
          <span className="hero-line-inner block text-fg/80 font-light italic">
            builds quiet,
          </span>
        </span>
        <span className="block overflow-hidden">
          <span className="hero-line-inner block">beautiful web.</span>
        </span>
      </h1>

      {/* Sub paragraph */}
      <p
        ref={subRef}
        className="mt-8 md:mt-14 max-w-xl text-center text-base md:text-lg leading-relaxed text-muted opacity-0 px-2"
      >
        A young designer-developer based in Pimpri, India — crafting considered
        digital experiences for studios, founders, and brands that care about
        the <em className="font-serif not-italic text-fg">details</em>.
      </p>

      {/* CTAs */}
      <div ref={ctaRef} className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center gap-4 opacity-0">
        <Magnetic strength={0.3}>
          <a
            href="#work"
            data-cursor="view"
            className="group inline-flex items-center gap-3 px-7 py-4 rounded-full border border-hair hover:border-fg transition-colors duration-300 text-sm tracking-widest uppercase"
          >
            View work
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </Magnetic>
        <Magnetic strength={0.4}>
          <a
            href="#contact"
            data-cursor="email"
            className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-accent text-bg hover:bg-fg hover:text-bg transition-colors duration-300 text-sm tracking-widest uppercase"
          >
            Get in touch
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </Magnetic>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0"
      >
        <span className="font-mono text-[9px] tracking-mega uppercase text-muted">
          Scroll
        </span>
        <div className="w-px h-10 bg-hair relative overflow-hidden">
          <span
            className="absolute top-0 left-0 w-full h-1/2 bg-fg"
            style={{
              animation: "scrollDot 2s cubic-bezier(0.45, 0, 0.55, 1) infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
}
