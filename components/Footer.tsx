import Image from "next/image";
import { FOOTER } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#0b0b12] py-16 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/logo.png"
              alt="Helpperr"
              width={132}
              height={36}
              className="h-9 w-auto brightness-0 invert"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {FOOTER.brandBlurb}
            </p>
          </div>

          {FOOTER.columns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-sm font-semibold text-white">{col.heading}</h4>
              <div className="mt-4 flex flex-col gap-3">
                {col.links.map((link) =>
                  "external" in link && link.external ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} Helpperr Inc. All rights reserved.</span>
          <span>{FOOTER.bottomRight}</span>
        </div>
      </div>
    </footer>
  );
}
