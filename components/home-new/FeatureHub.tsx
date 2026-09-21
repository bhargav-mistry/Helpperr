import { Sparkles, Video, PenTool, BookOpen, ShieldCheck, Repeat, TrendingUp, Users, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { FEATURE_HUB } from "@/lib/home-new-content";
import Section from "@/components/home-new/Section";
import Reveal from "@/components/Reveal";
import { splitColor } from "gsap";

const ICONS: Record<string, LucideIcon> = {
  Sparkles,
  Video,
  PenTool,
  BookOpen,
  ShieldCheck,
  Repeat,
  TrendingUp,
  Users,
};

const LEFT = FEATURE_HUB.items.slice(0, 4);
const RIGHT = FEATURE_HUB.items.slice(4);

const LEFT_Y = [8, 36, 64, 92];
const RIGHT_Y = [8, 36, 64, 92];

// A curved connector that sweeps toward the opposite side of the hub's
// centerline before arriving, so lines from different heights weave and
// cross each other near the middle instead of radiating in as straight spokes.
function connectorPath(x1: number, y1: number) {
  const midX = (x1 + 50) / 2;
  const mirroredY = 100 - y1;
  return `M ${x1},${y1} C ${midX},${y1} ${midX},${mirroredY} 50,50`;
}

function Node({ label, icon }: { label: string; icon: string }) {
  const Icon = ICONS[icon];
  return (
    <div className="flex size-[132px] flex-col items-center justify-center gap-3 rounded-2xl border border-[#2c2c2c] bg-[#141414] p-3 text-center shadow-lg shadow-black/30">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/10">
        <Icon size={24} className="text-white" />
      </span>
      <span className="text-xs font-medium leading-tight text-white">{label}</span>
    </div>
  );
}

export default function FeatureHub() {
  return (
    <Section id="platform" className="flex flex-col gap-16 border-b px-5 py-16 sm:px-10 lg:py-20">
      <Reveal as="div" className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
        <div className="flex flex-col gap-4">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-dashed border-[#2c2c2c] px-3 py-1 text-xs font-medium uppercase tracking-widest text-white/60">
            <Sparkles size={12} />
            {FEATURE_HUB.badge}
          </span>
          <h2 className="max-w-xl text-3xl font-medium leading-[1.1] text-white sm:text-4xl lg:text-[40px]">
            {FEATURE_HUB.heading.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>
        <p className="max-w-md text-lg leading-relaxed text-white/60 lg:pt-2">{FEATURE_HUB.description}</p>
      </Reveal>

      {/* Desktop / tablet: radial hub diagram */}
      <div className="relative hidden h-[600px] w-full lg:block">
        <svg
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <filter id="hub-glow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="1.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {LEFT.map((_, i) => (
            <path
              key={`l-${i}`}
              d={connectorPath(6, LEFT_Y[i])}
              fill="none"
              stroke="#2c2c2c"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {RIGHT.map((_, i) => (
            <path
              key={`r-${i}`}
              d={connectorPath(94, RIGHT_Y[i])}
              fill="none"
              stroke="#2c2c2c"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {/* Glowing purple pulse traveling from each feature toward the center */}
          {LEFT.map((_, i) => (
            <path
              key={`lg-${i}`}
              className="hub-glow-line"
              d={connectorPath(6, LEFT_Y[i])}
              fill="none"
              stroke="#5B21B6"
              strokeWidth="1.4"
              vectorEffect="non-scaling-stroke"
              filter="url(#hub-glow)"
              style={{ animationDelay: `${i * 0.35}s` }}
            />
          ))}
          {RIGHT.map((_, i) => (
            <path
              key={`rg-${i}`}
              className="hub-glow-line"
              d={connectorPath(94, RIGHT_Y[i])}
              fill="none"
              stroke="#5B21B6"
              strokeWidth="1.4"
              vectorEffect="non-scaling-stroke"
              filter="url(#hub-glow)"
              style={{ animationDelay: `${i * 0.35 + 0.15}s` }}
            />
          ))}
        </svg>

        {LEFT.map((item, i) => (
          <div
            key={item.label}
            className="absolute -translate-y-1/2"
            style={{ left: "6%", top: `${LEFT_Y[i]}%` }}
          >
            <Reveal as="div">
              <Node label={item.label} icon={item.icon} />
            </Reveal>
          </div>
        ))}

        {RIGHT.map((item, i) => (
          <div
            key={item.label}
            className="absolute -translate-x-full -translate-y-1/2"
            style={{ left: "94%", top: `${RIGHT_Y[i]}%` }}
          >
            <Reveal as="div">
              <Node label={item.label} icon={item.icon} />
            </Reveal>
          </div>
        ))}

        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: "50%", top: "50%" }}
        >
          <div className="relative flex size-28 items-center justify-center rounded-3xl bg-gradient-to-br from-[#141414] to-[#141414] shadow-[0_20px_60px_-10px_rgba(59,130,246,0.6)]">
            {/* <Image src="/home-new/icons/Layer_1-1.svg" alt="Helpperr" width={64} height={64} style={splitColor}/> */}
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="88" viewBox="0 0 180 188" fill="none">
            <path d="M130.08 147.4C130.08 150 127.97 152.11 125.37 152.11H69.2V165.58C69.2 167.17 67.5 168.18 66.1 167.41C57.96 162.92 36.48 151.07 35.25 150.31C33.73 149.37 24 144.6 24 133.25V50.75C24 48.15 26.11 46.04 28.71 46.04H57.97L129.67 45.96L130.07 147.4H130.08Z" fill="#5B21B6"/>
            <path d="M154.03 51.66C155.31 52.93 156.04 54.66 156.04 56.47V121.36C156.04 123.96 153.93 126.07 151.32 126.07H122.05L68.81 126.08C58.39 126.08 49.95 117.64 49.95 107.22V24.71C49.95 22.11 52.0599 20 54.6699 20H119.26C121.04 20 122.76 20.7 124.02 21.96L154.02 51.66H154.03Z" fill="#3B82F6"/>
            <path d="M133.02 98.6196H72.97C71.3131 98.6196 69.97 99.9628 69.97 101.62V102.39C69.97 104.046 71.3131 105.39 72.97 105.39H133.02C134.677 105.39 136.02 104.046 136.02 102.39V101.62C136.02 99.9628 134.677 98.6196 133.02 98.6196Z" fill="white"/>
            <path d="M104.19 80.3896H72.97C71.3131 80.3896 69.97 81.7328 69.97 83.3896V84.1596C69.97 85.8165 71.3131 87.1596 72.97 87.1596H104.19C105.847 87.1596 107.19 85.8165 107.19 84.1596V83.3896C107.19 81.7328 105.847 80.3896 104.19 80.3896Z" fill="white"/>
          </svg>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: simple grid of the same uniform boxes */}
      <div className="grid grid-cols-2 place-items-center gap-4 sm:grid-cols-3 lg:hidden">
        {FEATURE_HUB.items.map((item) => (
          <Node key={item.label} label={item.label} icon={item.icon} />
        ))}
      </div>
    </Section>
  );
}
