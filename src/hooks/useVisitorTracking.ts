import { useEffect } from "react";
import { registerVisitor } from "../lib/analytics";

export function useVisitorTracking() {
  useEffect(() => {
    registerVisitor();
  }, []);
}
