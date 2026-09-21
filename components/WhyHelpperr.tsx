import { ArrowUpRight } from "lucide-react";
import { WHY_HELPPERR } from "@/lib/content";
import Reveal from "@/components/Reveal";

export default function WhyHelpperr() {
  return (
    <section id="why-helpperr" className="bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center" selector="*">
          <span className="inline-block rounded-full border border-ink/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-ink/70">
            {WHY_HELPPERR.tag}
          </span>
          <h2 className="font-display mt-5 text-3xl font-bold tracking-tight text-ink md:text-5xl">
            {WHY_HELPPERR.heading}
          </h2>
          <p className="mt-4 text-base text-text-muted md:text-lg">{WHY_HELPPERR.sub}</p>
        </Reveal>

        <Reveal className="mt-16 flex flex-col" selector=":scope > div">
          {WHY_HELPPERR.items.map((item, i) => (
            <div
              key={item.title}
              className="group flex flex-col gap-2 border-t border-border py-7 last:border-b sm:flex-row sm:items-baseline sm:gap-8"
            >
              <span className="pastel-text font-display shrink-0 text-2xl font-extrabold sm:w-14">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-1 flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <h3 className="font-display text-xl font-bold text-ink transition-colors group-hover:text-accent-blue sm:w-96 sm:shrink-0">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-muted sm:max-w-md">{item.desc}</p>
              </div>
              <ArrowUpRight
                size={20}
                className="hidden shrink-0 text-text-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-blue sm:block"
              />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
