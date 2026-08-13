"use client";

import { useEffect, useRef, cloneElement, Children } from "react";
import gsap from "gsap";

/**
 * RevealLines — splits text into lines and reveals them on scroll.
 * Pass children as the text element. The component wraps text in mask spans.
 */
export default function RevealLines({
  children,
  delay = 0,
  stagger = 0.09,
  duration = 1,
  startY = 110,
  className,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lines = el.querySelectorAll(".rl-line");
    gsap.set(lines, { yPercent: startY });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            gsap.to(lines, {
              yPercent: 0,
              duration,
              ease: "power4.out",
              stagger,
              delay: delay / 1000,
            });
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, stagger, duration, startY]);

  // Auto-split children text into line spans by word groups (1 line = 1 <span> child)
  // We use a simple approach: wrap each direct text node child.
  // For headlines, we manually pass line-broken text inside.
  const enhanced = Children.map(children, (child) => {
    if (typeof child === "string") {
      return (
        <span className="reveal-mask block">
          <span className="rl-line block">{child}</span>
        </span>
      );
    }
    return cloneElement(child, {
      className: (child.props.className || "") + " reveal-mask",
      children: <span className="rl-line block">{child.props.children}</span>,
    });
  });

  return (
    <div ref={ref} className={className}>
      {enhanced}
    </div>
  );
}
