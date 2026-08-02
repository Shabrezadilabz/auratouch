import {
  ArrowLeft,
  Camera,
  ChevronRight,
  CloudUpload,
  QrCode,
  ScanLine,
  UtensilsCrossed,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { getQrImageUrl, getScanUrl } from "../lib/scanUrl";

export function ScanHubPage() {
  const [scanUrl, setScanUrl] = useState("");
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    const url = getScanUrl("/scan");
    setScanUrl(url);
    setQrUrl(getQrImageUrl(url, 180));
  }, []);

  return (
    <main className="scan-shell page-pad">
      <header className="scan-header">
        <Link href="/" className="back-link">
          <ArrowLeft size={15} />
          Aura Touch
        </Link>
        <span className="scan-secure">
          <ScanLine size={14} />
          Secure scan
        </span>
      </header>

      <section className="scan-hero">
        <div className="live-scanner" aria-label="Aura Touch card scanner">
          <span className="scan-corner corner-one" />
          <span className="scan-corner corner-two" />
          <span className="scan-corner corner-three" />
          <span className="scan-corner corner-four" />
          <span className="live-scan-beam" />
          <div className="scan-logo">
            <img src="/aura-touch-logo.jpeg" alt="Aura Touch" />
          </div>
          <QrCode className="scan-watermark" size={120} strokeWidth={0.55} />
        </div>

        <div className="scan-copy">
          <span className="eyebrow">Aura Touch detected</span>
          <h1>What should this tap do?</h1>
          <p>
            You landed here from a phone camera QR or the in-app scanner. Choose
            the live destination for this card.
          </p>
          <div className="scan-share-row">
            <Link className="button button-secondary" href="/scanner">
              <Camera size={15} />
              Open phone scanner
            </Link>
            {qrUrl ? (
              <div className="scan-mini-qr">
                <img src={qrUrl} alt="Reshare Aura Touch scan QR" />
                <small>{scanUrl}</small>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="scan-destinations">
        <Link href="/scan/menu" className="scan-destination">
          <span className="destination-icon">
            <UtensilsCrossed size={24} />
          </span>
          <span className="destination-index">01</span>
          <h2>Open food menu</h2>
          <p>
            Browse dishes, customise quantity, place an order, and complete a
            dummy payment.
          </p>
          <span className="destination-action">
            View menu
            <ChevronRight size={16} />
          </span>
        </Link>

        <Link href="/scan/drive" className="scan-destination">
          <span className="destination-icon">
            <CloudUpload size={24} />
          </span>
          <span className="destination-index">02</span>
          <h2>Add data to Drive</h2>
          <p>
            Capture notes or a file and simulate sending it directly into a
            connected Drive folder.
          </p>
          <span className="destination-action">
            Add data
            <ChevronRight size={16} />
          </span>
        </Link>
      </section>
    </main>
  );
}
