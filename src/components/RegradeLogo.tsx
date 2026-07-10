import { cn } from "../lib/utils";

type RegradeLogoProps = {
  size?: number;
  variant?: "mark" | "wordmark" | "app" | "whale";
  className?: string;
  invert?: boolean;
};

export function RegradeLogo({
  size = 24,
  variant = "mark",
  className,
  invert = false,
}: RegradeLogoProps) {
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

  if (variant === "wordmark") {
    if (invert) {
      return (
        <span className={cn("inline-flex items-center gap-2.5", className)}>
          <img
            src="/logo-mark-dark.png"
            alt=""
            aria-hidden
            width={size}
            height={size}
            className="shrink-0 rounded-[22%] object-contain"
            style={{ width: size, height: size }}
          />
          <span
            className="font-brand font-semibold leading-none tracking-[-0.02em] text-white"
            style={{ fontSize: Math.round(size * 0.72) }}
          >
            Regrade
          </span>
        </span>
      );
    }

    return (
      <img
        src="/logo-wordmark.png"
        alt="Regrade"
        width={Math.round(size * 2.6)}
        height={size}
        className={cn("shrink-0 object-contain object-left", className)}
        style={{ height: size, width: "auto", maxWidth: Math.round(size * 3.2) }}
      />
    );
  }

  const markSrc =
    variant === "app"
      ? "/logo-mark-app.png"
      : invert
        ? "/logo-mark-dark.png"
        : "/logo-mark.png";

  return (
    <img
      src={markSrc}
      alt=""
      aria-hidden
      width={size}
      height={size}
      className={cn(
        "shrink-0 object-contain",
        variant === "app" ? "rounded-[22%]" : "rounded-[18%]",
        className
      )}
      style={{ width: size, height: size }}
    />
  );
}
