import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "../lib/auth";
import { Reveal } from "./Reveal";

export function Navbar() {
  const { session } = useAuth();
  const portalHref =
    session?.role === "admin"
      ? "/admin"
      : session?.role === "customer"
        ? "/portal"
        : "/login";
  const portalLabel =
    session?.role === "admin"
      ? "Admin"
      : session?.role === "customer"
        ? "My portal"
        : "Book / Login";

  return (
    <header className="site-nav">
      <div className="page-pad nav-inner">
        <Reveal className="nav-brand-wrap">
          <Link href="/" className="brand" aria-label="AuraTouch home">
            <span className="brand-logo">
              <img src="/aura-touch-logo.jpeg" alt="" />
            </span>
            Aura Touch
          </Link>
        </Reveal>

        <nav className="nav-links" aria-label="Primary navigation">
          {[
            ["Technology", "/#technology"],
            ["Use cases", "/#use-cases"],
            ["How it works", "/how-it-works"],
            ["Scan", "/scanner"],
            ["Book", "/login"],
          ].map(([label, href], index) => (
            <Reveal key={label} delay={100 + index * 100}>
              {href.startsWith("/#") ? (
                <a href={href}>{label}</a>
              ) : (
                <Link href={href}>{label}</Link>
              )}
            </Reveal>
          ))}
        </nav>

        <Reveal delay={450}>
          <Link className="nav-cta" href={portalHref}>
            {portalLabel}
            <ArrowUpRight size={14} strokeWidth={1.5} />
          </Link>
        </Reveal>
      </div>
    </header>
  );
}
