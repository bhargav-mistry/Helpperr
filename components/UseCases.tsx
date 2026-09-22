import { CheckCircle2 } from "lucide-react";
import { USE_CASES } from "@/lib/content";
import Reveal from "@/components/Reveal";

export default function UseCases() {
  return (
    <section id="use-cases" className="bg-bg-alt py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center" selector="*">
          <span className="inline-block rounded-full border border-ink/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-ink/70">
            {USE_CASES.tag}
          </span>
          <h2 className="font-display mt-5 text-3xl font-bold tracking-tight text-ink md:text-5xl">
            {USE_CASES.heading}
          </h2>
          <p className="mt-4 text-base text-text-muted md:text-lg">{USE_CASES.sub}</p>
        </Reveal>

        <Reveal
          className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2"
          selector=":scope > div"
          stagger={0.04}
        >
          {USE_CASES.items.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface px-5 py-4 shadow-elevation-sm transition-all hover:-translate-y-0.5 hover:shadow-elevation-md"
            >
              <CheckCircle2 size={18} className="shrink-0 text-accent-blue" />
              <span className="text-sm font-medium text-text-2">{item}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
