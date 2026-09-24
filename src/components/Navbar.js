"use client";

import { useEffect, useRef, useState } from "react";
import Magnetic from "@/components/ui/Magnetic";
import LiveClock from "@/components/ui/LiveClock";
import gsap from "gsap";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#designs", label: "Designs" },
  { href: "#contact", label: "Contact" },
  { href: "#settings", label: "Settings" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = menuItemsRef.current.filter(Boolean);

    if (menuOpen) {
      menuRef.current.style.display = "flex";
      if (prefersReduced) {
        menuRef.current.style.opacity = "1";
      } else {
        gsap.fromTo(
          menuRef.current,
          { yPercent: -100 },
          { yPercent: 0, duration: 0.7, ease: "power4.out" }
        );
        gsap.fromTo(
          items,
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, ease: "power4.out", stagger: 0.07, delay: 0.25 }
        );
      }
      document.body.style.overflow = "hidden";
    } else {
      const close = () => {
        if (menuRef.current) menuRef.current.style.display = "none";
      };
      if (prefersReduced) {
        close();
      } else {
        gsap.to(menuRef.current, {
          yPercent: -100,
          duration: 0.6,
          ease: "power4.in",
          onComplete: close,
        });
      }
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[140] transition-all duration-500 safe-pt ${
          scrolled
            ? "backdrop-blur-xl bg-bg/70 border-b border-hair"
            : "bg-transparent"
        }`}
      >
        <nav
          className="max-w-[1800px] mx-auto px-5 md:px-10 lg:px-16 h-16 md:h-20 flex items-center justify-between"
          aria-label="Primary"
        >
          {/* Logo */}
          <a
            href="#home"
            className="font-serif text-2xl md:text-3xl italic tracking-tight hover:text-accent transition-colors duration-300 shrink-0"
            aria-label="Home"
          >
            VK<span className="text-accent">.</span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-8 xl:gap-10">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Magnetic>
                  <a
                    href={l.href}
                    data-cursor
                    className="group relative font-sans text-xs tracking-mega uppercase text-fg/80 hover:text-fg transition-colors duration-300 py-2"
                  >
                    {l.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-500 ease-out group-hover:w-full" />
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>

          {/* Right cluster */}
          <div className="hidden md:flex items-center gap-5 lg:gap-6">
            <div className="hidden lg:block">
              <LiveClock />
            </div>
            <Magnetic strength={0.4}>
              <a
                href="#contact"
                data-cursor="email"
                className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-hair hover:border-accent hover:bg-accent hover:text-bg transition-all duration-300 text-xs tracking-mega uppercase whitespace-nowrap"
              >
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-70 group-hover:bg-bg animate-ping" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent group-hover:bg-bg" />
                </span>
                Get in touch
              </a>
            </Magnetic>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 items-end p-3 -mr-3"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-px bg-fg transition-all duration-300 ${
                menuOpen ? "w-6 rotate-45 translate-y-[7px]" : "w-6"
              }`}
            />
            <span
              className={`block h-px bg-fg transition-all duration-300 ${
                menuOpen ? "opacity-0" : "w-4"
              }`}
            />
            <span
              className={`block h-px bg-fg transition-all duration-300 ${
                menuOpen ? "w-6 -rotate-45 -translate-y-[7px]" : "w-5"
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[135] bg-bg flex-col items-center justify-center gap-8 safe-pt safe-pb md:hidden px-6"
        style={{ display: "none", yPercent: -100 }}
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col items-center gap-6">
          {LINKS.map((l, i) => (
            <li
              key={l.href}
              ref={(el) => {
                menuItemsRef.current[i] = el;
              }}
              className="overflow-hidden"
            >
              <a
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block font-serif text-5xl italic tracking-tight"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-4 px-6">
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="px-6 py-3.5 bg-accent text-bg text-xs tracking-mega uppercase rounded-full w-full max-w-xs text-center"
          >
            Get in touch →
          </a>
          <LiveClock />
        </div>
      </div>
    </>
  );
}
