"use client";

import { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { DEMO_MODAL } from "@/lib/content";

type Errors = Partial<Record<"name" | "email", string>>;

export default function DemoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ name: "", email: "", description: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  if (!open) return null;

  const validate = () => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 900);
  };

  const reset = () => {
    setForm({ name: "", email: "", description: "" });
    setErrors({});
    setStatus("idle");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={reset}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl bg-surface p-8 shadow-[var(--shadow-xl)]"
      >
        <button
          onClick={reset}
          aria-label="Close"
          className="absolute right-5 top-5 text-text-muted transition-colors hover:text-ink"
        >
          <X size={20} />
        </button>

        {status === "success" ? (
          <div className="py-6 text-center">
            <CheckCircle2 size={40} className="mx-auto text-accent-blue" />
            <h4 className="mt-4 text-xl font-semibold text-ink">Thanks — we got it!</h4>
            <p className="mt-2 text-sm text-text-muted">
              Our team will reach out shortly to schedule your demo.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-ink">{DEMO_MODAL.heading}</h3>
            <p className="mt-1.5 text-sm text-text-muted">{DEMO_MODAL.sub}</p>

            <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
              <div>
                <label htmlFor="demo-name" className="mb-2 block text-sm font-semibold text-text-2">
                  {DEMO_MODAL.nameLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  id="demo-name"
                  type="text"
                  maxLength={50}
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    setErrors({ ...errors, name: undefined });
                  }}
                  placeholder={DEMO_MODAL.namePlaceholder}
                  className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none focus:border-accent-blue ${
                    errors.name ? "border-red-300" : "border-border-2"
                  }`}
                />
                {errors.name && <p className="mt-1 text-xs font-medium text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="demo-email" className="mb-2 block text-sm font-semibold text-text-2">
                  {DEMO_MODAL.emailLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  id="demo-email"
                  type="email"
                  maxLength={100}
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    setErrors({ ...errors, email: undefined });
                  }}
                  placeholder={DEMO_MODAL.emailPlaceholder}
                  className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none focus:border-accent-blue ${
                    errors.email ? "border-red-300" : "border-border-2"
                  }`}
                />
                {errors.email && <p className="mt-1 text-xs font-medium text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="demo-description" className="mb-2 block text-sm font-semibold text-text-2">
                  {DEMO_MODAL.descriptionLabel}
                </label>
                <textarea
                  id="demo-description"
                  rows={3}
                  maxLength={1000}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder={DEMO_MODAL.descriptionPlaceholder}
                  className="w-full resize-y rounded-lg border border-border-2 px-3.5 py-2.5 text-sm outline-none focus:border-accent-blue"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-2 flex w-full items-center justify-center rounded-lg bg-ink py-3 text-sm font-semibold text-white transition-colors hover:opacity-90 disabled:opacity-70"
              >
                {status === "loading" ? "Sending..." : "Book a Demo"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
