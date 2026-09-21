import { STATS } from "@/lib/home-new-content";
import Section from "@/components/home-new/Section";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/home-new/CountUp";

export default function Stats() {
  return (
    <Section className="flex flex-col gap-16 border-b px-5 py-16 sm:px-10 lg:py-20">
      <Reveal as="div">
        <h2 className="max-w-[800px] text-3xl font-medium leading-[1.1] sm:text-4xl lg:text-[40px]">
          <span className="text-white/60">{STATS.heading.muted}</span>
          <span className="text-white">{STATS.heading.emphasis}</span>
        </h2>
      </Reveal>

      <Reveal
        selector=":scope > div"
        className="flex flex-col flex-wrap gap-8 rounded-2xl px-4 py-6 sm:flex-row sm:justify-between sm:px-8"
      >
        {STATS.items.map((stat) => (
          <div key={stat.label} className="flex flex-1 flex-col items-start justify-center gap-1 py-2">
            <CountUp
              value={stat.value}
              className="text-5xl font-medium leading-[1.1] text-white sm:text-6xl lg:text-[74px]"
            />
            <span className="text-lg text-white/60">{stat.label}</span>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
