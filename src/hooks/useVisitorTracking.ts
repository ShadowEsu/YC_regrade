import { useEffect } from "react";
import { registerVisitor } from "../lib/analytics";

const heartbeatMs = 60_000;

export function useVisitorTracking() {
  useEffect(() => {
    registerVisitor();
    const timer = window.setInterval(registerVisitor, heartbeatMs);
    return () => window.clearInterval(timer);
  }, []);
}
