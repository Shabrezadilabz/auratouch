import { CheckCircle2, CreditCard, LoaderCircle, Mail } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { useAuth } from "../lib/auth";
import { productImage } from "../lib/productImage";
import {
  completePayment,
  formatCurrency,
  getOrderById,
} from "../lib/store";

export function PaymentPage() {
  const { session } = useAuth();
  const [, params] = useRoute("/pay/:orderId");
  const [, setLocation] = useLocation();
  const orderId = params?.orderId ?? "";
  const order = useMemo(() => getOrderById(orderId), [orderId]);

  const [method, setMethod] = useState<"card" | "upi">("card");
  const [cardNumber, setCardNumber] = useState("4111 1111 1111 1111");
  const [expiry, setExpiry] = useState("12/28");
  const [cvv, setCvv] = useState("123");
  const [upi, setUpi] = useState("rohan@okaxis");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{
    trackingCode: string;
    mailTo: string;
  } | null>(null);

  useEffect(() => {
    if (!session || session.role !== "customer") setLocation("/login");
  }, [session, setLocation]);

  if (!session || session.role !== "customer") return null;

  if (!order || order.userId !== session.userId) {
    return (
      <div className="app-shell page-pad">
        <div className="auth-card">
          <h1>Order not found</h1>
          <Link className="button button-primary" href="/portal">
            Back to portal
          </Link>
        </div>
      </div>
    );
  }

  if (order.status !== "pending_payment" && !done) {
    return (
      <div className="app-shell page-pad">
        <div className="auth-card">
          <h1>Already paid</h1>
          <p className="auth-copy">
            This order is already past payment. Track it with{" "}
            <strong>{order.trackingCode}</strong>.
          </p>
          <Link
            className="button button-primary"
            href={`/track/${order.trackingCode}`}
          >
            Open tracking
          </Link>
        </div>
      </div>
    );
  }

  const onPay = (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    window.setTimeout(() => {
      const result = completePayment(
        order.id,
        method === "card" ? "Demo Card" : "UPI Demo",
      );
      setDone({
        trackingCode: result.order.trackingCode,
        mailTo: result.mail.to,
      });
      setBusy(false);
    }, 1400);
  };

  if (done) {
    return (
      <div className="app-shell page-pad">
        <div className="auth-card payment-success">
          <CheckCircle2 size={42} className="success-icon" />
          <h1>Payment successful</h1>
          <p className="auth-copy">
            Dummy gateway approved the charge. A tracking email was queued to{" "}
            <strong>{done.mailTo}</strong>.
          </p>
          <div className="success-meta">
            <span>Tracking code</span>
            <strong>{done.trackingCode}</strong>
          </div>
          <div className="mail-preview">
            <Mail size={16} />
            <div>
              <b>Inbox simulation</b>
              <p>
                Subject: Aura Touch order confirmed · {done.trackingCode}
              </p>
            </div>
          </div>
          <div className="button-row">
            <Link
              className="button button-primary"
              href={`/track/${done.trackingCode}`}
            >
              Track order
            </Link>
            <Link className="button button-secondary" href="/portal">
              Back to portal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell page-pad">
      <div className="payment-layout">
        <section className="portal-panel">
          <h1>Dummy payment gateway</h1>
          <p className="auth-copy">
            No real money moves. Use any demo card or UPI ID to complete the
            booking.
          </p>

          <div className="pay-methods">
            <button
              type="button"
              className={method === "card" ? "is-active" : ""}
              onClick={() => setMethod("card")}
            >
              <CreditCard size={16} />
              Card
            </button>
            <button
              type="button"
              className={method === "upi" ? "is-active" : ""}
              onClick={() => setMethod("upi")}
            >
              UPI
            </button>
          </div>

          <form className="auth-form" onSubmit={onPay}>
            {method === "card" ? (
              <>
                <label>
                  Card number
                  <input
                    value={cardNumber}
                    onChange={(event) => setCardNumber(event.target.value)}
                    required
                  />
                </label>
                <div className="form-row">
                  <label>
                    Expiry
                    <input
                      value={expiry}
                      onChange={(event) => setExpiry(event.target.value)}
                      required
                    />
                  </label>
                  <label>
                    CVV
                    <input
                      value={cvv}
                      onChange={(event) => setCvv(event.target.value)}
                      required
                    />
                  </label>
                </div>
              </>
            ) : (
              <label>
                UPI ID
                <input
                  value={upi}
                  onChange={(event) => setUpi(event.target.value)}
                  required
                />
              </label>
            )}

            <button
              type="submit"
              className="button button-primary auth-submit"
              disabled={busy}
            >
              {busy ? <LoaderCircle className="spin" size={16} /> : null}
              {busy
                ? "Processing…"
                : `Pay ${formatCurrency(order.amount)}`}
            </button>
          </form>
        </section>

        <aside className="portal-panel order-summary">
          <h2>Order summary</h2>
          <img src={productImage(order.productId)} alt="" />
          <h3>{order.productName}</h3>
          <p>
            Qty {order.quantity} · {order.shippingAddress}
          </p>
          <div className="book-summary">
            <span>Total</span>
            <strong>{formatCurrency(order.amount)}</strong>
          </div>
          <Link className="button button-secondary" href="/portal">
            Cancel and return
          </Link>
        </aside>
      </div>
    </div>
  );
}
