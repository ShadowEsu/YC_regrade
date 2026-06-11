import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function getScrollOffset() {
  const banner = window.matchMedia("(min-width: 640px)").matches ? 48 : 44;
  const nav = 56;
  return -(banner + nav + 16);
}

export function scrollToId(id: string) {
  const el = document.querySelector(id);
  if (!el) return false;

  const offset = getScrollOffset();
  const lenis = window.__lenis;

  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { offset });
    return true;
  }

  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: "smooth" });
  return true;
}
