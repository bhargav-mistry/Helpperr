"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";
import { setLenis } from "@/lib/lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const { gsap, ScrollTrigger } = getGsap();
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    setLenis(lenis);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      setLenis(null);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <>{children}</>;
}
