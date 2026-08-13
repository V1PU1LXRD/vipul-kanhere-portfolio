"use client";

import { useRef } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

/**
 * TextScramble — on hover, scrambles text character-by-character then reveals original.
 * Children should be plain text.
 */
export default function TextScramble({ children, className = "", fps = 40 }) {
  const ref = useRef(null);
  const queueRef = useRef([]);
  const frameRef = useRef(0);
  const frameRequestRef = useRef(null);

  const update = (finalText) => {
    let output = "";
    let complete = 0;
    for (let i = 0; i < queueRef.current.length; i++) {
      const { from, to, start, end, char } = queueRef.current[i];
      if (frameRef.current >= end) {
        complete++;
        output += to;
      } else if (frameRef.current >= start) {
        if (!char || Math.random() < 0.28) {
          queueRef.current[i].char = randomChar();
        }
        output += queueRef.current[i].char;
      } else {
        output += from;
      }
    }
    if (ref.current) ref.current.textContent = output;
    if (complete < queueRef.current.length) {
      frameRef.current++;
      frameRequestRef.current = requestAnimationFrame(() => update(finalText));
    }
  };

  const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

  const scramble = (newText) => {
    if (frameRequestRef.current) cancelAnimationFrame(frameRequestRef.current);
    const oldText = ref.current?.textContent || "";
    const length = Math.max(oldText.length, newText.length);
    const queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 20) + 10;
      queue.push({ from, to, start, end, char: "" });
    }
    queueRef.current = queue;
    frameRef.current = 0;
    update(newText);
  };

  return (
    <span
      ref={ref}
      className={className}
      onMouseEnter={() => scramble(children)}
      onFocus={() => scramble(children)}
    >
      {children}
    </span>
  );
}
