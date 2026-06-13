import type { ReactNode } from "react";
import { cn } from "../lib/utils";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  dark?: boolean;
  centered?: boolean;
};

export function SectionHeader({ eyebrow, title, description, className, dark, centered }: Props) {
  return (
    <div className={cn("max-w-[640px]", centered && "mx-auto text-center", className)}>
      {eyebrow && (
        <div className={cn("mb-4 flex items-center gap-2.5", centered && "justify-center")}>
          <span className={cn("h-px w-5", dark ? "bg-[#9db5ff]" : "bg-blue")} aria-hidden />
          <p
            className={cn(
              "font-ui text-[11px] font-semibold uppercase tracking-[0.14em]",
              dark ? "text-[#9db5ff]" : "text-blue"
            )}
          >
            {eyebrow}
          </p>
        </div>
      )}
      <h2
        className={cn(
          "font-display text-[clamp(2.25rem,4.5vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.025em]",
          dark ? "text-cream" : "text-ink",
          centered && "mx-auto"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-[clamp(17px,2vw,19px)] leading-[1.65] tracking-[-0.01em]",
            dark ? "text-white/55" : "text-muted",
            centered ? "mx-auto max-w-[560px]" : "max-w-[560px]"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
