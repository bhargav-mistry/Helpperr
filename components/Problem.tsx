"use client";

import { Clock, Search, Layers } from "lucide-react";
import { PROBLEM } from "@/lib/content";
import Reveal from "@/components/Reveal";

const ICONS = [Clock, Search, Layers];

export default function Problem({ onBookDemo }: { onBookDemo: () => void }) {
  return (
    <section id="problem" className="relative overflow-hidden bg-[#0b0b12] py-24 text-white md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-[#2572ed]/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center" selector="*">
          <span className="inline-block rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/70">
            {PROBLEM.tag}
          </span>
          <h2 className="font-display mt-6 text-3xl font-bold tracking-tight text-white md:text-5xl">
            {PROBLEM.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/60 md:text-base">{PROBLEM.sub}</p>
          <button
            onClick={onBookDemo}
            className="mt-7 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            {"Book a Demo"}
          </button>
        </Reveal>

        <Reveal selector="*" className="mx-auto mt-14 max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111117] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-3">
              <span className="h-3 w-3 rounded-full" style={{ background: "#FF5F57" }} />
              <span className="h-3 w-3 rounded-full" style={{ background: "#FFBD2E" }} />
              <span className="h-3 w-3 rounded-full" style={{ background: "#28CA41" }} />
              <div className="ml-3 rounded-md bg-black/30 px-3 py-1 text-xs text-white/50">helpperr.com</div>
            </div>
            <video src="/demo.mp4" autoPlay loop muted playsInline className="block h-auto w-full" />
          </div>
        </Reveal>

        <Reveal
          className="mt-20 grid grid-cols-1 gap-10 border-t border-white/10 pt-14 sm:grid-cols-3"
          selector=":scope > div"
        >
          {PROBLEM.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <div key={item.title}>
                <Icon size={20} className="text-[#f2b84b]" />
                <h3 className="mt-4 text-base font-semibold text-[#f2b84b]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{item.desc}</p>
              </div>
            );
          })}
        </Reveal>

        <Reveal className="mt-16 flex justify-center" selector="*">
          <span className="rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-white/80">
            {PROBLEM.closing}
          </span>
        </Reveal>
      </div>
    </section>
  );
}
