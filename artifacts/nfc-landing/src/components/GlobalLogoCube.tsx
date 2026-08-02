import { useEffect, useState } from "react";

const faces = ["front", "back", "right", "left", "top", "bottom"];

export function GlobalLogoCube() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateVisibility = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const sections = Array.from(
          document.querySelectorAll<HTMLElement>("main > .cube-zone"),
        );
        const viewportCenter = window.innerHeight / 2;
        const activeIndex = sections.findIndex((section) => {
          const bounds = section.getBoundingClientRect();
          return bounds.top <= viewportCenter && bounds.bottom > viewportCenter;
        });

        setVisible(activeIndex >= 0);
      });
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <div
      className={`global-cube-wrap${visible ? " is-visible" : ""}`}
      aria-hidden="true"
    >
      <div className="cube-motion-field">
        <span className="cube-orbit cube-orbit-one" />
        <span className="cube-orbit cube-orbit-two" />
        <span className="cube-orbit cube-orbit-three" />
      </div>
      <div className="global-logo-cube">
        {faces.map((face) => (
          <span className={`cube-face cube-${face}`} key={face}>
            <img src="/aura-touch-logo.jpeg" alt="" />
          </span>
        ))}
      </div>
    </div>
  );
}
