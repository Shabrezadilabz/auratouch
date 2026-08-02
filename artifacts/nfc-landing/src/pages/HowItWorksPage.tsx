import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Layers3,
  Radio,
  Route,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ExplodedChip } from "../components/ExplodedChip";
import { Navbar } from "../components/Navbar";
import { Reveal } from "../components/Reveal";

const steps = [
  {
    label: "Approach",
    title: "Bring a device close.",
    body: "No app is needed. A modern phone or watch creates the short-range field that wakes AuraTouch.",
    icon: Smartphone,
  },
  {
    label: "Activate",
    title: "The antenna wakes.",
    body: "The tuned copper coil harvests just enough energy to activate the secure NFC chip inside.",
    icon: Radio,
  },
  {
    label: "Resolve",
    title: "One tap finds its path.",
    body: "A unique, configurable destination resolves to the right payment, profile, access point, or workflow.",
    icon: Route,
  },
  {
    label: "Protect",
    title: "Trust travels with it.",
    body: "Verification rules and a durable sealed construction keep the physical and digital experience dependable.",
    icon: ShieldCheck,
  },
  {
    label: "Complete",
    title: "The next action opens.",
    body: "The user lands exactly where they need to be, while your team can update the journey behind the chip.",
    icon: CheckCircle2,
  },
];

export function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(0);
  const current = steps[activeStep];
  const Icon = current.icon;
  const visualProgress = [0.08, 0.28, 0.5, 0.72, 0.96][activeStep];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <>
      <Navbar />
      <main className="how-page page-pad">
        <div className="how-background" aria-hidden="true" />
        <div className="how-heading">
          <Reveal delay={80}>
            <Link className="back-link" href="/">
              <ArrowLeft size={14} />
              Back to AuraTouch
            </Link>
          </Reveal>
          <Reveal delay={160}>
            <span className="eyebrow">How it works</span>
          </Reveal>
          <Reveal delay={240}>
            <h1>
              One tap,
              <br />
              step by step.
            </h1>
          </Reveal>
        </div>

        <div className="how-layout">
          <Reveal className="how-visual" delay={260}>
            <ExplodedChip progress={visualProgress} compact />
          </Reveal>

          <div className="how-content">
            <Reveal className="step-progress" delay={300}>
              <span>
                0{activeStep + 1} / 0{steps.length}
              </span>
              <div>
                <i
                  style={{
                    transform: `scaleX(${(activeStep + 1) / steps.length})`,
                  }}
                />
              </div>
            </Reveal>

            <div className="step-copy" key={activeStep}>
              <span className="step-icon">
                <Icon size={22} strokeWidth={1.35} />
              </span>
              <span className="eyebrow">{current.label}</span>
              <h2>{current.title}</h2>
              <p>{current.body}</p>
            </div>

            <div className="step-controls">
              <button
                type="button"
                onClick={() => setActiveStep((step) => Math.max(0, step - 1))}
                disabled={activeStep === 0}
                aria-label="Previous step"
              >
                <ArrowLeft size={16} />
              </button>
              <div className="step-dots" aria-label="Choose a step">
                {steps.map((step, index) => (
                  <button
                    type="button"
                    key={step.label}
                    className={activeStep === index ? "is-active" : ""}
                    onClick={() => setActiveStep(index)}
                    aria-label={`Step ${index + 1}: ${step.label}`}
                    aria-current={activeStep === index ? "step" : undefined}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  setActiveStep((step) =>
                    Math.min(steps.length - 1, step + 1),
                  )
                }
                disabled={activeStep === steps.length - 1}
                aria-label="Next step"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <Reveal className="how-note" delay={420}>
          <Layers3 size={19} strokeWidth={1.3} />
          <p>
            Tap any physical layer in the model to learn why it&apos;s there.
          </p>
        </Reveal>
      </main>
    </>
  );
}
