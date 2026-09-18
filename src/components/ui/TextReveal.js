"use client";

import { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";

/**
 * TextReveal — splits the rendered text of its children into individual
 * <span> words and reveals them on scroll (opacity linked to scroll position).
 * 
 * Preserves the original HTML structure and styling of children.
 */
export default function TextReveal({
  children,
  className = "",
  style,
  as: Tag = "div",
}) {
  const ref = useRef(null);
  
  // Track the scroll progress of the element itself coming into view.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 50%"],
  });

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
            // Set initial opacity to dim 
            span.style.opacity = "0.2";
            span.style.willChange = "opacity";
            span.style.transition = "opacity 0.1s ease-out";
            span.appendChild(document.createTextNode(part));
            frag.appendChild(span);
          }
        });
        tn.parentNode.replaceChild(frag, tn);
      });
    };

    wrapWordsIn(el);

    const words = Array.from(el.querySelectorAll("[data-word]"));
    if (prefersReduced || words.length === 0) {
      words.forEach((w) => {
        w.style.opacity = "1";
      });
      return;
    }

    const unsubscribe = scrollYProgress.on("change", (v) => {
      words.forEach((w, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        
        let opacity = 0.2;
        if (v >= end) {
          opacity = 1;
        } else if (v > start) {
          opacity = 0.2 + 0.8 * ((v - start) / (end - start));
        }
        w.style.opacity = opacity.toString();
      });
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
