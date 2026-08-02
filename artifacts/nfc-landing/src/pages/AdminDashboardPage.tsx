import {
  Activity,
  Boxes,
  CreditCard,
  LogOut,
  Package,
  PackageCheck,
  Truck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "../lib/auth";
import {
  formatCurrency,
  formatDate,
  getAnalytics,
  getOrders,
  statusLabel,
  updateOrderStatus,
} from "../lib/store";
import type { OrderStatus } from "../lib/types";

const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  paid: "dispatched",
  dispatched: "received",
  received: "active",
};

export function AdminDashboardPage() {
  const { session, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!session || session.role !== "admin") setLocation("/login");
  }, [session, setLocation]);

  const analytics = useMemo(() => getAnalytics(), [tick]);
  const orders = useMemo(
    () =>
      getOrders().sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [tick],
  );

  const advance = (orderId: string, status: OrderStatus) => {
    const next = NEXT_STATUS[status];
    if (!next) return;
    updateOrderStatus(orderId, next);
    setTick((value) => value + 1);
  };

  if (!session || session.role !== "admin") return null;

  return (
    <div className="app-shell page-pad portal-shell">
      <header className="portal-top">
        <Link href="/" className="brand">
          <span className="brand-logo brand-logo-small">
            <img src="/aura-touch-logo.jpeg" alt="" />
          </span>
          Aura Admin
        </Link>
        <div className="portal-user">
          <div>
            <strong>{session.name}</strong>
            <span>Operations dashboard</span>
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

      <section className="analytics-grid">
        {[
          {
            label: "Total orders",
            value: analytics.totalOrders,
            icon: Package,
          },
          {
            label: "Paid",
            value: analytics.paid,
            icon: CreditCard,
          },
          {
            label: "Dispatched",
            value: analytics.dispatched,
            icon: Truck,
          },
          {
            label: "Received",
            value: analytics.received,
            icon: PackageCheck,
          },
          {
            label: "Active for payment",
            value: analytics.activePayments,
            icon: Activity,
          },
          {
            label: "Revenue",
            value: formatCurrency(analytics.revenue),
            icon: Boxes,
          },
        ].map(({ label, value, icon: Icon }) => (
          <article key={label} className="metric-card">
            <Icon size={18} />
            <div>
              <small>{label}</small>
              <strong>{value}</strong>
            </div>
          </article>
        ))}
      </section>

      <div className="admin-grid">
        <section className="portal-panel">
          <div className="panel-head">
            <Boxes size={18} />
            <div>
              <h2>Product demand</h2>
              <p>Orders and revenue by tag type.</p>
            </div>
          </div>
          <div className="product-bars">
            {analytics.byProduct.map((item) => {
              const max = Math.max(
                ...analytics.byProduct.map((row) => row.count),
                1,
              );
              return (
                <div key={item.id} className="product-bar">
                  <div className="product-bar-meta">
                    <b>{item.name}</b>
                    <span>
                      {item.count} orders · {formatCurrency(item.revenue)}
                    </span>
                  </div>
                  <div className="bar-track">
                    <span
                      style={{ width: `${(item.count / max) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="portal-panel">
          <div className="panel-head">
            <Package size={18} />
            <div>
              <h2>Order pipeline</h2>
              <p>Advance dispatch, delivery, and activation.</p>
            </div>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <b>{order.productName}</b>
                      <small>{order.trackingCode}</small>
                    </td>
                    <td>
                      <b>{order.customerName}</b>
                      <small>{formatDate(order.createdAt)}</small>
                    </td>
                    <td>
                      <span className={`status-pill status-${order.status}`}>
                        {statusLabel(order.status)}
                      </span>
                    </td>
                    <td>{formatCurrency(order.amount)}</td>
                    <td>
                      {NEXT_STATUS[order.status] ? (
                        <button
                          type="button"
                          className="button button-secondary table-action"
                          onClick={() => advance(order.id, order.status)}
                        >
                          Mark {statusLabel(NEXT_STATUS[order.status]!)}
                        </button>
                      ) : order.status === "pending_payment" ? (
                        <small>Awaiting customer pay</small>
                      ) : (
                        <small>Live in field</small>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
