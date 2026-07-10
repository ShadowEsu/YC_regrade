import { cn } from "../lib/utils";

type RegradeLogoProps = {
  size?: number;
  variant?: "mark" | "wordmark" | "whale" | "svg";
  className?: string;
  invert?: boolean;
};

export function RegradeLogo({
  size = 24,
  variant = "mark",
  className,
  invert = false,
}: RegradeLogoProps) {
  const markSrc = invert ? "/logo-mark-light.png" : "/logo-mark.png";

  if (variant === "wordmark") {
    return (
      <span className={cn("inline-flex items-center gap-2.5", className)}>
        <img
          src={markSrc}
          alt=""
          aria-hidden
          width={size}
          height={size}
          className="shrink-0 rounded-[22%] object-contain shadow-[0_2px_12px_rgba(30,79,255,0.22)]"
          style={{ width: size, height: size }}
        />
        <span
          className={cn(
            "font-brand font-semibold leading-none tracking-[-0.02em]",
            invert ? "text-white" : "text-ink"
          )}
          style={{ fontSize: Math.round(size * 0.72) }}
        >
          Regrade
        </span>
      </span>
    );
  }

  if (variant === "whale") {
    return (
      <img
        src="/mr-whale.png"
        alt="Mr Whale"
        width={size}
        height={Math.round(size * 0.73)}
        className={cn("shrink-0 object-contain", className)}
        style={{ width: size, height: "auto" }}
      />
    );
  }

  return (
    <img
      src={markSrc}
      alt=""
      aria-hidden
      width={size}
      height={size}
      className={cn("shrink-0 rounded-[22%] object-contain", className)}
    />
  );
}
