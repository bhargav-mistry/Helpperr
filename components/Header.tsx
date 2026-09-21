"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/content";

export default function Header({ onBookDemo }: { onBookDemo: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:px-6">
      <header
        className={`w-full max-w-8xl transition-all duration-800 ease-out ${
          scrolled || menuOpen
            ? "max-w-5xl rounded-2xl  border border-border bg-surface px-4 py-3 shadow-[var(--shadow-md)]"
            : "max-w-7xl rounded-2xl border border-transparent bg-transparent px-2 py-3"
        }`}
      >
        <div className="flex items-center justify-between gap-8">
          <a href="/" className="flex shrink-0 items-center">
            <Image src="/logo.png" alt="Helpperr" width={124} height={34} priority className="h-10 w-auto" />
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative rounded-lg px-4 py-2 text-sm font-medium text-text transition-colors"
              >
                <span
                  aria-hidden
                  className="rainbow-glow absolute inset-1 -z-10 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-25"
                />
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {/* <a href="#" className="text-sm font-medium text-text-muted transition-colors hover:text-text">
              Log In
            </a> */}
            {/* <a
              href="#"
              className="rounded-lg border border-ink px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
            >
              Get Started
            </a> */}
            <button
              onClick={onBookDemo}
              className="rounded-lg bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Get Started
            </button>
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="text-text md:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="mt-3 flex flex-col gap-1 border-t border-border pt-3 pb-1 md:hidden">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-text-2 hover:bg-bg-alt"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              {/* <a
                href="#"
                className="rounded-lg border border-ink px-4 py-2.5 text-center text-sm font-semibold text-ink"
              >
                Log In
              </a>
              <a
                href="#"
                className="rounded-lg border border-ink px-4 py-2.5 text-center text-sm font-semibold text-ink"
              >
                Sign Up
              </a> */}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onBookDemo();
                }}
                className="rounded-lg bg-ink px-5 py-2.5 text-sm font-semibold text-white"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
