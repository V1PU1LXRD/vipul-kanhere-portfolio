"use client";

/**
 * Marquee — pure CSS infinite scroll.
 *
 * Why CSS only? Because CSS animations run on the compositor thread and
 * NEVER get stuck when you scroll fast, switch tabs, or the main thread is
 * busy — unlike JS (GSAP) loops which can stall during heavy scroll.
 * Content is triplicated so the loop is completely seamless.
 */
export default function Marquee({
  items = [],
  reverse = false,
  speed = 45,
  bordered = true,
}) {
  const itemGroup = (key) => (
    <div
      key={key}
      className="flex items-center shrink-0 marquee-slide"
      aria-hidden={key !== 0}
    >
      {items.map((item, i) => (
        <div key={`${key}-${i}`} className="flex items-center shrink-0">
          <span className="px-5 md:px-8 shrink-0 font-serif italic text-[clamp(2rem,5vw,4.5rem)] leading-none text-fg/20 whitespace-nowrap">
            {item}
          </span>
          <span
            className="text-accent text-xl md:text-2xl shrink-0"
            aria-hidden="true"
          >
            ✦
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={`relative py-10 md:py-16 overflow-hidden ${
        bordered ? "border-y border-hair" : ""
      }`}
      aria-hidden="false"
    >
      <div
        className={`flex items-center whitespace-nowrap w-max ${
          reverse ? "marquee-css-rev" : "marquee-css"
        }`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {[0, 1, 2].map(itemGroup)}
      </div>
    </div>
  );
}
