import {
  Check,
  Mail,
  MapPin,
  PackageCheck,
  Radio,
  Truck,
} from "lucide-react";
import { useMemo } from "react";
import { Link, useRoute } from "wouter";
import {
  formatCurrency,
  formatDate,
  getMails,
  getOrderByTracking,
  statusLabel,
} from "../lib/store";
import type { OrderStatus } from "../lib/types";

const STEPS: OrderStatus[] = [
  "paid",
  "dispatched",
  "received",
  "active",
];

function stepIndex(status: OrderStatus) {
  if (status === "pending_payment") return -1;
  return STEPS.indexOf(status === "paid" ? "paid" : status);
}

export function TrackPage() {
  const [, params] = useRoute("/track/:code");
  const code = params?.code ?? "";
  const order = useMemo(() => getOrderByTracking(code), [code]);
  const mail = useMemo(
    () => getMails().find((item) => item.trackingCode === code) ?? null,
    [code],
  );

  if (!order) {
    return (
      <div className="app-shell page-pad">
        <div className="auth-card">
          <h1>Tracking not found</h1>
          <p className="auth-copy">
            No order matches <strong>{code}</strong>.
          </p>
          <Link className="button button-primary" href="/portal">
            Go to customer portal
          </Link>
        </div>
      </div>
    );
  }

  const current = stepIndex(order.status);

  return (
    <div className="app-shell page-pad">
      <div className="track-layout">
        <section className="portal-panel">
          <span className={`status-pill status-${order.status}`}>
            {statusLabel(order.status)}
          </span>
          <h1>{order.productName}</h1>
          <p className="auth-copy">
            Tracking <strong>{order.trackingCode}</strong> for{" "}
            {order.customerName}
          </p>

          <div className="track-steps">
            {STEPS.map((step, index) => {
              const done = current >= index;
              const active = current === index;
              return (
                <div
                  key={step}
                  className={`track-step ${done ? "is-done" : ""} ${
                    active ? "is-active" : ""
                  }`}
                >
                  <span>
                    {done ? <Check size={14} /> : index + 1}
                  </span>
                  <div>
                    <b>{statusLabel(step)}</b>
                    <small>
                      {step === "paid" && formatDate(order.paidAt)}
                      {step === "dispatched" && formatDate(order.dispatchedAt)}
                      {step === "received" && formatDate(order.receivedAt)}
                      {step === "active" && formatDate(order.activatedAt)}
                    </small>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="track-facts">
            <div>
              <PackageCheck size={16} />
              <div>
                <small>Amount</small>
                <b>{formatCurrency(order.amount)}</b>
              </div>
            </div>
            <div>
              <Truck size={16} />
              <div>
                <small>Payment</small>
                <b>{order.paymentMethod || "Pending"}</b>
              </div>
            </div>
            <div>
              <MapPin size={16} />
              <div>
                <small>Ship to</small>
                <b>{order.shippingAddress}</b>
              </div>
            </div>
            <div>
              <Radio size={16} />
              <div>
                <small>Qty</small>
                <b>{order.quantity}</b>
              </div>
            </div>
          </div>

          <div className="button-row">
            <Link className="button button-secondary" href="/portal">
              Customer portal
            </Link>
            <Link className="button button-primary" href="/">
              Back home
            </Link>
          </div>
        </section>

        <aside className="portal-panel">
          <div className="panel-head">
            <Mail size={18} />
            <div>
              <h2>Tracking email</h2>
              <p>Simulated inbox message after payment.</p>
            </div>
          </div>
          {mail ? (
            <article className="mail-box">
              <p>
                <small>To</small>
                <b>{mail.to}</b>
              </p>
              <p>
                <small>Subject</small>
                <b>{mail.subject}</b>
              </p>
              <p>
                <small>Sent</small>
                <b>{formatDate(mail.sentAt)}</b>
              </p>
              <pre>{mail.body}</pre>
            </article>
          ) : (
            <p className="empty-state">
              Email appears after dummy payment succeeds.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
