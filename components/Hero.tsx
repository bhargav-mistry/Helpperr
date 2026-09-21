"use client";

import { Fragment, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { HERO } from "@/lib/content";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";

export default function Hero({ onBookDemo }: { onBookDemo: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const restRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    const rest = restRef.current;
    if (!heading || !rest) return;

    if (prefersReducedMotion()) {
      heading.style.opacity = "1";
      rest.style.opacity = "1";
      rest.style.transform = "none";
      return;
    }

    const { gsap } = getGsap();
    const tl = gsap.timeline({ delay: 0.1 });
    tl.set(heading, { opacity: 0.001, y: 80, scale: 0.9 })
      .set(rest, { opacity: 0, y: 20 })
      .to(heading, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" })
      .to(rest, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.35");

    return () => {
      tl.kill();
    };
  }, []);

  // Scroll-scrubbed zoom on the browser mockup, matching Samvaad's hero-visual parallax:
  // it grows as it scrolls up through the viewport, rather than being tied to the whole section.
  useEffect(() => {
    const mockup = mockupRef.current;
    if (!mockup || prefersReducedMotion()) return;

    const { gsap } = getGsap();
    const tween = gsap.fromTo(
      mockup,
      { scale: 0.92, y: 40 },
      {
        scale: 1.2,
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: mockup,
          start: "top 90%",
          end: "top 10%",
          scrub: 0.6,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative overflow-x-hidden pt-40 pb-24 md:pt-52 md:pb-32">
      <div
        aria-hidden
        className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-[#a6c1ee]/25 blur-[110px]"
      />
      <div
        aria-hidden
        className="absolute -top-10 right-[-140px] h-[380px] w-[380px] rounded-full bg-[#fbc2eb]/25 blur-[110px]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1
            ref={headingRef}
            className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-[5.6rem]"
          >
            {HERO.heading.split("|").map((line, index) => (
              <Fragment key={index}>
                {index > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </h1>

          <div ref={restRef}>
            <p className="mt-6 text-lg font-semibold text-ink/80">{HERO.tagline}</p>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-muted md:text-lg">
              {HERO.sub}
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onBookDemo}
                className="rounded-lg bg-ink px-7 py-3.5 text-base font-semibold text-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                {HERO.cta}
              </button>
              <a
                href={HERO.chromeStoreHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-ink px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg"
                  alt=""
                  width={16}
                  height={16}
                />
                {HERO.tag}
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>

        <div ref={mockupRef} className="relative z-10 mx-auto mt-20 max-w-5xl will-change-transform">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-xl)]">
            <div className="flex items-center gap-2 border-b border-border bg-bg-alt px-4 py-3">
              <span className="h-3 w-3 rounded-full" style={{ background: "#FF5F57" }} />
              <span className="h-3 w-3 rounded-full" style={{ background: "#FFBD2E" }} />
              <span className="h-3 w-3 rounded-full" style={{ background: "#28CA41" }} />
              <div className="ml-3 rounded-md bg-bg px-3 py-1 text-xs text-text-dim">helpperr.com</div>
            </div>
            <video src="/demo.mp4" autoPlay loop muted playsInline className="block h-auto w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
