"use client";

import Reveal from "@/components/ui/Reveal";
import WordReveal from "@/components/ui/WordReveal";
import TextReveal from "@/components/ui/TextReveal";
import CountUp from "@/components/ui/CountUp";

const STATS = [
  { label: "Experience", value: 1, suffix: "+", suffix2: "yr" },
  { label: "Projects", value: 12, suffix: "+", suffix2: "shipped" },
  { label: "Location", value: null, display: "Pune", suffix2: "Maharashtra, India" },
  { label: "Timezone", value: null, display: "IST", suffix2: "UTC+5:30" },
];

const STACK = [
  "JavaScript",
  "React / Next.js",
  "Tailwind CSS",
  "GSAP / Framer Motion",
  "Three.js",
  "Node.js",
  "Figma",
];

export default function About() {
  return (
    <div className="px-5 md:px-10 lg:px-16 py-28 md:py-40 max-w-[1800px] mx-auto">
      <Reveal>
        <div className="flex items-center gap-4 mb-16 md:mb-24">
          <span className="font-mono text-[10px] md:text-xs tracking-mega uppercase text-muted">
            01 / About
          </span>
          <span className="flex-1 h-px bg-hair" />
        </div>
      </Reveal>

      <div className="relative max-w-5xl">
        <TextReveal
          as="p"
          className="font-serif leading-[1.05] tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 6.5vw, 6rem)" }}
        >
          I design and build websites that feel{" "}
          <em className="italic text-accent font-light">calm</em> — interfaces
          that disappear into the work, motion that supports rather than
          shouts, code that respects the craft.
        </TextReveal>
      </div>

      <div className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        <Reveal delay={200} className="md:col-span-5 md:col-start-1">
          <div className="space-y-6 text-base md:text-lg leading-relaxed text-muted">
            <p>
              I&apos;m a young designer-developer based in Pune, working at
              the intersection of design and code. I started out of curiosity —
              Figma files in one tab, a terminal in the other — and never
              really stopped.
            </p>
            <p>
              I care about type, spacing, timing, and the weight of a button
              press. I&apos;m less interested in flashy effects and more
              interested in the kind of work that feels inevitable — sites
              that load fast, read well, and leave you in control.
            </p>
            <p>
              When I&apos;m not coding, I&apos;m probably in Figma, reading
              about Swiss typography, or sketching watch designs.
            </p>
          </div>
        </Reveal>

        <div className="md:col-span-6 md:col-start-7 flex flex-col gap-12">
          <Reveal delay={300}>
            <div className="grid grid-cols-2 gap-px bg-hair border border-hair">
              {STATS.map((s, i) => (
                <div key={s.label} className="bg-bg p-6 md:p-8">
                  <div className="font-mono text-[10px] tracking-mega uppercase text-muted mb-3">
                    {String(i + 1).padStart(2, "0")} · {s.label}
                  </div>
                  <div className="font-serif text-4xl md:text-5xl leading-none mb-2 tabular-nums">
                    {s.value !== null ? (
                      <>
                        <CountUp end={s.value} duration={1600} />
                        {s.suffix}
                      </>
                    ) : (
                      s.display
                    )}
                  </div>
                  <div className="text-xs text-muted tracking-wide">{s.suffix2}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div>
              <div className="font-mono text-[10px] tracking-mega uppercase text-muted mb-6">
                Stack
              </div>
              <div className="flex flex-wrap gap-x-2 gap-y-3">
                {STACK.map((t, i) => (
                  <span key={t} className="inline-flex items-center">
                    <span className="text-sm md:text-base">{t}</span>
                    {i < STACK.length - 1 && (
                      <span className="mx-2 text-accent/60 text-xs">•</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
