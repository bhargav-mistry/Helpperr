"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ as FAQ_DATA } from "@/lib/content";
import Reveal from "@/components/Reveal";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center" selector="*">
          <span className="inline-block rounded-full border border-ink/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-ink/70">
            {FAQ_DATA.tag}
          </span>
          <h2 className="font-display mt-5 text-3xl font-bold tracking-tight text-ink md:text-5xl">
            {FAQ_DATA.heading}
          </h2>
        </Reveal>

        <Reveal
          className="mx-auto mt-14 flex max-w-3xl flex-col gap-3"
          selector=":scope > div"
          stagger={0.04}
        >
          {FAQ_DATA.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--shadow-sm)]"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-sm font-semibold text-ink md:text-base">{item.q}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-text-muted transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-accent-blue" : ""
                    }`}
                  />
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-text-muted">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
