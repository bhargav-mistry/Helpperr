"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/home-new-content";
import Section from "@/components/home-new/Section";
import { scrollToSection } from "@/lib/lenis";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#2c2c2c] bg-[#0a0a0a]">
      <Section>
        <div className="flex items-center gap-10 px-5 py-3.5 sm:px-10">
        <div className="w-40 shrink-0">
          <Image src="/home-new/icons/Layer_1.svg" alt="helpperr" width={260} height={30}/>
        </div>

        <nav className="hidden flex-1 items-center lg:flex">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                if (!link.href.startsWith("#")) return;
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className={`group relative cursor-pointer p-6 text-base font-medium transition-colors hover:text-white ${
                i === 0 ? "text-white" : "text-white/60"
              }`}
            >
              {link.label}
              <span className="absolute bottom-4 left-6 right-6 h-px origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden lg:block">
          <button className="cursor-pointer rounded-full bg-accent-primary px-6 py-3 text-base font-medium text-white transition-transform hover:scale-[1.03] hover:opacity-90 active:scale-[0.98]">
            Get Started
          </button>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="ml-auto cursor-pointer text-white lg:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute inset-x-0 top-full min-h-screen overflow-y-auto border-t border-[#2c2c2c] bg-[#0a0a0a] lg:hidden">
          <div className="flex flex-col gap-1 px-5 py-4">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  setMenuOpen(false);
                  if (!link.href.startsWith("#")) return;
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`cursor-pointer rounded-lg px-3 py-3 text-base font-medium ${
                  i === 0 ? "text-white" : "text-white/60"
                }`}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => setMenuOpen(false)}
              className="mt-2 cursor-pointer rounded-full bg-accent-primary px-6 py-3 text-base font-medium text-white transition-transform active:scale-[0.98]"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
      </Section>
    </header>
  );
}
