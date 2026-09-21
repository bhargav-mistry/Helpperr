"use client";

import type Lenis from "lenis";
import { prefersReducedMotion } from "@/lib/gsap";

let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

/** Smoothly scroll to a section, using the page's Lenis instance when available. */
export function scrollToSection(href: string) {
  if (!href.startsWith("#") || href.length < 2) return;
  const el = document.querySelector(href);
  if (!el) return;

  if (instance) {
    instance.scrollTo(el as HTMLElement, { offset: -88, duration: 1.1 });
    return;
  }
  el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
}
