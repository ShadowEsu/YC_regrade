import { cn } from "../lib/utils";

type RegradeLogoProps = {
  size?: number;
  variant?: "mark" | "wordmark";
  className?: string;
};

export function RegradeLogo({
  size = 24,
  variant = "mark",
  className,
}: RegradeLogoProps) {
  if (variant === "wordmark") {
    return (
      <img
        src="/logo-wordmark.png"
        alt="Regrade"
        height={size}
        className={cn("h-auto w-auto object-contain", className)}
        style={{ height: size }}
      />
    );
  }

  return (
    <img
      src="/logo-mark.png"
      alt=""
      aria-hidden
      width={size}
      height={size}
      className={cn("shrink-0 object-contain", className)}
    />
  );
}
