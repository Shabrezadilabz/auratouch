import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Element = "div",
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const style = { transitionDelay: `${delay}ms` } as CSSProperties;

  return (
    <Element
      ref={ref as never}
      style={style}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </Element>
  );
}
