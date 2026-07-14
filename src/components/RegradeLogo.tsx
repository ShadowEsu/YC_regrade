import { cn } from "../lib/utils";

const LOGO_VERSION = "20260714b";

type RegradeLogoProps = {
  size?: number;
  variant?: "mark" | "wordmark" | "app" | "whale";
  className?: string;
  invert?: boolean;
};

function asset(path: string) {
  return `${path}?v=${LOGO_VERSION}`;
}

export function RegradeLogo({
  size = 24,
  variant = "mark",
  className,
  invert = false,
}: RegradeLogoProps) {
  if (variant === "whale") {
    return (
      <img
        src={asset("/mr-whale.png")}
        alt="Mr Whale"
        width={size}
        height={Math.round(size * 0.73)}
        className={cn("shrink-0 object-contain", className)}
        style={{ width: size, height: "auto" }}
      />
    );
  }

  if (variant === "wordmark") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-2.5",
          invert ? "text-white" : "text-ink",
          className
        )}
      >
        <img
          src={asset("/logo-mark.png")}
          alt=""
          aria-hidden
          width={size}
          height={size}
          className="shrink-0 object-contain"
          style={{ width: size, height: size }}
        />
        <span
          className="font-display font-semibold leading-none tracking-[-0.03em]"
          style={{ fontSize: Math.round(size * 0.62) }}
        >
          Regrade
        </span>
      </span>
    );
  }

  return (
    <img
      src={asset("/logo-mark.png")}
      alt={variant === "app" ? "Regrade" : ""}
      aria-hidden={variant !== "app"}
      width={size}
      height={size}
      className={cn("shrink-0 object-contain", className)}
      style={{ width: size, height: size }}
    />
  );
}
