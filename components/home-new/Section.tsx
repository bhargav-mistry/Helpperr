import type { ReactNode } from "react";

export default function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`mx-auto w-full max-w-[1440px] border-x border-[#2c2c2c] ${className}`}>
      {children}
    </section>
  );
}
