import { LockKeyhole, Shield, UserRound } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "../lib/auth";
import { DEMO_ACCOUNTS } from "../lib/store";

type Mode = "customer" | "admin";

export function LoginPage() {
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const [mode, setMode] = useState<Mode>("customer");
  const [email, setEmail] = useState<string>(DEMO_ACCOUNTS.customer.email);
  const [password, setPassword] = useState<string>(DEMO_ACCOUNTS.customer.password);
  const [error, setError] = useState("");

  const applyDemo = (next: Mode) => {
    setMode(next);
    setError("");
    if (next === "customer") {
      setEmail(DEMO_ACCOUNTS.customer.email);
      setPassword(DEMO_ACCOUNTS.customer.password);
    } else {
      setEmail(DEMO_ACCOUNTS.admin.email);
      setPassword(DEMO_ACCOUNTS.admin.password);
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const session = login(email, password);
    if (!session) {
      setError("Invalid credentials. Use the demo accounts below.");
      return;
    }
    if (session.role === "admin") setLocation("/admin");
    else setLocation("/portal");
  };

  return (
    <div className="app-shell page-pad">
      <div className="auth-card">
        <Link href="/" className="brand auth-brand">
          <span className="brand-logo">
            <img src="/aura-touch-logo.jpeg" alt="" />
          </span>
          Aura Touch
        </Link>

        <h1>Sign in to continue</h1>
        <p className="auth-copy">
          Dummy logins for customer booking and admin analytics. No real payments
          or emails are sent.
        </p>

        <div className="auth-mode-tabs" role="tablist">
          <button
            type="button"
            className={mode === "customer" ? "is-active" : ""}
            onClick={() => applyDemo("customer")}
          >
            <UserRound size={16} />
            Customer
          </button>
          <button
            type="button"
            className={mode === "admin" ? "is-active" : ""}
            onClick={() => applyDemo("admin")}
          >
            <Shield size={16} />
            Admin
          </button>
        </div>

        <form className="auth-form" onSubmit={onSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {error ? <p className="form-error">{error}</p> : null}
          <button type="submit" className="button button-primary auth-submit">
            <LockKeyhole size={15} />
            Sign in as {mode}
          </button>
        </form>

        <div className="demo-creds">
          <p>
            <strong>Customer:</strong> {DEMO_ACCOUNTS.customer.email} /{" "}
            {DEMO_ACCOUNTS.customer.password}
          </p>
          <p>
            <strong>Admin:</strong> {DEMO_ACCOUNTS.admin.email} /{" "}
            {DEMO_ACCOUNTS.admin.password}
          </p>
        </div>
      </div>
    </div>
  );
}
