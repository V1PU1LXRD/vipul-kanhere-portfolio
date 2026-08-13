"use client";

import Reveal from "@/components/ui/Reveal";

const NOW = [
  { label: "Listening", value: "Nils Frahm — All Melody" },
  { label: "Reading", value: "The Design of Everyday Things" },
  { label: "Learning", value: "WebGPU & compute shaders" },
  { label: "Building", value: "A tiny design-tool prototype" },
];

export default function Now() {
  return (
    <div className="px-6 md:px-10 lg:px-16 py-20 md:py-28 max-w-[1800px] mx-auto">
      <Reveal>
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-[10px] md:text-xs tracking-mega uppercase text-muted">
            Now
          </span>
          <span className="flex-1 h-px bg-hair" />
          <span className="font-mono text-[10px] md:text-xs tracking-mega uppercase text-accent flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
            </span>
            Updated recently
          </span>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-hair border border-hair">
        {NOW.map((n, i) => (
          <Reveal key={n.label} delay={i * 60} y={20}>
            <div className="bg-bg p-6 md:p-8 h-full">
              <div className="font-mono text-[10px] tracking-mega uppercase text-muted mb-4">
                {n.label}
              </div>
              <div className="font-serif text-xl md:text-2xl leading-snug italic text-fg/90">
                &ldquo;{n.value}&rdquo;
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
