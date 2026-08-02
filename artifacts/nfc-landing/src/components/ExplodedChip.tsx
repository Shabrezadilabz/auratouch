import {
  Check,
  CircuitBoard,
  QrCode,
  Smartphone,
  Watch,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";

type ExplodedChipProps = {
  progress: number;
  compact?: boolean;
};

type Layer = {
  id: string;
  index: string;
  name: string;
  shortName: string;
  purpose: string;
  offset: number;
  tone: string;
};

const layers: Layer[] = [
  {
    id: "dome",
    index: "01",
    name: "Epoxy dome",
    shortName: "Protect",
    purpose: "A sealed, scratch-resistant surface built for everyday contact.",
    offset: -2,
    tone: "layer-dome",
  },
  {
    id: "graphic",
    index: "02",
    name: "NFC + QR inlay",
    shortName: "Identify",
    purpose: "A scannable visual fallback makes every interaction accessible.",
    offset: -1,
    tone: "layer-graphic",
  },
  {
    id: "antenna",
    index: "03",
    name: "Antenna & chip",
    shortName: "Connect",
    purpose: "The secure NFC core wakes instantly and transfers the right action.",
    offset: 0,
    tone: "layer-antenna",
  },
  {
    id: "core",
    index: "04",
    name: "Rigid core",
    shortName: "Reinforce",
    purpose: "A stable substrate keeps the antenna tuned and the unit durable.",
    offset: 1,
    tone: "layer-core",
  },
  {
    id: "adhesive",
    index: "05",
    name: "Adhesive base",
    shortName: "Place",
    purpose: "Industrial adhesive turns any clean surface into a smart touchpoint.",
    offset: 2,
    tone: "layer-adhesive",
  },
];

export function ExplodedChip({ progress, compact = false }: ExplodedChipProps) {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [introDone, setIntroDone] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const explosion = useMemo(
    () => Math.sin(Math.min(1, Math.max(0, progress)) * Math.PI),
    [progress],
  );
  const activation = Math.max(0, (progress - 0.68) / 0.32);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroDone(true), 1050);
    return () => window.clearTimeout(timer);
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
      y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
    });
  };

  const shellStyle = {
    "--explode": explosion,
    "--rotate-x": `${pointer.y * -3.5}deg`,
    "--rotate-y": `${pointer.x * 5}deg`,
    "--activation": activation,
    "--device-y": `${(1 - activation) * -24}px`,
  } as CSSProperties;

  return (
    <div
      className={`chip-experience ${compact ? "is-compact" : ""} ${
        introDone ? "intro-done" : ""
      }`}
      style={shellStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setPointer({ x: 0, y: 0 })}
      aria-label="Interactive exploded view of the AuraTouch NFC chip"
    >
      <div className="chip-grid" aria-hidden="true" />
      <div className="device-tap" aria-hidden="true">
        <Smartphone className="phone-icon" strokeWidth={1.35} />
        <Watch className="watch-icon" strokeWidth={1.35} />
        <span className="tap-line" />
      </div>

      <div className="signal-field" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="chip-stage">
        {layers.map((layer) => {
          const selected = activeLayer === layer.id;
          const layerStyle = {
            "--layer-y": `${layer.offset * explosion * (compact ? 54 : 70)}px`,
          } as CSSProperties;

          return (
            <button
              type="button"
              key={layer.id}
              className={`chip-layer ${layer.tone} ${
                selected ? "is-active" : ""
              }`}
              style={layerStyle}
              onClick={() =>
                setActiveLayer((current) =>
                  current === layer.id ? null : layer.id,
                )
              }
              onPointerEnter={() => setActiveLayer(layer.id)}
              onPointerLeave={() => setActiveLayer(null)}
              aria-expanded={selected}
              aria-label={`${layer.name}: ${layer.purpose}`}
            >
              <span className="layer-face">
                {layer.id === "dome" && (
                  <span className="dome-mark">
                    <img src="/aura-touch-logo.jpeg" alt="" />
                  </span>
                )}
                {layer.id === "graphic" && (
                  <span className="graphic-mark">
                    <QrCode size={48} strokeWidth={1.15} />
                    <small>SUPER-PASSPORT</small>
                  </span>
                )}
                {layer.id === "antenna" && (
                  <span className="antenna-mark">
                    <span className="coil coil-one" />
                    <span className="coil coil-two" />
                    <CircuitBoard size={25} strokeWidth={1.25} />
                  </span>
                )}
                {layer.id === "core" && (
                  <span className="core-mark">
                    <Check size={20} strokeWidth={1.4} />
                  </span>
                )}
                {layer.id === "adhesive" && (
                  <span className="adhesive-mark">3M</span>
                )}
              </span>
              <span className="layer-label">
                <span className="layer-index">{layer.index}</span>
                <span>
                  <b>{layer.name}</b>
                  <small>{layer.shortName}</small>
                </span>
              </span>
              <span className="layer-tooltip" role="tooltip">
                {layer.purpose}
              </span>
            </button>
          );
        })}
      </div>

      <div className="chip-caption">
        <span className="status-dot" />
        <span>{explosion > 0.45 ? "Explore each layer" : "Ready to tap"}</span>
      </div>
    </div>
  );
}
