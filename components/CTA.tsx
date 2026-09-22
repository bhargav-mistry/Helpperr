import { CTA as CTA_DATA } from "@/lib/content";
import Reveal from "@/components/Reveal";

export default function CTA({ onBookDemo }: { onBookDemo: () => void }) {
  return (
    <section id="book-demo" className="bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal
          selector="*"
          className="relative overflow-hidden rounded-3xl bg-ink px-8 py-16 text-center md:px-16 md:py-20"
        >
          <div
            aria-hidden
            className="rainbow-glow pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full opacity-30"
          />
          <span className="relative inline-block rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/70">
            {CTA_DATA.tag}
          </span>
          <h2 className="font-display relative mt-5 text-3xl font-bold tracking-tight text-white md:text-5xl">
            {CTA_DATA.heading}
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-base text-white/70 md:text-lg">
            {CTA_DATA.sub}
          </p>
          <div className="relative mt-8 flex justify-center">
            <button
              onClick={onBookDemo}
              className="rounded-lg bg-white px-7 py-3.5 text-base font-semibold text-ink shadow-elevation-lg transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              {CTA_DATA.button}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
