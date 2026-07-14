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
    return (
      <img
        src="/logo-wordmark.png"
        alt="Regrade"
        width={Math.round(size * 3.4)}
        height={size}
        className={cn(
          "shrink-0 object-contain object-left",
          invert ? "rounded-2xl bg-paper/95 px-2.5 py-1.5" : null,
          className
        )}
        style={{
          height: size,
          width: "auto",
          maxWidth: Math.round(size * 4.2),
        }}
      />
    );
  }

  const markSrc = variant === "app" ? "/logo-mark-app.png" : "/logo-mark.png";

  return (
    <img
      src={markSrc}
      alt=""
      aria-hidden
      width={size}
      height={size}
      className={cn(
        "shrink-0 object-contain",
        variant === "app" ? "rounded-[22%]" : null,
        className
      )}
      style={{ width: size, height: size }}
    />
  );
}
