"use client";

import Image from "next/image";
import { FOOTER } from "@/lib/home-new-content";
import Section from "@/components/home-new/Section";
import Reveal from "@/components/Reveal";
import { scrollToSection } from "@/lib/lenis";
import { openBookDemo } from "@/lib/book-demo-modal";

const SOCIAL_ICONS = [
  { name: "Twitter", src: "/home-new/icons/twitter.svg" },
  { name: "LinkedIn", src: "/home-new/icons/linkedin.svg" },
  { name: "GitHub", src: "/home-new/icons/github.svg" },
];

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-[#0a0a0a]">
      <Section className="flex flex-col gap-16 px-5 py-16 sm:px-10 lg:py-20">
        <Reveal selector=":scope > div" className="flex flex-col gap-16 lg:flex-row lg:gap-[120px]">
          <div className="flex w-full flex-col gap-6 lg:w-[300px] lg:shrink-0">
            <span className="text-2xl font-medium text-white">{FOOTER.brand}</span>
            <p className="text-sm leading-relaxed text-white/60">{FOOTER.description}</p>
          </div>

          <div className="flex flex-1 flex-col gap-10 sm:flex-row sm:gap-20">
            {FOOTER.columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-4">
                <span className="text-sm font-medium text-white">{col.title}</span>
                {col.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      if (link.label === "Book a Demo") {
                        e.preventDefault();
                        openBookDemo();
                        return;
                      }
                      if (!link.href.startsWith("#")) return;
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="cursor-pointer text-sm text-white/60 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start gap-6 lg:items-end">
            <span className="text-sm font-medium text-white">{FOOTER.social.label}</span>
            <div className="flex gap-4">
              {SOCIAL_ICONS.map((icon) => (
                <a
                  key={icon.name}
                  href="#"
                  aria-label={icon.name}
                  className="cursor-pointer opacity-60 transition-opacity hover:opacity-100"
                >
                  <Image src={icon.src} alt="" width={20} height={20} />
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-2 border-t border-[#2c2c2c] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/60">{FOOTER.copyright}</p>
          <p className="text-xs text-white/60">{FOOTER.tagline}</p>
        </div>
      </Section>

      {/* <div aria-hidden className="relative h-[16vw] w-full select-none overflow-hidden pointer-events-none">
        <p
          className="absolute inset-x-0 top-0 whitespace-nowrap text-center text-[24vw] font-extrabold leading-none tracking-tight text-[#232323]"
       style={{
  color: "#2c2c2c",
  textShadow: `
    4px 4px 4px rgba(255,255,255,0.3),
    -2px -2px 2px rgba(0,0,0,0.8),
    0 0 2px rgba(0,0,0,0.3)
  `,
}}
        >
          {FOOTER.watermark}
        </p>
      </div> */}
    </footer>
  );
}
