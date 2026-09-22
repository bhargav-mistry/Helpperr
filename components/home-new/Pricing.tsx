"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Users } from "lucide-react";
import { PRICING } from "@/lib/home-new-content";
import Section from "@/components/home-new/Section";
import Reveal from "@/components/Reveal";
import { openBookDemo } from "@/lib/book-demo-modal";

const teamConfig = PRICING.plans.find((plan) => plan.seats)!.seats!;
const SEAT_OPTIONS = Array.from(
  { length: teamConfig.max - teamConfig.min + 1 },
  (_, i) => teamConfig.min + i
);

function SeatSelect({ seats, onChange }: { seats: number; onChange: (n: number) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#2c2c2c] bg-[#0a0a0a] px-3 py-2 text-sm font-medium text-white transition-colors hover:border-white"
      >
        <Users size={14} className="text-white/60" />
        {seats}
        <ChevronDown size={14} className={`text-white/60 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          data-lenis-prevent
          className="absolute right-0 top-full z-10 mt-2 max-h-56 w-24 overflow-y-auto overscroll-contain rounded-lg border border-[#2c2c2c] bg-[#141414] py-1 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)]"
        >
          {SEAT_OPTIONS.map((n) => (
            <li key={n}>
              <button
                type="button"
                role="option"
                aria-selected={n === seats}
                onClick={() => {
                  onChange(n);
                  setOpen(false);
                }}
                className={`w-full cursor-pointer px-3 py-1.5 text-left text-sm transition-colors ${
                  n === seats ? "bg-accent-primary text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                {n}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PlanCard({ plan }: { plan: (typeof PRICING.plans)[number] }) {
  const [seats, setSeats] = useState(teamConfig.default);
  const isTeam = Boolean(plan.seats);

  const totalPrice = isTeam ? Number(plan.price.replace("$", "")) * seats : null;
  const totalCredits = isTeam
    ? Number(plan.credits.replace(/[^0-9]/g, "")) * seats
    : null;

  return (
    <div
      className={`flex flex-col gap-6 rounded-2xl border p-8 ${
        plan.highlight
          ? "border-accent-primary bg-[#141414] shadow-[0_20px_60px_-20px_rgba(31,22,179,0.5)]"
          : "border-[#2c2c2c] bg-[#141414]"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-lg font-medium text-white">{plan.name}</span>
        {isTeam ? (
          <SeatSelect seats={seats} onChange={setSeats} />
        ) : (
          plan.highlight && (
            <span className="rounded-full bg-accent-primary px-3 py-1 text-xs font-medium uppercase tracking-widest text-white">
              Most Popular
            </span>
          )
        )}
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-medium text-white">{plan.price}</span>
          <span className="text-sm text-white/60">{isTeam ? "/ user / month" : plan.period}</span>
        </div>
        <p className="text-sm text-white/60">{plan.description}</p>
        {isTeam && (
          <p className="text-xs text-white/40">
            ${totalPrice}/month total for {seats} seats · {teamConfig.min}–{teamConfig.max} users
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1 border-y border-[#2c2c2c] py-4">
        <span className="text-2xl font-medium text-white">
          {isTeam ? `${totalCredits!.toLocaleString()} credits` : plan.credits}
        </span>
        <span className="text-xs text-white/40">{plan.creditsNote}</span>
      </div>

      <ul className="flex flex-col gap-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-white/60">
            <Check size={16} className="mt-0.5 shrink-0 text-accent-primary" />
            {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={openBookDemo}
        className={`mt-auto cursor-pointer rounded-full px-6 py-3 text-base font-medium transition-transform hover:scale-[1.03] active:scale-[0.98] ${
          plan.highlight
            ? "bg-accent-primary text-white hover:opacity-90"
            : "border border-white text-white hover:bg-white hover:text-[#0a0a0a]"
        }`}
      >
        {plan.cta}
      </button>
    </div>
  );
}

export default function Pricing() {
  return (
    <Section id="pricing" className="flex flex-col gap-16 border-b px-5 py-16 sm:px-10 lg:py-20">
      <Reveal as="div" className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
        <div className="flex flex-col gap-4">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-dashed border-[#2c2c2c] px-3 py-1 text-xs font-medium uppercase tracking-widest text-white/60">
            {PRICING.badge}
          </span>
          <h2 className="max-w-xl text-3xl font-medium leading-[1.1] text-white sm:text-4xl lg:text-[40px]">
            {PRICING.heading.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>
        <p className="max-w-md text-lg leading-relaxed text-white/60 lg:pt-2">{PRICING.description}</p>
      </Reveal>

      <Reveal selector=":scope > div" className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {PRICING.plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} />
        ))}
      </Reveal>

      <Reveal
        as="div"
        className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-dashed border-[#2c2c2c] p-6 sm:flex-row sm:items-center sm:p-8"
      >
        <div className="flex flex-col gap-1">
          <span className="text-lg font-medium text-white">{PRICING.topUps.heading}</span>
          <p className="max-w-xl text-sm leading-relaxed text-white/60">{PRICING.topUps.description}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {PRICING.topUps.items.map((item) => (
            <div
              key={item.name}
              className="flex flex-col gap-1 rounded-xl border border-[#2c2c2c] bg-[#141414] px-5 py-3"
            >
              <span className="text-sm font-medium text-white">{item.name}</span>
              <span className="text-xs text-white/60">
                {item.credits} — {item.price}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
