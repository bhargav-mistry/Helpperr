import {
  UserPlus,
  MonitorPlay,
  GraduationCap,
  ClipboardList,
  BookOpen,
  FileCode,
  Headset,
  Server,
  Presentation,
  Users2,
  type LucideIcon,
} from "lucide-react";
import { USE_CASES } from "@/lib/home-new-content";
import Section from "@/components/home-new/Section";
import Reveal from "@/components/Reveal";

const ICONS: Record<string, LucideIcon> = {
  UserPlus,
  MonitorPlay,
  GraduationCap,
  ClipboardList,
  BookOpen,
  FileCode,
  Headset,
  Server,
  Presentation,
  Users2,
};

export default function UseCases() {
  return (
    <Section id="use-cases" className="flex flex-col gap-16 border-b px-5 py-16 sm:px-10 lg:py-20">
      <Reveal as="div" className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
        <div className="flex flex-col gap-4">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-dashed border-[#2c2c2c] px-3 py-1 text-xs font-medium uppercase tracking-widest text-white/60">
            <ClipboardList size={12} />
            {USE_CASES.badge}
          </span>
          <h2 className="max-w-xl text-3xl font-medium leading-[1.1] text-white sm:text-4xl lg:text-[40px]">
            {USE_CASES.heading}
          </h2>
        </div>
        <p className="max-w-md text-lg leading-relaxed text-white/60 lg:pt-2">{USE_CASES.description}</p>
      </Reveal>

      <Reveal
        selector=":scope > div"
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
      >
        {USE_CASES.items.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <div
              key={item.label}
              className="flex flex-col items-start gap-4 rounded-2xl border border-[#2c2c2c] bg-[#141414] p-5 transition-colors hover:border-[#3B82F6]/50"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                <Icon size={20} className="text-white" />
              </span>
              <span className="text-sm font-medium leading-tight text-white">{item.label}</span>
            </div>
          );
        })}
      </Reveal>
    </Section>
  );
}
