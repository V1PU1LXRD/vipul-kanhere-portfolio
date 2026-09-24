"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import WordReveal from "@/components/ui/WordReveal";
import TextReveal from "@/components/ui/TextReveal";
import Magnetic from "@/components/ui/Magnetic";
import TextScramble from "@/components/ui/TextScramble";

const CHANNELS = [
  {
    label: "Email",
    value: "vipul.kanhere@gmail.com",
    href: "mailto:vipul.kanhere@gmail.com",
    copyable: true,
  },
  {
    label: "GitHub",
    value: "@V1PU1LXRD",
    href: "https://github.com/V1PU1LXRD",
    copyable: false,
  },
  {
    label: "LinkedIn",
    value: "/in/vipul-kanhere",
    href: "https://www.linkedin.com/in/vipul-kanhere-903b8033a/",
    copyable: false,
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // no-op
    }
  };

  return (
    <div className="px-5 md:px-10 lg:px-16 py-28 md:py-40 max-w-[1800px] mx-auto">
      <Reveal>
        <div className="flex items-center gap-4 mb-16 md:mb-24">
          <span className="font-mono text-[10px] md:text-xs tracking-mega uppercase text-muted">
            04 / Contact
          </span>
          <span className="flex-1 h-px bg-hair" />
        </div>
      </Reveal>

      <div className="max-w-5xl">
        <TextReveal
          as="h2"
          className="font-serif leading-[1.02] tracking-tight"
          style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
        >
          Have a project in mind?{" "}
          <em className="italic text-accent font-light">Say hello.</em>{" "}
          I&apos;m currently taking on new work for late 2026.
        </TextReveal>
      </div>

      <div className="mt-20 md:mt-32 border-t border-hair">
        {CHANNELS.map((c, i) => (
          <Reveal key={c.label} delay={150 + i * 100} y={20}>
            <div
              className={`group relative flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-6 py-7 md:py-9 border-b border-hair transition-colors duration-300 hover:bg-white/[0.02] ${
                c.copyable ? "cursor-pointer" : ""
              }`}
              onClick={() => c.copyable && copy(c.value)}
            >
              <div className="font-mono text-[10px] md:text-xs tracking-mega uppercase text-muted">
                {String(i + 1).padStart(2, "0")} · {c.label}
                {c.copyable && (
                  <span className="ml-3 text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    ({copied ? "Copied!" : "click to copy"})
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0 flex items-center justify-between gap-4">
                <Magnetic strength={0.2}>
                  <a
                    href={c.href}
                    data-cursor={c.copyable ? "copy" : "link"}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="block font-serif text-3xl md:text-5xl leading-none tracking-tight truncate hover:text-accent transition-colors duration-300"
                    onClick={(e) => c.copyable && e.stopPropagation()}
                  >
                    <TextScramble>{c.value}</TextScramble>
                  </a>
                </Magnetic>
                <span className="text-accent opacity-0 group-hover:opacity-100 translate-x-[-8px] group-hover:translate-x-0 transition-all duration-300 text-xl md:text-2xl shrink-0">
                  ↗
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
