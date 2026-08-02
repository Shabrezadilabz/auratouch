import { Radio, ShieldCheck, Sparkles } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { Link } from "wouter";
import { getBrandedQrImageUrl, getScanUrl } from "../lib/scanUrl";
import { Reveal } from "./Reveal";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function ScrollCardStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    const url = getScanUrl("/scan");
    setQrUrl(getBrandedQrImageUrl(url, 260));
  }, []);

  useEffect(() => {
    let frame = 0;
    let current = 0;
    let target = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const measure = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(rect.height - window.innerHeight, 1);
      target = reducedMotion.matches ? 0.55 : clamp(-rect.top / distance);
    };

    const animate = () => {
      current += (target - current) * 0.1;
      setProgress(current);
      frame = requestAnimationFrame(animate);
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const cardStyle = {
    "--card-rotate": `${-28 + progress * 388}deg`,
    "--card-tilt": `${12 - progress * 22}deg`,
    "--card-lift": `${Math.sin(progress * Math.PI) * -42}px`,
    "--card-travel": `${(progress - 0.5) * 88}px`,
    "--card-scale": 0.93 + Math.sin(progress * Math.PI) * 0.1,
    "--cursor-x": `${pointer.x * 18}px`,
    "--cursor-y": `${pointer.y * 12}px`,
    "--cursor-rotate-x": `${pointer.y * -5}deg`,
    "--cursor-rotate-y": `${pointer.x * 8}deg`,
    "--shine-x": `${50 + pointer.x * 30}%`,
    "--shine-y": `${50 + pointer.y * 25}%`,
  } as CSSProperties;

  const stage =
    progress < 0.32
      ? {
          number: "01",
          title: "One physical passport",
          detail: "Battery-free NFC, protected for everyday use.",
          facts: ["No charging", "Instant tap", "Secure identity"],
        }
      : progress < 0.68
        ? {
            number: "02",
            title: "A secure digital identity",
            detail: "NFC and QR keep every menu, profile, and service reachable.",
            facts: ["NFC + QR", "Works on any phone", "Update remotely"],
          }
        : {
            number: "03",
            title: "Every journey, ready",
            detail:
              "One brand system connects the physical card to every digital moment.",
            facts: ["Pay", "Enter", "Book"],
          };

  const menuOpacity =
    progress < 0.55
      ? clamp((progress - 0.08) * 2.8)
      : clamp(1 - (progress - 0.55) * 4);
  const brandOpacity = clamp((progress - 0.52) * 2.5);

  return (
    <section
      className="card-story page-pad"
      ref={sectionRef}
      onPointerMove={(event: PointerEvent<HTMLElement>) => {
        if (event.pointerType === "touch") return;
        setPointer({
          x: (event.clientX / window.innerWidth - 0.5) * 2,
          y: (event.clientY / window.innerHeight - 0.5) * 2,
        });
      }}
      onPointerLeave={() => setPointer({ x: 0, y: 0 })}
    >
      <div className="card-story-sticky">
        <div className="story-media" aria-hidden="true">
          <img
            src="/aura-menu-tags.png"
            alt=""
            style={{
              opacity: menuOpacity,
              transform: `scale(1.08) translateY(${(progress - 0.4) * -28}px)`,
            }}
          />
          <img
            src="/aura-brand-system.png"
            alt=""
            style={{
              opacity: brandOpacity,
              transform: `scale(1.08) translateY(${(progress - 0.7) * -24}px)`,
            }}
          />
          <span />
        </div>

        <div className="card-story-copy">
          <Reveal delay={80}>
            <span className="eyebrow">The Super-Passport</span>
          </Reveal>
          <div className="story-counter" key={stage.number}>
            <span>{stage.number}</span>
            <h2>{stage.title}</h2>
            <p>{stage.detail}</p>
            <div className="story-facts">
              {stage.facts.map((fact) => (
                <span key={fact}>{fact}</span>
              ))}
            </div>
          </div>
          <div className="story-progress">
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>
        </div>

        <div className="passport-scene" style={cardStyle}>
          <div className="passport-halo halo-copper" />
          <div className="passport-halo halo-teal" />
          <div className="passport-card-wrap">
            <div className="passport-card passport-front">
              <div className="passport-topline">
                <span>Aura Touch</span>
                <Radio size={20} strokeWidth={1.4} />
              </div>
              <img src="/aura-touch-logo.jpeg" alt="" />
              <div className="passport-name">
                <small>SUPER-PASSPORT</small>
                <b>ONE TAP. EVERYWHERE.</b>
              </div>
              <div className="passport-circuit" />
            </div>
            <div className="passport-card passport-back">
              <Link
                href="/scan"
                className="back-chip"
                aria-label="Open Aura Touch scan destination"
              >
                <span className="scanner-grid" aria-hidden="true" />
                <span className="scanner-beam" aria-hidden="true" />
                <img
                  className="back-chip-logo"
                  src="/aura-touch-logo.jpeg"
                  alt="Aura Touch"
                />
                {qrUrl ? (
                  <img
                    className="back-chip-qr"
                    src={qrUrl}
                    alt="Scan Aura Touch QR"
                  />
                ) : null}
              </Link>
              <ShieldCheck size={30} strokeWidth={1.1} />
              <div className="back-chip-tagline">
                <small>BRANDED QR · NFC DESTINATION</small>
                <b>SCAN OR TAP. ONE TOUCH.</b>
              </div>
              <Sparkles className="back-spark" size={18} />
            </div>
          </div>
        </div>

        <div className="story-scroll-note">
          <span>{Math.round(progress * 100).toString().padStart(2, "0")}</span>
          Scroll to rotate · Tap logo to scan
        </div>
      </div>
    </section>
  );
}
