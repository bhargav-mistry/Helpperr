import { CTA } from "@/lib/home-new-content";
import Reveal from "@/components/Reveal";
import { openBookDemo } from "@/lib/book-demo-modal";

export default function CTASection() {
  return (
    <div id="cta" className="relative flex items-center justify-center overflow-hidden border-y border-[#2c2c2c] px-6 py-16 sm:py-30">
      <video
        aria-hidden
        autoPlay
        loop
        muted
        playsInline
        className="absolute left-1/2 top-1/2 h-[906px] w-[1920px] max-w-none -translate-x-1/2 -translate-y-1/2 rotate-0 object-cover opacity-10 mix-blend-luminosity"
        src="/home-new/bg.mp4"
      />
      <Reveal
        as="div"
        selector="*"
        className="relative flex max-w-[800px] flex-1 flex-col items-center justify-center gap-4 text-center"
      >
        <h2 className="text-4xl font-medium leading-[1.1] text-white sm:text-6xl lg:text-[74px]">
          {CTA.heading.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>
        <div className="flex flex-wrap justify-center gap-6 pt-6">
          <button className="cursor-pointer rounded-full bg-accent-primary px-6 py-3 text-base font-medium text-white transition-transform hover:scale-[1.03] hover:opacity-90 active:scale-[0.98]">
            {CTA.primaryCta}
          </button>
          <button
            onClick={openBookDemo}
            className="cursor-pointer rounded-full border border-white px-6 py-3 text-base font-medium text-white transition-transform hover:scale-[1.03] hover:bg-white hover:text-[#0a0a0a] active:scale-[0.98]"
          >
            {CTA.secondaryCta}
          </button>
        </div>
      </Reveal>
    </div>
  );
}
