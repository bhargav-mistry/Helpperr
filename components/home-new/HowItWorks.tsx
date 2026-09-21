"use client";

import { useEffect, useRef } from "react";
import { Workflow } from "lucide-react";
import { HOW_IT_WORKS } from "@/lib/home-new-content";
import Section from "@/components/home-new/Section";
import Reveal from "@/components/Reveal";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";

// Dot x = center of each of the 4 equal quarter-columns (100 / 4 = 25 wide each).
// y cascades lower for each step, like a staircase. Content blocks are
// centered on their dot's x via translateX(-50%), so a block narrower than
// its own 25%-wide quarter can never bleed into a neighboring column.
const DOT_X = [12.5, 37.5, 62.5, 87.5];
const DOT_Y = [8, 30, 52, 74];
const DIAGRAM_HEIGHT = 420;
const CONTENT_WIDTH = 22;

const BULGE = 28;

// A single smooth quadratic curve per segment. The control point sits well
// above BOTH endpoints (not just the higher one), so each dot reads as the
// bottom of a dip and the curve arches clearly up and over before landing
// on the next dot — matching the reference's bounce/hop shape.
function buildPath(xs: number[], ys: number[]) {
  let d = `M ${xs[0]},${ys[0]}`;
  for (let i = 0; i < xs.length - 1; i++) {
    const a = { x: xs[i], y: ys[i] };
    const b = { x: xs[i + 1], y: ys[i + 1] };
    const controlX = (a.x + b.x) / 2;
    const controlY = Math.min(a.y, b.y) - BULGE;
    d += ` Q ${controlX},${controlY} ${b.x},${b.y}`;
  }
  return d;
}

const PATH = buildPath(DOT_X, DOT_Y);

export default function HowItWorks() {
  const diagramRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const diagram = diagramRef.current;
    const rect = clipRef.current;
    if (!diagram || !rect || prefersReducedMotion()) return;

    const { gsap } = getGsap();
    const tween = gsap.fromTo(
      rect,
      { attr: { width: 0 } },
      {
        attr: { width: 110 },
        ease: "none",
        scrollTrigger: {
          trigger: diagram,
          start: "top 75%",
          end: "bottom 65%",
          scrub: 0.9,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <Section id="how-it-works" className="flex flex-col gap-16 border-b px-5 py-16 sm:px-10 lg:py-20">
      <Reveal as="div" className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
        <div className="flex flex-col gap-4">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-dashed border-[#2c2c2c] px-3 py-1 text-xs font-medium uppercase tracking-widest text-white/60">
            <Workflow size={12} />
            {HOW_IT_WORKS.badge}
          </span>
          <h2 className="max-w-xl text-3xl font-medium leading-[1.1] text-white sm:text-4xl lg:text-[40px]">
            {HOW_IT_WORKS.heading.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>
        <p className="max-w-md text-lg leading-relaxed text-white/60 lg:pt-2">{HOW_IT_WORKS.description}</p>
      </Reveal>

      {/* Desktop / tablet: staircase diagram, each step confined to its own quarter-column */}
      <div ref={diagramRef} className="relative hidden w-full lg:block" style={{ height: DIAGRAM_HEIGHT }}>
        <svg
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <clipPath id="how-it-works-reveal" clipPathUnits="userSpaceOnUse">
              <rect ref={clipRef} x="-5" y="-20" width="0" height="130" />
            </clipPath>
          </defs>
          {/* Always-visible faint base line, full length */}
          <path
            d={PATH}
            fill="none"
            stroke="#3a3a3a"
            strokeOpacity="0.3"
            strokeWidth="1"
            strokeDasharray="4 4"
            vectorEffect="non-scaling-stroke"
          />
          {/* Full-opacity line that fills in over the base as the user scrolls */}
          <path
            d={PATH}
            fill="none"
            stroke="#5B21B6"
            strokeWidth="1"
            strokeDasharray="4 4"
            vectorEffect="non-scaling-stroke"
            clipPath="url(#how-it-works-reveal)"
          />
        </svg>

        {HOW_IT_WORKS.steps.map((step, i) => (
          <div key={step.number}>
            <span
              aria-hidden
              className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
              style={{ left: `${DOT_X[i]}%`, top: `${DOT_Y[i]}%` }}
            />
            <div
              className="absolute -translate-x-1/2 px-3"
              style={{
                left: `${DOT_X[i]}%`,
                top: `${DOT_Y[i]}%`,
                width: `${CONTENT_WIDTH}%`,
                marginTop: "1.75rem",
              }}
            >
              <Reveal as="div" className="flex flex-col gap-2">
                <h3 className="text-xl font-medium text-white">
                  <span className="text-white/60">{step.number}) </span>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/60">{step.body}</p>
              </Reveal>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: simple vertical timeline */}
      <div className="flex flex-col gap-8 lg:hidden">
        {HOW_IT_WORKS.steps.map((step, i) => (
          <div key={step.number} className="relative flex gap-4 px-3">
            {i > 0 && (
              <span className="absolute left-[15px] -top-8 h-8 border-l border-dashed border-[#3a3a3a]" />
            )}
            <span className="mt-1.5 size-[11px] shrink-0 rounded-full bg-white" />
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-medium text-white">
                <span className="text-white/60">{step.number}) </span>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/60">{step.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
