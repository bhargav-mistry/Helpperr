"use client";

import { useEffect, useRef } from "react";
import { HERO } from "@/lib/home-new-content";
import Section from "@/components/home-new/Section";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";
import { onPreloadDone } from "@/lib/preloader-gate";
import { openBookDemo } from "@/lib/book-demo-modal";

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const restRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    const rest = restRef.current;
    const steps = stepsRef.current;
    if (!heading || !rest || !steps) return;

    const stepItems = Array.from(steps.children) as HTMLElement[];

    if (prefersReducedMotion()) {
      heading.style.opacity = "1";
      rest.style.opacity = "1";
      rest.style.transform = "none";
      stepItems.forEach((item) => {
        item.style.opacity = "1";
        item.style.transform = "none";
      });
      return;
    }

    const { gsap } = getGsap();
    gsap.set(heading, { opacity: 0.001, y: 60, scale: 0.96 });
    gsap.set(rest, { opacity: 0, y: 24 });
    gsap.set(stepItems, { opacity: 0, y: 24 });

    // Wait for the preloader to finish before playing the entrance, so it
    // isn't wasted running invisibly underneath the loading overlay.
    let tl: ReturnType<typeof gsap.timeline> | null = null;
    const start = () => {
      tl = gsap.timeline({ delay: 0.15 });
      tl.to(heading, { opacity: 1, y: 0, scale: 1, duration: 1.3, ease: "power2.out" })
        .to(rest, { opacity: 1, y: 0, duration: 1.1, ease: "power2.out" }, "-=0.7")
        .to(stepItems, { opacity: 1, y: 0, duration: 0.9, stagger: 0.18, ease: "power2.out" }, "-=0.55");
    };

    onPreloadDone(start);

    return () => {
      tl?.kill();
    };
  }, []);

  return (
    <Section id="hero" className="flex flex-col gap-16 border-b px-5 pb-24 pt-24 sm:px-10 lg:flex-row lg:gap-20 lg:pt-20">
      <div className="flex flex-col justify-between gap-16 lg:flex-1 lg:pt-10">
        <div>
          <h1
            ref={headingRef}
            className="text-5xl font-medium leading-[1.1] text-white sm:text-6xl lg:text-[74px]"
          >
            {HERO.heading}
          </h1>
          <div ref={restRef} className="flex flex-col items-start gap-4 pt-4">
            <p className="max-w-xl text-lg leading-relaxed text-white/60">{HERO.sub}</p>
            <div className="flex flex-wrap gap-6 pt-6">
              <button
                onClick={openBookDemo}
                className="cursor-pointer rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#5B21B6] px-6 py-3 text-base font-medium text-white transition-transform hover:scale-[1.03] hover:opacity-90 active:scale-[0.98]"
              >
                {HERO.primaryCta}
              </button>
              <button className="cursor-pointer rounded-lg border border-white px-6 py-3 text-base font-medium text-white transition-transform hover:scale-[1.03] hover:bg-white hover:text-[#0a0a0a] active:scale-[0.98]">
                {HERO.secondaryCta}
              </button>
            </div>
          </div>
        </div>

        <div ref={stepsRef} className="flex max-w-[1280px] flex-col gap-6 sm:flex-row">
          {HERO.steps.map((step) => (
            <div key={step.label} className="flex flex-1 flex-col gap-1 py-2">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-medium text-white/60">{step.number}</span>
                <span className="text-xl font-medium text-white">{step.label}</span>
              </div>
              <p className="text-sm leading-relaxed text-white/60">{step.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative hidden h-auto min-h-[400px] flex-1 overflow-hidden lg:block">
        {[-48, 108.6, 264.4, 421, 576].map((top, i) => (
          <div
            key={i}
            aria-hidden
            className="absolute h-[244px] w-[1400px] bg-repeat-x opacity-25"
            style={{ top, left: -190, backgroundImage: "url(/home-new/stripe-texture.svg)" }}
          />
        ))}
      </div>
    </Section>
  );
}
