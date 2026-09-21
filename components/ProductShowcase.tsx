"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bot,
  PenTool,
  Crop,
  Video,
  FolderKanban,
  Users,
  Share2,
} from "lucide-react";
import { SHOWCASE } from "@/lib/content";
import Reveal from "@/components/Reveal";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";

const ICONS = [Bot, PenTool, Crop, Video, FolderKanban, Users, Share2];

export default function ProductShowcase() {
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    gsap.fromTo(panel, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
  }, [active]);

  const ActiveIcon = ICONS[active];

  return (
    <section id="showcase" className="bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center" selector="*">
          <span className="inline-block rounded-full border border-ink/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-ink/70">
            {SHOWCASE.tag}
          </span>
          <h2 className="font-display mt-5 text-3xl font-bold tracking-tight text-ink md:text-5xl">
            {SHOWCASE.heading}
          </h2>
          <p className="mt-4 text-base text-text-muted md:text-lg">{SHOWCASE.sub}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 items-start gap-6 lg:grid-cols-[280px_1fr]">
          <div className="flex flex-col gap-1.5 rounded-2xl border border-border bg-surface p-3 shadow-[var(--shadow-sm)] lg:sticky lg:top-28">
            {SHOWCASE.tabs.map((tab, i) => {
              const Icon = ICONS[i];
              const isActive = active === i;
              return (
                <button
                  key={tab.label}
                  onClick={() => setActive(i)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                    isActive ? "bg-ink font-semibold text-white" : "text-text-muted hover:bg-bg-alt hover:text-ink"
                  }`}
                >
                  <Icon size={16} className="shrink-0 opacity-80" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div
            ref={panelRef}
            className="flex min-h-[420px] flex-col rounded-2xl border border-border bg-surface p-8 md:p-10"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-bg-alt text-ink">
              <ActiveIcon size={24} />
            </div>
            <h3 className="font-display mt-6 text-2xl font-bold text-ink">
              {SHOWCASE.tabs[active].label}
            </h3>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-text-muted">
              {SHOWCASE.tabs[active].desc}
            </p>
            <div className="mt-auto flex flex-1 items-center justify-center pt-10">
              <div className="w-full overflow-hidden rounded-xl border border-border bg-bg-alt">
                <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FF5F57" }} />
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FFBD2E" }} />
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28CA41" }} />
                  <div className="ml-2 rounded-md bg-bg px-2.5 py-0.5 text-[11px] text-text-dim">
                    helpperr.com/{SHOWCASE.tabs[active].label.toLowerCase().replace(/[^a-z]+/g, "-")}
                  </div>
                </div>
                <div className="flex h-64 items-center justify-center text-center text-sm text-text-dim">
                  {SHOWCASE.tabs[active].label} preview
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
