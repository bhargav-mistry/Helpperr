"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { subscribeBookDemo } from "@/lib/book-demo-modal";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";

export default function BookDemoModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      subscribeBookDemo(() => {
        setSubmitted(false);
        setOpen(true);
      }),
    []
  );

  useEffect(() => {
    if (!open) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    if (!prefersReducedMotion()) {
      const { gsap } = getGsap();
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 20, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out" }
      );
    }

    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center px-4">
      <div
        ref={backdropRef}
        aria-hidden
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-demo-title"
        className="relative w-full max-w-md rounded-2xl border border-[#2c2c2c] bg-[#141414] p-6 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] sm:p-8"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-4 top-4 cursor-pointer text-white/50 transition-colors hover:text-white"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-gradient-to-r from-[#3B82F6] to-[#5B21B6]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M5 13l4 4L19 7"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h3 className="text-xl font-medium text-white">Request received</h3>
            <p className="text-sm leading-relaxed text-white/60">
              Thanks for reaching out — our team will follow up by email shortly.
            </p>
          </div>
        ) : (
          <>
            <h3 id="book-demo-title" className="text-2xl font-medium text-white">
              Book a Demo
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              Tell us a bit about yourself and we&apos;ll get back to you shortly.
            </p>

            <form
              className="mt-6 flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div className="flex flex-col gap-1.5">
                <label htmlFor="demo-name" className="text-sm font-medium text-white">
                  Name
                </label>
                <input
                  id="demo-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Jane Doe"
                  className="rounded-lg border border-[#2c2c2c] bg-[#0a0a0a] px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#3B82F6]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="demo-email" className="text-sm font-medium text-white">
                  Email
                </label>
                <input
                  id="demo-email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@company.com"
                  className="rounded-lg border border-[#2c2c2c] bg-[#0a0a0a] px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#3B82F6]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="demo-message" className="text-sm font-medium text-white">
                  Message <span className="text-white/40">(optional)</span>
                </label>
                <textarea
                  id="demo-message"
                  name="message"
                  rows={3}
                  placeholder="What would you like to see?"
                  className="resize-none rounded-lg border border-[#2c2c2c] bg-[#0a0a0a] px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#3B82F6]"
                />
              </div>

              <button
                type="submit"
                className="mt-2 cursor-pointer rounded-full bg-accent-primary px-6 py-3 text-base font-medium text-white transition-transform hover:scale-[1.02] hover:opacity-90 active:scale-[0.98]"
              >
                Send Request
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
