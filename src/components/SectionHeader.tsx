import type { ReactNode } from "react";
import { cn } from "../lib/utils";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  className?: string;
  dark?: boolean;
};

export function SectionHeader({ eyebrow, title, description, className, dark }: Props) {
  return (
    <div className={cn("max-w-[640px]", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-4 text-[14px] font-semibold tracking-[-0.01em]",
            dark ? "text-[#9db5ff]" : "text-blue"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-[clamp(2.25rem,4.5vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.025em]",
          dark ? "text-cream" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 max-w-[560px] text-[clamp(17px,2vw,19px)] leading-[1.65] tracking-[-0.01em]",
            dark ? "text-white/55" : "text-muted"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
