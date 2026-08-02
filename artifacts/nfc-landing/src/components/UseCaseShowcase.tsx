import {
  BedDouble,
  Check,
  CreditCard,
  Radio,
  TrainFront,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";

const experiences = [
  {
    id: "pay",
    tab: "Payment",
    eyebrow: "Aura Pay",
    title: "Paid in one tap.",
    detail:
      "The checkout opens, verifies the destination, and confirms payment without searching for a link.",
    result: "₹2,450 paid",
    meta: "Receipt sent instantly",
    image: "/aura-retail-payment.png",
    imageAlt: "Customer tapping an NFC card at a retail payment terminal",
    icon: CreditCard,
    accent: "copper",
  },
  {
    id: "metro",
    tab: "Metro",
    eyebrow: "Aura Transit",
    title: "The gate already knows.",
    detail:
      "A secure transit credential validates in milliseconds and moves the rider straight through.",
    result: "Gate open",
    meta: "Blue Line · Platform 2",
    image: "/aura-metro-entry.png",
    imageAlt: "Commuter tapping an NFC card while entering a metro gate",
    icon: TrainFront,
    accent: "teal",
  },
  {
    id: "stay",
    tab: "Room access",
    eyebrow: "Aura Stay",
    title: "Check in. Walk in.",
    detail:
      "Booking identity becomes room access at arrival—without a plastic key, queue, or app download.",
    result: "Room 241 unlocked",
    meta: "Access until 11:00 AM",
    image: "/aura-hotel-access.png",
    imageAlt: "Traveler unlocking a hotel room door with an NFC card",
    icon: BedDouble,
    accent: "gold",
  },
];

export function UseCaseShowcase() {
  const [active, setActive] = useState(0);
  const experience = experiences[active];
  const Icon = experience.icon;

  useEffect(() => {
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % experiences.length),
      5200,
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="live-showcase page-pad section-shell" id="live-demo">
      <div className="showcase-heading">
        <Reveal delay={100}>
          <span className="eyebrow">See the tap happen</span>
        </Reveal>
        <Reveal delay={180}>
          <h2>
            One card.
            <br />
            Three real moments.
          </h2>
        </Reveal>
        <Reveal delay={260}>
          <p>
            Choose a journey and watch the Super-Passport move from physical
            touch to a finished action.
          </p>
        </Reveal>
      </div>

      <Reveal className="demo-shell" delay={280}>
        <div className="demo-tabs" role="tablist" aria-label="Aura Touch demos">
          {experiences.map((item, index) => {
            const TabIcon = item.icon;
            return (
              <button
                type="button"
                role="tab"
                aria-selected={active === index}
                className={active === index ? "is-active" : ""}
                onClick={() => setActive(index)}
                key={item.id}
              >
                <TabIcon size={16} strokeWidth={1.5} />
                {item.tab}
                <span />
              </button>
            );
          })}
        </div>

        <div className={`demo-stage demo-${experience.accent}`} key={experience.id}>
          <div className="demo-copy">
            <span className="eyebrow">{experience.eyebrow}</span>
            <h3>{experience.title}</h3>
            <p>{experience.detail}</p>
            <div className="demo-result">
              <span>
                <Check size={15} strokeWidth={2} />
              </span>
              <div>
                <b>{experience.result}</b>
                <small>{experience.meta}</small>
              </div>
            </div>
          </div>

          <div className="tap-simulation" aria-label={`${experience.tab} tap animation`}>
            <img
              className="demo-photo"
              src={experience.image}
              alt={experience.imageAlt}
            />
            <div className="demo-photo-shade" />
            <div className="terminal-device">
              <div className="terminal-camera" />
              <div className="terminal-status">
                <Icon size={24} strokeWidth={1.25} />
                <span>Ready for Aura Touch</span>
              </div>
              <div className="terminal-success">
                <span>
                  <Check size={25} strokeWidth={2} />
                </span>
                <b>{experience.result}</b>
                <small>{experience.meta}</small>
              </div>
              <div className="terminal-homebar" />
            </div>

            <div className="demo-passport">
              <img src="/aura-touch-logo.jpeg" alt="" />
              <div>
                <span>AURA TOUCH</span>
                <small>SUPER-PASSPORT</small>
              </div>
              <Radio size={17} strokeWidth={1.4} />
            </div>

            <div className="demo-waves">
              <i />
              <i />
              <i />
            </div>
            <div className="demo-caption">
              <span />
              Tap detected · Processing securely
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
