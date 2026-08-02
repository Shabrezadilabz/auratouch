import { ArrowUpRight, Radio, RefreshCw, Shapes } from "lucide-react";
import { Reveal } from "./Reveal";

export function BrandWorldSection() {
  return (
    <section className="brand-world page-pad" id="brand-world">
      <img
        className="brand-world-image"
        src="/aura-brand-system.png"
        alt="Aura Touch branding across packaging, cards, mobile experiences, and social media"
      />
      <div className="brand-world-shade" />

      <div className="brand-world-content">
        <Reveal delay={100}>
          <div className="accent-badge">
            <span />
            One connected brand system
          </div>
        </Reveal>
        <Reveal delay={190}>
          <h2>
            Physical presence.
            <br />
            Digital intelligence.
          </h2>
        </Reveal>
        <Reveal delay={280}>
          <p>
            Aura Touch carries one recognizable identity from the NFC object
            and packaging to the experience that opens on a customer&apos;s
            phone.
          </p>
        </Reveal>

        <div className="brand-world-details">
          {[
            {
              icon: Radio,
              title: "Tap-ready",
              body: "Cards, tags, and displays become instant digital entry points.",
            },
            {
              icon: RefreshCw,
              title: "Always current",
              body: "Change the destination without reprinting the physical product.",
            },
            {
              icon: Shapes,
              title: "One identity",
              body: "Packaging, social, and mobile moments remain visually consistent.",
            },
          ].map(({ icon: Icon, title, body }, index) => (
            <Reveal className="brand-detail" delay={360 + index * 90} key={title}>
              <Icon size={18} strokeWidth={1.35} />
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={650}>
          <a className="brand-world-link" href="#live-demo">
            See the tap in action
            <ArrowUpRight size={15} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
