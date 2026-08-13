"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Preloader — quiet-luxury intro with three redundant dismiss systems.
 * All initial visual states are set via CSS/inline-style so the name, line,
 * and counter are ALWAYS visible even if GSAP fails.
 */
export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const overlayRef = useRef(null);
  const bladeRef = useRef(null);
  const nameRef = useRef(null);
  const lineLeftRef = useRef(null);
  const lineRightRef = useRef(null);
  const lineDotRef = useRef(null);
  const countRef = useRef(null);
  const dismissed = useRef(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const dismiss = () => {
      if (dismissed.current) return;
      dismissed.current = true;
      overlay.classList.remove("preloader-fallback");
      gsap.to(overlay, {
        yPercent: -100,
        duration: 0.9,
        ease: "power4.inOut",
        onComplete: () => setVisible(false),
      });
      if (bladeRef.current) {
        gsap.fromTo(
          bladeRef.current,
          { xPercent: -150 },
          { xPercent: 0, duration: 0.55, ease: "power4.inOut" }
        );
      }
    };

    // Safety 1: hard timeout (works even if everything else fails)
    const safetyTimer = setTimeout(dismiss, 3200);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      clearTimeout(safetyTimer);
      setTimeout(dismiss, 100);
      return () => clearTimeout(safetyTimer);
    }

    // Safety 2: window.load
    const onLoad = () => setTimeout(() => !dismissed.current && dismiss(), 500);
    if (document.readyState === "complete") {
      setTimeout(onLoad, 800);
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    // Run entrance timeline
    try {
      const counter = { val: 0 };

      // Set initial transform for lines (not opacity — elements stay visible)
      gsap.set([lineLeftRef.current, lineRightRef.current], { scaleX: 0 });
      gsap.set(lineDotRef.current, { scale: 0, opacity: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          clearTimeout(safetyTimer);
          setTimeout(dismiss, 200);
        },
      });

      tl.from(nameRef.current, { opacity: 0, y: 16, duration: 0.7, ease: "power3.out" })
        .to(lineDotRef.current, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2)" }, 0.35)
        .to(
          [lineLeftRef.current, lineRightRef.current],
          { scaleX: 1, duration: 0.75, ease: "power3.inOut" },
          0.4
        )
        .from(countRef.current, { opacity: 0, y: 10, duration: 0.5 }, 0.55)
        .to(counter, {
          val: 100,
          duration: 1.1,
          ease: "power2.inOut",
          onUpdate: () => {
            if (countRef.current) {
              countRef.current.textContent = String(Math.floor(counter.val)).padStart(3, "0");
            }
          },
        }, 0.45);
    } catch (e) {
      clearTimeout(safetyTimer);
      setTimeout(dismiss, 300);
    }

    return () => {
      clearTimeout(safetyTimer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[300] bg-bg flex items-center justify-center preloader-fallback"
      style={{ willChange: "transform" }}
      aria-hidden="true"
    >
      {/* Orange blade sweep */}
      <div
        ref={bladeRef}
        className="absolute top-0 left-0 w-[200%] h-px bg-accent"
        style={{
          transform: "translate3d(-150%, 0, 0)",
          willChange: "transform",
          boxShadow: "0 0 20px rgba(255,77,0,0.6), 0 0 60px rgba(255,77,0,0.3)",
        }}
      />

      <div className="flex flex-col items-center px-6">
        {/* Name — serif italic, large, visible by default */}
        <div
          ref={nameRef}
          className="font-serif italic text-fg text-center leading-none"
          style={{
            fontSize: "clamp(3rem, 11vw, 5.5rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Vipul Kanhere<span className="text-accent">.</span>
        </div>

        {/* Progress line — center burst */}
        <div className="mt-8 relative w-56 md:w-72 h-px flex items-center justify-center">
          <div className="absolute inset-0 bg-white/10" />
          <div
            ref={lineLeftRef}
            className="absolute right-1/2 top-0 h-px bg-accent origin-right"
            style={{ width: "calc(50% - 4px)", transform: "scaleX(0)", willChange: "transform" }}
          />
          <div
            ref={lineRightRef}
            className="absolute left-1/2 top-0 h-px bg-accent origin-left"
            style={{ width: "calc(50% - 4px)", transform: "scaleX(0)", willChange: "transform" }}
          />
          <div
            ref={lineDotRef}
            className="relative z-10 w-2 h-2 rounded-full bg-accent"
            style={{
              transform: "scale(0)",
              willChange: "transform, opacity",
              boxShadow: "0 0 14px rgba(255,77,0,0.9), 0 0 28px rgba(255,77,0,0.5)",
            }}
          />
        </div>

        {/* Counter */}
        <div
          ref={countRef}
          className="mt-5 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-muted tabular-nums"
        >
          000
        </div>
      </div>
    </div>
  );
}
