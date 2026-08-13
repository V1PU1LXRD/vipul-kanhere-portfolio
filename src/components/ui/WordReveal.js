"use client";

import { useEffect, useRef } from "react";

/**
 * WordReveal — splits the rendered text of its children into individual
 * <span> words and reveals them one-by-one on scroll.
 *
 * Works with plain strings OR nested elements (like <em>) — we clone the
 * passed element, render its children naturally, then post-process the DOM
 * to wrap each word in an animated span.
 */
export default function WordReveal({
  children,
  delay = 0,
  stagger = 0.05,
  duration = 0.8,
  y = 24,
  className = "",
  style,
  as: Tag = "div",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Post-process: walk text nodes and wrap each word in a <span data-word>
    const wrapWordsIn = (node) => {
      const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null);
      const textNodes = [];
      let n;
      while ((n = walker.nextNode())) textNodes.push(n);

      textNodes.forEach((tn) => {
        const text = tn.nodeValue;
        if (!text || !text.trim()) return;
        // Split but preserve leading/trailing whitespace
        const parts = text.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((part) => {
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else if (part.length > 0) {
            const span = document.createElement("span");
            span.setAttribute("data-word", "");
            span.style.display = "inline-block";
            span.style.willChange = "transform, opacity";
            span.appendChild(document.createTextNode(part));
            frag.appendChild(span);
          }
        });
        tn.parentNode.replaceChild(frag, tn);
      });
    };

    wrapWordsIn(el);

    const words = el.querySelectorAll("[data-word]");
    if (prefersReduced) {
      words.forEach((w) => {
        w.style.opacity = "1";
        w.style.transform = "none";
      });
      return;
    }

    words.forEach((w) => {
      w.style.opacity = "0";
      w.style.transform = `translateY(${y}px)`;
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            words.forEach((w, i) => {
              w.style.transition = `opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${
                delay / 1000 + i * stagger
              }s, transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${
                delay / 1000 + i * stagger
              }s`;
              w.style.opacity = "1";
              w.style.transform = "translateY(0)";
            });
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, stagger, duration, y]);

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
