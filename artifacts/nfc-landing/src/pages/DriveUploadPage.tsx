import {
  ArrowLeft,
  CheckCircle2,
  Cloud,
  FileUp,
  FolderCheck,
  Link2,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link } from "wouter";

type SavedUpload = {
  id: string;
  title: string;
  notes: string;
  fileName: string;
  folder: string;
  createdAt: string;
};

export function DriveUploadPage() {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [folder, setFolder] = useState("Aura Touch / Customer uploads");
  const [fileName, setFileName] = useState("");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState<SavedUpload | null>(null);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    window.setTimeout(() => {
      const upload: SavedUpload = {
        id: `DRV-${Date.now().toString().slice(-7)}`,
        title,
        notes,
        fileName: fileName || "Text note only",
        folder,
        createdAt: new Date().toISOString(),
      };
      const existing = JSON.parse(
        localStorage.getItem("aura.driveUploads") ?? "[]",
      ) as SavedUpload[];
      localStorage.setItem(
        "aura.driveUploads",
        JSON.stringify([upload, ...existing]),
      );
      setSaved(upload);
      setBusy(false);
    }, 1350);
  };

  if (saved) {
    return (
      <main className="drive-shell page-pad">
        <section className="drive-success">
          <CheckCircle2 size={52} />
          <span className="eyebrow">Added to Drive</span>
          <h1>Your data is ready.</h1>
          <p>
            The demo saved <strong>{saved.title}</strong> to{" "}
            <strong>{saved.folder}</strong>. In production this action would
            use Google OAuth and the Drive API.
          </p>
          <div className="drive-link">
            <Link2 size={17} />
            <span>drive.google.com/aura-demo/{saved.id}</span>
          </div>
          <div className="button-row">
            <button
              type="button"
              className="button button-primary"
              onClick={() => {
                setSaved(null);
                setTitle("");
                setNotes("");
                setFileName("");
              }}
            >
              Add another
            </button>
            <Link className="button button-secondary" href="/scan">
              Back to scan
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="drive-shell page-pad">
      <header className="scan-header">
        <Link href="/scan" className="back-link">
          <ArrowLeft size={15} />
          Scan options
        </Link>
        <span className="scan-secure">
          <Cloud size={14} />
          Drive demo
        </span>
      </header>

      <div className="drive-layout">
        <section className="drive-copy">
          <span className="eyebrow">Direct-to-Drive</span>
          <h1>Capture once. File it instantly.</h1>
          <p>
            A tap can open a pre-connected collection form for documents,
            service notes, inspections, feedback, or customer uploads.
          </p>
          <div className="drive-benefits">
            <div>
              <FolderCheck size={18} />
              <span>
                <b>Correct folder</b>
                <small>Routing is encoded in the Aura Touch destination.</small>
              </span>
            </div>
            <div>
              <FileUp size={18} />
              <span>
                <b>Any useful data</b>
                <small>Files and structured notes travel together.</small>
              </span>
            </div>
          </div>
        </section>

        <section className="portal-panel drive-form-panel">
          <div className="drive-connected">
            <span>
              <Cloud size={18} />
            </span>
            <div>
              <b>Google Drive · Demo workspace</b>
              <small>Connected for this simulation</small>
            </div>
          </div>

          <form className="book-form" onSubmit={submit}>
            <label>
              Entry title
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g. Site inspection — Andheri"
                required
              />
            </label>
            <label>
              Destination folder
              <select
                value={folder}
                onChange={(event) => setFolder(event.target.value)}
              >
                <option>Aura Touch / Customer uploads</option>
                <option>Aura Touch / Site inspections</option>
                <option>Aura Touch / Feedback</option>
                <option>Aura Touch / Medical documents</option>
              </select>
            </label>
            <label>
              Notes
              <textarea
                rows={5}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Add the details that should travel with this file."
                required
              />
            </label>
            <label className="file-drop">
              <FileUp size={23} />
              <span>
                <b>{fileName || "Choose a file"}</b>
                <small>PDF, image, spreadsheet, or document</small>
              </span>
              <input
                type="file"
                onChange={(event) =>
                  setFileName(event.target.files?.[0]?.name ?? "")
                }
              />
            </label>
            <button
              className="button button-primary auth-submit"
              disabled={busy}
            >
              {busy ? "Uploading to Drive…" : "Add data to Drive"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
