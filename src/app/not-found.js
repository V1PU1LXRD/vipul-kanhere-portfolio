import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[100svh] flex flex-col items-center justify-center px-6 text-center">
      <div className="font-mono text-[10px] md:text-xs tracking-mega uppercase text-muted mb-6">
        404 / Page not found
      </div>
      <h1
        className="font-serif leading-[0.9] tracking-tight"
        style={{ fontSize: "clamp(3rem, 14vw, 10rem)" }}
      >
        You&apos;ve wandered <em className="italic text-accent font-light">off</em> the grid.
      </h1>
      <p className="mt-8 text-muted max-w-md">
        The page you&apos;re looking for doesn&apos;t exist — or maybe it never did.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-3 px-7 py-4 rounded-full bg-accent text-bg hover:bg-fg transition-colors text-sm tracking-widest uppercase"
      >
        ← Back home
      </Link>
    </main>
  );
}
