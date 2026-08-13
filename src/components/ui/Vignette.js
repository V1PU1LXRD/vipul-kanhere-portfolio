/**
 * Vignette — extremely subtle corner darkening for cinematic depth.
 * Almost invisible unless you're looking for it.
 */
export default function Vignette() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[50]"
      style={{
        background:
          "radial-gradient(ellipse at center, transparent 62%, rgba(0,0,0,0.35) 100%)",
      }}
    />
  );
}
