import { ANNOUNCEMENT } from "@/lib/home-new-content";
import Section from "@/components/home-new/Section";
import Reveal from "@/components/Reveal";

export default function AnnouncementBar() {
  return (
    <Section className="relative overflow-hidden border-b px-5 py-3.5 sm:px-10">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[244px] w-[1400px] -translate-x-1/2 -translate-y-1/2 bg-repeat-x opacity-40"
        style={{ backgroundImage: "url(/home-new/stripe-texture.svg)" }}
      />
      <Reveal as="div" className="relative flex items-center gap-2.5" selector="*" y={10}>
        <span className="shrink-0 whitespace-nowrap rounded-2xl bg-[#4a4a4a] px-4 py-1.5 text-sm font-medium tracking-[0.42px] text-white backdrop-blur-[7px]">
          {ANNOUNCEMENT.badge}
        </span>
        <p className="truncate text-base font-medium text-white">{ANNOUNCEMENT.text}</p>
      </Reveal>
    </Section>
  );
}
