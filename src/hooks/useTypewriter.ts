import { useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useTypewriter(text: string, speed = 42, delay = 600) {
  const reduced = useReducedMotion();
  const [output, setOutput] = useState(reduced ? text : "");
  const [done, setDone] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setOutput(text);
      setDone(true);
      return;
    }

    setOutput("");
    setDone(false);
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setOutput(text.slice(0, i));
        if (i >= text.length) {
          if (interval) clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, delay, reduced]);

  return { output, done };
}
