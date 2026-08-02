import {
  ArrowRight,
  LogOut,
  Package,
  Plus,
  Truck,
} from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "../lib/auth";
import {
  PRODUCTS,
  createOrder,
  formatCurrency,
  formatDate,
  getOrdersForUser,
  statusLabel,
} from "../lib/store";
import type { ProductId } from "../lib/types";

export function CustomerPortalPage() {
  const { session, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [productId, setProductId] = useState<ProductId>("passport");
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("12 Marine Drive, Mumbai");
  const [notes, setNotes] = useState("");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!session || session.role !== "customer") setLocation("/login");
  }, [session, setLocation]);

  const orders = useMemo(
    () => (session ? getOrdersForUser(session.userId) : []),
    [session, tick],
  );

  if (!session || session.role !== "customer") return null;
  const selected = PRODUCTS.find((item) => item.id === productId)!;

  const onBook = (event: FormEvent) => {
    event.preventDefault();
    const order = createOrder({
      userId: session.userId,
      customerName: session.name,
      customerEmail: session.email,
      productId,
      quantity,
      shippingAddress: address,
      notes,
    });
    setTick((value) => value + 1);
    setLocation(`/pay/${order.id}`);
  };

  return (
    <div className="app-shell page-pad portal-shell">
      <header className="portal-top">
        <Link href="/" className="brand">
          <span className="brand-logo brand-logo-small">
            <img src="/aura-touch-logo.jpeg" alt="" />
          </span>
          Aura Touch
        </Link>
        <div className="portal-user">
          <div>
            <strong>{session.name}</strong>
            <span>{session.email}</span>
          </div>
          <button
            type="button"
            className="button button-secondary"
            onClick={() => {
              logout();
              setLocation("/");
            }}
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </header>

      <div className="portal-grid">
        <section className="portal-panel">
          <div className="panel-head">
            <Plus size={18} />
            <div>
              <h1>Book your Aura Touch</h1>
              <p>Choose a tag, confirm shipping, and pay with the dummy gateway.</p>
            </div>
          </div>

          <form className="book-form" onSubmit={onBook}>
            <div className="product-picker">
              {PRODUCTS.map((product) => (
                <button
                  type="button"
                  key={product.id}
                  className={productId === product.id ? "is-active" : ""}
                  onClick={() => setProductId(product.id)}
                >
                  <img src={product.image} alt="" />
                  <span>
                    <b>{product.name}</b>
                    <small>{formatCurrency(product.price)}</small>
                  </span>
                </button>
              ))}
            </div>

            <div className="selected-product">
              <img src={selected.image} alt="" />
              <div>
                <h2>{selected.name}</h2>
                <p>{selected.tagline}</p>
                <ul>
                  {selected.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="form-row">
              <label>
                Quantity
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={quantity}
                  onChange={(event) =>
                    setQuantity(Math.max(1, Number(event.target.value) || 1))
                  }
                />
              </label>
              <label>
                Shipping address
                <input
                  type="text"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  required
                />
              </label>
            </div>

            <label>
              Notes (optional)
              <textarea
                rows={3}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Delivery window, branding, or destination URL"
              />
            </label>

            <div className="book-summary">
              <span>Total due</span>
              <strong>{formatCurrency(selected.price * quantity)}</strong>
            </div>

            <button type="submit" className="button button-primary">
              Continue to payment
              <ArrowRight size={15} />
            </button>
          </form>
        </section>

        <section className="portal-panel">
          <div className="panel-head">
            <Package size={18} />
            <div>
              <h2>Your orders</h2>
              <p>Track payment, dispatch, delivery, and live usage.</p>
            </div>
          </div>

          <div className="order-list">
            {orders.length === 0 ? (
              <p className="empty-state">No orders yet. Book your first tag.</p>
            ) : (
              orders.map((order) => (
                <article key={order.id} className="order-card">
                  <div>
                    <span className={`status-pill status-${order.status}`}>
                      {statusLabel(order.status)}
                    </span>
                    <h3>{order.productName}</h3>
                    <p>
                      {order.trackingCode} · Qty {order.quantity} ·{" "}
                      {formatCurrency(order.amount)}
                    </p>
                    <small>{formatDate(order.createdAt)}</small>
                  </div>
                  <div className="order-actions">
                    {order.status === "pending_payment" ? (
                      <Link className="button button-primary" href={`/pay/${order.id}`}>
                        Pay now
                      </Link>
                    ) : (
                      <Link
                        className="button button-secondary"
                        href={`/track/${order.trackingCode}`}
                      >
                        <Truck size={14} />
                        Track
                      </Link>
                    )}
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
