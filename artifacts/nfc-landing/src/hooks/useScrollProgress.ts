import { useEffect, useState } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    let current = 0;
    let target = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const readTarget = () => {
      const scrubDistance = Math.max(window.innerHeight * 1.65, 1);
      target = reduceMotion.matches ? 0.55 : clamp(window.scrollY / scrubDistance);
    };

    const tick = () => {
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.0005) current = target;
      setProgress(current);
      frame = window.requestAnimationFrame(tick);
    };

    readTarget();
    window.addEventListener("scroll", readTarget, { passive: true });
    window.addEventListener("resize", readTarget);
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", readTarget);
      window.removeEventListener("resize", readTarget);
    };
  }, []);

  return progress;
}
