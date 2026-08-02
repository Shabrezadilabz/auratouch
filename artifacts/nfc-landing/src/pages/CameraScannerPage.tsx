import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  QrCode,
  ScanLine,
  Smartphone,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  getQrImageUrl,
  getScanUrl,
  isAuraScanPayload,
  resolveScanRoute,
} from "../lib/scanUrl";

type BarcodeDetectorLike = {
  detect: (source: ImageBitmapSource) => Promise<Array<{ rawValue: string }>>;
};

type BarcodeDetectorCtor = new (options?: {
  formats?: string[];
}) => BarcodeDetectorLike;

declare global {
  interface Window {
    BarcodeDetector?: BarcodeDetectorCtor;
  }
}

export function CameraScannerPage() {
  const [, setLocation] = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("Starting camera…");
  const [manual, setManual] = useState("");
  const [ready, setReady] = useState(false);
  const [detected, setDetected] = useState("");
  const scanUrl = getScanUrl("/scan");

  useEffect(() => {
    let stream: MediaStream | null = null;
    let frame = 0;
    let detector: BarcodeDetectorLike | null = null;
    let active = true;

    const stop = () => {
      active = false;
      cancelAnimationFrame(frame);
      stream?.getTracks().forEach((track) => track.stop());
    };

    const start = async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          setError("Camera is not available in this browser.");
          setStatus("Use the QR code below instead.");
          return;
        }

        stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: { ideal: "environment" },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });

        const video = videoRef.current;
        if (!video) return;
        video.srcObject = stream;
        await video.play();
        setReady(true);
        setStatus("Point at the Aura Touch QR");

        if (window.BarcodeDetector) {
          detector = new window.BarcodeDetector({
            formats: ["qr_code"],
          });
        } else {
          setStatus("Camera ready. QR auto-detect needs Chrome/Edge — or open the QR below.");
        }

        const tick = async () => {
          if (!active) return;
          if (detector && video.readyState >= 2) {
            try {
              const codes = await detector.detect(video);
              const hit = codes.find((code) => isAuraScanPayload(code.rawValue));
              if (hit) {
                setDetected(hit.rawValue);
                setStatus("Aura Touch found — opening…");
                stop();
                window.setTimeout(() => {
                  setLocation(resolveScanRoute(hit.rawValue));
                }, 450);
                return;
              }
            } catch {
              // keep scanning
            }
          }
          frame = requestAnimationFrame(() => {
            void tick();
          });
        };

        frame = requestAnimationFrame(() => {
          void tick();
        });
      } catch {
        setError("Camera permission denied or unavailable.");
        setStatus("Scan the QR with your phone camera instead.");
      }
    };

    void start();
    return stop;
  }, [setLocation]);

  const openManual = () => {
    const value = manual.trim() || "AURA-SCAN";
    setLocation(resolveScanRoute(value));
  };

  return (
    <main className="scanner-shell page-pad">
      <header className="scan-header">
        <Link href="/" className="back-link">
          <ArrowLeft size={15} />
          Aura Touch
        </Link>
        <span className="scan-secure">
          <Camera size={14} />
          Live scanner
        </span>
      </header>

      <section className="scanner-layout">
        <div className="camera-stage">
          <video ref={videoRef} playsInline muted autoPlay />
          <div className="camera-frame" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <i />
          </div>
          <div className="camera-status">
            <ScanLine size={15} />
            {status}
          </div>
          {detected ? (
            <div className="camera-hit">
              <CheckCircle2 size={18} />
              Route found
            </div>
          ) : null}
        </div>

        <div className="scanner-side">
          <span className="eyebrow">Mobile scan</span>
          <h1>Scan to open Menu or Drive.</h1>
          <p>
            Use this phone camera, or point another phone at the QR. Both open
            the Aura Touch scan destinations.
          </p>

          {error ? <p className="form-error">{error}</p> : null}

          <div className="scanner-qr-card">
            <img src={getQrImageUrl(scanUrl, 240)} alt="Aura Touch scan QR code" />
            <div>
              <b>Phone camera QR</b>
              <small>{scanUrl}</small>
              <span>
                <Smartphone size={14} />
                Opens /scan after detection
              </span>
            </div>
          </div>

          <label className="manual-scan">
            Or paste / type a scan code
            <div>
              <input
                value={manual}
                onChange={(event) => setManual(event.target.value)}
                placeholder="AURA-SCAN or full /scan URL"
              />
              <button type="button" className="button button-primary" onClick={openManual}>
                Open
              </button>
            </div>
          </label>

          <div className="button-row">
            <Link className="button button-secondary" href="/scan">
              <QrCode size={15} />
              Skip to destinations
            </Link>
            {!ready ? null : (
              <span className="scan-live-pill">Camera live</span>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
