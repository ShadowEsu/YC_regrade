import { cn } from "../lib/utils";

type RegradeLogoProps = {
  size?: number;
  variant?: "mark" | "wordmark" | "svg";
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

  if (variant === "svg") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        className={cn("shrink-0", className)}
        aria-hidden
      >
        <rect x="8" y="4" width="14" height="7" rx="3.5" fill="#1E4FFF" />
        <path
          d="M8 11 C8 11 8 22 8 22 C8 25.3137 10.6863 28 14 28 L14 21 C11.7909 21 10 19.2091 10 17 L10 11 Z"
          fill="#7FA3FF"
        />
        <circle cx="22" cy="21" r="4" fill="#1E4FFF" />
      </svg>
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
