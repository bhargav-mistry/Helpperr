"use client";

import { useEffect, useRef, useState } from "react";
import { FEATURES } from "@/lib/home-new-content";
import Section from "@/components/home-new/Section";
import Reveal from "@/components/Reveal";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";

// A distinct gradient per step, shown behind (or instead of, if the video
// file isn't there yet) each feature's video.
const GRADIENTS = [
  "from-[#3B82F6]/20 via-[#0a0a0a] to-[#0a0a0a]",
  "from-[#5B21B6]/20 via-[#0a0a0a] to-[#0a0a0a]",
  "from-fuchsia-500/20 via-[#0a0a0a] to-[#0a0a0a]",
  "from-amber-500/20 via-[#0a0a0a] to-[#0a0a0a]",
  "from-emerald-500/20 via-[#0a0a0a] to-[#0a0a0a]",
  "from-sky-500/20 via-[#0a0a0a] to-[#0a0a0a]",
  "from-rose-500/20 via-[#0a0a0a] to-[#0a0a0a]",
];

export default function FeaturesSticky() {
  const rowRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const { ScrollTrigger } = getGsap();

    const triggers = itemRefs.current.map((el, i) => {
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) setActive(i);
        },
      });
    });

    return () => {
      triggers.forEach((t) => t?.kill());
    };
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === active) video.play().catch(() => {});
      else video.pause();
    });
  }, [active]);

  return (
    <Section id="features" className="flex flex-col gap-20 border-b px-5 py-16 sm:px-10 lg:py-20">
      <Reveal as="div">
        <h2 className="max-w-[800px] text-3xl font-medium leading-[1.1] text-white sm:text-4xl lg:text-[40px]">
          <span className="text-white/60">{FEATURES.heading.muted}</span>
          <span>{FEATURES.heading.emphasis}</span>
        </h2>
      </Reveal>

      {/* Mobile / tablet: each feature carries its own inline video */}
      <div className="flex flex-col gap-10 lg:hidden">
        {FEATURES.items.map((item, i) => (
          <Reveal key={item.title} as="div" selector="*" className="flex flex-col gap-4">
            <div className={`relative aspect-video w-full overflow-hidden rounded-2xl bg-gradient-to-br ${GRADIENTS[i]}`}>
              <video
                src={item.video}
                muted
                loop
                playsInline
                preload="none"
                className="absolute inset-0 size-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-medium leading-[1.1] text-white">{item.title}</h3>
            <p className="text-base leading-relaxed text-white/60">{item.body}</p>
          </Reveal>
        ))}
      </div>

      {/* Desktop: sticky video panel on the right, active feature drives which video plays */}
      <div ref={rowRef} className="hidden lg:flex lg:flex-row lg:gap-20">
        <div className="flex flex-col gap-16 lg:flex-1">
          {FEATURES.items.map((item, i) => (
            <div
              key={item.title}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="flex min-h-[70vh] flex-col justify-center gap-4 lg:max-w-[560px]"
            >
              <Reveal as="div" selector="*" className="flex flex-col gap-4">
                <span className={`text-sm font-medium ${i === active ? "text-white" : "text-white/40"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={`text-3xl font-medium leading-[1.1] transition-colors ${i === active ? "text-white" : "text-white/40"}`}>
                  {item.title}
                </h3>
                <p className="text-lg leading-relaxed text-white/60">{item.body}</p>
              </Reveal>
            </div>
          ))}
        </div>

        <div className="lg:flex-1">
          <div className="sticky top-24 h-[600px] overflow-hidden rounded-2xl">
            {FEATURES.items.map((item, i) => (
              <div
                key={item.title}
                className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-500 ${GRADIENTS[i]} ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  src={item.video}
                  muted
                  loop
                  playsInline
                  preload="none"
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
