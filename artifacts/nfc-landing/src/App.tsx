import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  CreditCard,
  HeartPulse,
  KeyRound,
  Radio,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Route, Switch } from "wouter";
import { BrandWorldSection } from "./components/BrandWorldSection";
import { ExplodedChip } from "./components/ExplodedChip";
import { Navbar } from "./components/Navbar";
import { Reveal } from "./components/Reveal";
import { ScrollCardStory } from "./components/ScrollCardStory";
import { UseCaseShowcase } from "./components/UseCaseShowcase";
import { useScrollProgress } from "./hooks/useScrollProgress";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { CameraScannerPage } from "./pages/CameraScannerPage";
import { CustomerPortalPage } from "./pages/CustomerPortalPage";
import { DriveUploadPage } from "./pages/DriveUploadPage";
import { FoodMenuPage } from "./pages/FoodMenuPage";
import { HowItWorksPage } from "./pages/HowItWorksPage";
import { LoginPage } from "./pages/LoginPage";
import { PaymentPage } from "./pages/PaymentPage";
import { ScanHubPage } from "./pages/ScanHubPage";
import { TrackPage } from "./pages/TrackPage";

const useCases = [
  {
    number: "01",
    icon: CreditCard,
    title: "Pay",
    body: "Turn a counter, table, or product into an instant payment point.",
    image: "/aura-retail-payment.png",
    imageAlt: "Customer paying by tapping at a retail terminal",
  },
  {
    number: "02",
    icon: KeyRound,
    title: "Access",
    body: "Open the right door or digital space with one secure interaction.",
    image: "/aura-hotel-access.png",
    imageAlt: "Traveler opening a hotel room with an NFC card",
  },
  {
    number: "03",
    icon: CalendarDays,
    title: "Book",
    body: "Move from discovery to a confirmed reservation without an app.",
    image: "/aura-bus-booking.png",
    imageAlt: "Traveler confirming a bus ticket at a terminal",
  },
  {
    number: "04",
    icon: HeartPulse,
    title: "Care",
    body: "Share verified medical context when every second matters.",
    image: "/aura-hospital-care.png",
    imageAlt: "Healthcare professional accessing a patient's medical identity",
  },
];

function LandingPage() {
  const progress = useScrollProgress();

  return (
    <>
      <Navbar />
      <main>
        <section className="hero page-pad" id="top">
          <div className="hero-video" aria-hidden="true">
            <video autoPlay muted loop playsInline preload="auto">
              <source
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260714_113715_c7e0daa0-8bdd-4486-a2da-040901f8f0ea.mp4"
                type="video/mp4"
              />
            </video>
            <div className="hero-video-shade" />
          </div>
          <div className="hero-aurora" aria-hidden="true" />
          <div className="hero-top">
            <div className="service-list">
              {["ONE TOUCH", "EVERY ACCESS", "ZERO FRICTION"].map(
                (item, index) => (
                  <Reveal key={item} delay={150 + index * 120}>
                    <span>/ {item}</span>
                  </Reveal>
                ),
              )}
            </div>
            <Reveal className="hero-intro" delay={300}>
              A single intelligent touchpoint that connects people to whatever
              comes next.
            </Reveal>
          </div>

          <div className="hero-main">
            <div className="hero-copy">
              <Reveal delay={150}>
                <div className="accent-badge">
                  <span />
                  The NFC Super-Passport
                </div>
              </Reveal>
              <Reveal delay={280}>
                <h1>
                  Touch once.
                  <br />
                  Go anywhere.
                </h1>
              </Reveal>
              <Reveal className="hero-actions" delay={410}>
                <a className="button button-primary" href="#technology">
                  See how it works
                  <ChevronRight size={15} />
                </a>
                <span className="scroll-note">
                  <span />
                  Scroll to disassemble
                </span>
              </Reveal>
            </div>

            <Reveal className="hero-chip" delay={220}>
              <ExplodedChip progress={progress} />
            </Reveal>
          </div>
        </section>

        <div className="scrub-spacer page-pad" aria-hidden="true">
          <div className="scrub-line">
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>
          <p>Five layers. One effortless moment.</p>
        </div>

        <ScrollCardStory />
        <BrandWorldSection />

        <section className="technology page-pad section-shell" id="technology">
          <div className="section-top">
            <Reveal delay={120}>
              <div className="accent-badge">
                <span />
                Engineered in layers
              </div>
            </Reveal>
            <Reveal className="section-intro" delay={220}>
              Small enough to disappear. Smart enough to become the front door
              to your entire experience.
            </Reveal>
          </div>

          <div className="technology-grid">
            <div className="technology-copy">
              <Reveal delay={180}>
                <h2>
                  Built to be
                  <br />
                  touched.
                </h2>
              </Reveal>
              <Reveal delay={320}>
                <p>
                  Every layer has a job. Together they create a durable,
                  battery-free passport that responds in milliseconds and
                  works with the phone already in your customer&apos;s hand.
                </p>
              </Reveal>
              <Reveal className="button-row" delay={420}>
                <a className="button button-primary" href="/how-it-works">
                  Explore the layers
                  <ChevronRight size={15} />
                </a>
                <a className="button button-secondary" href="#use-cases">
                  See use cases
                </a>
              </Reveal>
            </div>

            <div className="capability-panel">
              {[
                [
                  "01",
                  "Battery-free",
                  "Powered by the field from any compatible phone or watch.",
                ],
                [
                  "02",
                  "Dual access",
                  "NFC for the instant moment. QR for universal reach.",
                ],
                [
                  "03",
                  "Built to last",
                  "Sealed, rigid, and ready for thousands of daily touches.",
                ],
              ].map(([number, title, body], index) => (
                <Reveal
                  as="div"
                  className="capability-row"
                  delay={300 + index * 110}
                  key={number}
                >
                  <span>{number}</span>
                  <div>
                    <h3>
                      {title}
                      <ChevronRight size={16} />
                    </h3>
                    <p>{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <UseCaseShowcase />

        <section className="tap-story page-pad section-shell">
          <div className="tap-visual" aria-hidden="true">
            <div className="tap-orbit orbit-one" />
            <div className="tap-orbit orbit-two" />
            <div className="tap-core">
              <Radio size={30} strokeWidth={1.3} />
            </div>
          </div>
          <div className="tap-copy">
            <Reveal delay={120}>
              <span className="eyebrow">What happens when you tap</span>
            </Reveal>
            <Reveal delay={220}>
              <h2>
                A quiet signal.
                <br />A useful action.
              </h2>
            </Reveal>
            <Reveal delay={320}>
              <p>
                The antenna wakes, the secure chip shares a destination, and
                the right experience opens—no charging, pairing, or searching.
              </p>
            </Reveal>
            <Reveal className="signal-steps" delay={420}>
              {["Tap", "Transfer", "Act"].map((step, index) => (
                <div key={step}>
                  <span>0{index + 1}</span>
                  <b>{step}</b>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="use-cases page-pad section-shell" id="use-cases">
          <div className="section-top">
            <div>
              <Reveal delay={120}>
                <span className="eyebrow">One chip. Many doors.</span>
              </Reveal>
              <Reveal delay={220}>
                <h2>
                  Designed for the
                  <br />
                  next thing.
                </h2>
              </Reveal>
            </div>
            <Reveal className="section-intro" delay={300}>
              Change what happens after the tap without replacing the physical
              chip.
            </Reveal>
          </div>

          <div className="use-case-grid">
            {useCases.map(
              ({ number, icon: Icon, title, body, image, imageAlt }, index) => (
              <Reveal
                className="use-case-card"
                delay={160 + index * 100}
                key={title}
              >
                <img className="case-image" src={image} alt={imageAlt} />
                <span className="case-image-shade" aria-hidden="true" />
                <div className="case-head">
                  <span>{number}</span>
                  <Icon size={23} strokeWidth={1.25} />
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
                <ArrowRight className="case-arrow" size={18} />
              </Reveal>
              ),
            )}
          </div>
        </section>

        <section className="final-cta page-pad">
          <div className="final-glow" aria-hidden="true" />
          <Reveal delay={100}>
            <Sparkles size={25} strokeWidth={1.25} />
          </Reveal>
          <Reveal delay={180}>
            <h2>
              Make every surface
              <br />
              useful.
            </h2>
          </Reveal>
          <Reveal delay={280}>
            <p>
              Tell us where the journey should begin. We&apos;ll build the
              touchpoint.
            </p>
          </Reveal>
          <Reveal className="button-row final-buttons" delay={360}>
            <a className="button button-primary" href="/login">
              Book now
              <ArrowRight size={15} />
            </a>
            <a className="button button-secondary" href="/how-it-works">
              <ShieldCheck size={15} />
              How it works
            </a>
          </Reveal>
        </section>
      </main>
      <footer className="page-pad">
        <a className="brand footer-brand" href="#top">
          <span className="brand-logo brand-logo-small">
            <img src="/aura-touch-logo.jpeg" alt="" />
          </span>
          Aura Touch
        </a>
        <p>One touch. Every possibility.</p>
        <span>© 2026 AuraTouch</span>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <Switch>
      <Route path="/how-it-works" component={HowItWorksPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/portal" component={CustomerPortalPage} />
      <Route path="/pay/:orderId" component={PaymentPage} />
      <Route path="/track/:code" component={TrackPage} />
      <Route path="/admin" component={AdminDashboardPage} />
      <Route path="/scan/menu" component={FoodMenuPage} />
      <Route path="/scan/drive" component={DriveUploadPage} />
      <Route path="/scanner" component={CameraScannerPage} />
      <Route path="/scan" component={ScanHubPage} />
      <Route component={LandingPage} />
    </Switch>
  );
}
