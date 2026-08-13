"use client";

import Magnetic from "@/components/ui/Magnetic";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative px-5 md:px-10 lg:px-16 pt-20 md:pt-28 pb-8 md:pb-10 border-t border-hair safe-pb overflow-hidden">
      {/* Giant CTA */}
      <div className="py-4 md:py-10">
        <Magnetic strength={0.2}>
          <a
            href="mailto:vipul.kanhere@gmail.com"
            data-cursor="email"
            className="block group"
            aria-label="Send an email"
          >
            <h2
              className="font-serif text-fg tracking-tight transition-colors duration-500 group-hover:text-accent break-normal"
              style={{
                fontSize: "clamp(3rem, 18vw, 15rem)",
                lineHeight: 1.05,
                wordBreak: "keep-all",
                overflowWrap: "normal",
              }}
            >
              Let&apos;s{" "}
              <em
                className="italic text-accent font-light group-hover:text-fg transition-colors duration-500"
                style={{ fontStyle: "italic" }}
              >
                talk.
              </em>
            </h2>
          </a>
        </Magnetic>
      </div>

      {/* Meta bar */}
      <div className="mt-8 md:mt-16 pt-8 border-t border-hair flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-mono text-[10px] md:text-xs tracking-mega uppercase text-muted">
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <span>© {year} VK.</span>
          <span className="hidden md:inline text-dim">/</span>
          <span className="font-serif italic normal-case text-base tracking-normal text-fg/60">
            Made with care in India
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <Magnetic strength={0.3}>
            <a
              href="mailto:vipul.kanhere@gmail.com"
              className="hover:text-accent transition-colors"
              data-cursor
            >
              vipul.kanhere@gmail.com
            </a>
          </Magnetic>
          <span className="text-dim">/</span>
          <Magnetic strength={0.3}>
            <a
              href="#home"
              className="group inline-flex items-center gap-2 hover:text-accent transition-colors"
              data-cursor
            >
              Back to top
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1">
                ↑
              </span>
            </a>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
