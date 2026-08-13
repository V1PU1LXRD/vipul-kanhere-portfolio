"use client";

/**
 * Grain — ultra-subtle film-grain via CSS SVG. Zero JS, zero canvas,
 * so it never blocks scroll or eats battery.
 */
export default function Grain() {
  return <div className="fixed inset-0 z-[100] pointer-events-none" aria-hidden="true" style={{
    opacity: 0.04,
    mixBlendMode: "overlay",
    backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
  }} />;
}
