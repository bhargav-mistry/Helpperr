"use client";

import { useEffect, useRef, useState } from "react";
import { HOW_IT_WORKS } from "@/lib/content";

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const els = stepRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = els.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-10% 0px -10% 0px" }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // The right column uses `sticky top-1/2` to stay centered in the viewport, but that
  // positioning is purely scroll-relative — it doesn't know the heading above is still
  // on screen. Pushing the sticky panel down by the heading block's own height means it
  // can't lock to center-screen until the heading has actually scrolled out of the way.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const update = () => setHeaderHeight(el.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="bg-bg text-ink">
      <div className="mx-auto max-w-[1440px]">
        <div ref={headerRef} className="border-b border-border px-6 py-20 text-center md:py-28">
          <span className="inline-block rounded-full border border-ink/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-ink/70">
            {HOW_IT_WORKS.tag}
          </span>
          <h2 className="font-display mx-auto mt-6 max-w-3xl text-3xl font-bold tracking-tight text-ink md:text-5xl">
            {HOW_IT_WORKS.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-text-muted md:text-lg">{HOW_IT_WORKS.sub}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div>
            {HOW_IT_WORKS.steps.map((step, i) => (
              <div
                key={step.num}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="flex min-h-screen flex-col justify-center border-b border-border px-8 py-16 last:border-b-0 md:px-16 lg:min-h-[80vh]"
              >
                <div className="flex items-center gap-3">
                  <span className="font-display text-sm font-bold text-text-dim">{step.num}</span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-accent-blue">
                    {step.label}
                  </span>
                </div>
                <h3 className="font-display mt-5 max-w-md text-3xl font-bold text-ink md:text-4xl">
                  {step.title}
                </h3>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-text-muted md:text-base">
                  {step.desc}
                </p>

                {/* Mobile-only inline visual, since sticky pinning needs the two-column layout */}
                <div className="mt-8 overflow-hidden rounded-xl border border-border bg-bg-alt lg:hidden">
                  {i === 0 ? (
                    <video src="/demo.mp4" autoPlay loop muted playsInline className="block h-56 w-full object-cover" />
                  ) : (
                    <div className="flex h-56 items-center justify-center text-sm text-text-dim">
                      {step.label} preview
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="relative hidden lg:block">
            <div
              className="sticky top-1/2 -translate-y-1/2 px-10 py-10"
              style={{ marginTop: headerHeight }}
            >
              <div className="relative aspect-[4/3] w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-surface shadow-elevation-xl">
                {HOW_IT_WORKS.steps.map((step, i) => (
                  <div
                    key={step.num}
                    className="absolute inset-0 transition-opacity duration-700 ease-out"
                    style={{ opacity: active === i ? 1 : 0 }}
                  >
                    {i === 0 ? (
                      <video
                        src="/demo.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-bg-alt text-sm text-text-dim">
                        {step.label} preview
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
