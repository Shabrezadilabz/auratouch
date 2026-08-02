import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Minus,
  Plus,
  ShoppingBag,
  UtensilsCrossed,
} from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { Link } from "wouter";
import { formatCurrency } from "../lib/store";

const MENU = [
  {
    id: "truffle-pasta",
    category: "Mains",
    name: "Truffle mushroom pasta",
    detail: "Wild mushroom, parmesan, black truffle cream",
    price: 495,
    image: "/aura-menu-pasta.jpg",
    fallback: "🍝",
    vegetarian: true,
  },
  {
    id: "tandoori-bowl",
    category: "Mains",
    name: "Tandoori harvest bowl",
    detail: "Charred paneer, saffron rice, mint yoghurt",
    price: 425,
    image: "/aura-menu-bowl.jpg",
    fallback: "🥘",
    vegetarian: true,
  },
  {
    id: "smoked-chicken",
    category: "Chef's special",
    name: "Smoked pepper chicken",
    detail: "Fire-roasted peppers, herb jus, seasonal greens",
    price: 575,
    image: "/aura-menu-chicken.jpg",
    fallback: "🍗",
    vegetarian: false,
  },
  {
    id: "garden-salad",
    category: "Small plates",
    name: "Citrus garden salad",
    detail: "Avocado, orange, rocket, toasted seeds",
    price: 315,
    image: "/aura-menu-salad.jpg",
    fallback: "🥗",
    vegetarian: true,
  },
  {
    id: "cold-coffee",
    category: "Drinks",
    name: "Copper cold coffee",
    detail: "Single-origin coffee, vanilla, oat milk",
    price: 225,
    image: "/aura-menu-coffee.jpg",
    fallback: "☕",
    vegetarian: true,
  },
  {
    id: "chocolate-dome",
    category: "Dessert",
    name: "Dark chocolate dome",
    detail: "70% chocolate, sea salt caramel, praline",
    price: 345,
    image: "/aura-menu-dessert.jpg",
    fallback: "🍫",
    vegetarian: true,
  },
] as const;

type Cart = Record<string, number>;

export function FoodMenuPage() {
  const [cart, setCart] = useState<Cart>({});
  const [checkout, setCheckout] = useState(false);
  const [paid, setPaid] = useState(false);
  const [busy, setBusy] = useState(false);
  const [table, setTable] = useState("T12");
  const [method, setMethod] = useState("UPI Demo");

  const count = Object.values(cart).reduce((sum, value) => sum + value, 0);
  const subtotal = MENU.reduce(
    (sum, item) => sum + item.price * (cart[item.id] ?? 0),
    0,
  );
  const tax = Math.round(subtotal * 0.05);

  const selectedItems = useMemo(
    () => MENU.filter((item) => (cart[item.id] ?? 0) > 0),
    [cart],
  );

  const changeItem = (id: string, delta: number) => {
    setCart((current) => {
      const next = Math.max(0, (current[id] ?? 0) + delta);
      return { ...current, [id]: next };
    });
  };

  const pay = (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    window.setTimeout(() => {
      const orders = JSON.parse(
        localStorage.getItem("aura.foodOrders") ?? "[]",
      ) as unknown[];
      localStorage.setItem(
        "aura.foodOrders",
        JSON.stringify([
          {
            id: `FOOD-${Date.now().toString().slice(-6)}`,
            table,
            method,
            total: subtotal + tax,
            items: selectedItems.map((item) => ({
              name: item.name,
              quantity: cart[item.id],
            })),
            createdAt: new Date().toISOString(),
          },
          ...orders,
        ]),
      );
      setBusy(false);
      setPaid(true);
    }, 1200);
  };

  if (paid) {
    return (
      <main className="menu-shell page-pad menu-success">
        <CheckCircle2 size={54} />
        <span className="eyebrow">Order sent to kitchen</span>
        <h1>Your table is taken care of.</h1>
        <p>
          Dummy payment of {formatCurrency(subtotal + tax)} succeeded for table{" "}
          {table}. Your order number is{" "}
          <strong>FOOD-{Date.now().toString().slice(-6)}</strong>.
        </p>
        <div className="button-row">
          <button
            className="button button-primary"
            onClick={() => {
              setPaid(false);
              setCheckout(false);
              setCart({});
            }}
          >
            Order more
          </button>
          <Link className="button button-secondary" href="/scan">
            Back to scan
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="menu-shell page-pad">
      <header className="menu-header">
        <Link href="/scan" className="back-link">
          <ArrowLeft size={15} />
          Scan options
        </Link>
        <div className="menu-brand">
          <UtensilsCrossed size={20} />
          <div>
            <b>Aura Kitchen</b>
            <small>Tap menu · Mumbai</small>
          </div>
        </div>
        <button
          type="button"
          className="cart-button"
          onClick={() => count > 0 && setCheckout(true)}
        >
          <ShoppingBag size={17} />
          Cart
          <span>{count}</span>
        </button>
      </header>

      <section className="menu-intro">
        <span className="eyebrow">Seasonal menu · Served all day</span>
        <h1>Choose what feels good.</h1>
        <p>
          Freshly prepared dishes, ordered and paid directly from the Aura
          Touch card at your table.
        </p>
      </section>

      <section className="food-grid">
        {MENU.map((item) => {
          const quantity = cart[item.id] ?? 0;
          return (
            <article className="food-card" key={item.id}>
              <div className="food-visual">
                <span>{item.fallback}</span>
                <div className="food-visual-glow" />
              </div>
              <div className="food-card-copy">
                <span className="food-category">
                  {item.category}
                  {item.vegetarian ? " · Veg" : ""}
                </span>
                <h2>{item.name}</h2>
                <p>{item.detail}</p>
                <div className="food-card-bottom">
                  <strong>{formatCurrency(item.price)}</strong>
                  {quantity === 0 ? (
                    <button type="button" onClick={() => changeItem(item.id, 1)}>
                      Add
                      <Plus size={14} />
                    </button>
                  ) : (
                    <div className="quantity-control">
                      <button
                        type="button"
                        onClick={() => changeItem(item.id, -1)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Minus size={13} />
                      </button>
                      <span>{quantity}</span>
                      <button
                        type="button"
                        onClick={() => changeItem(item.id, 1)}
                        aria-label={`Add ${item.name}`}
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {count > 0 ? (
        <button
          type="button"
          className="floating-cart"
          onClick={() => setCheckout(true)}
        >
          <span>{count} items</span>
          <strong>{formatCurrency(subtotal)}</strong>
          <span>
            Checkout
            <ChevronRight size={15} />
          </span>
        </button>
      ) : null}

      {checkout ? (
        <div className="checkout-overlay" role="dialog" aria-modal="true">
          <div className="checkout-sheet">
            <button
              className="checkout-close"
              type="button"
              onClick={() => setCheckout(false)}
            >
              Close
            </button>
            <span className="eyebrow">Your order</span>
            <h2>Ready for the kitchen</h2>
            <div className="checkout-items">
              {selectedItems.map((item) => (
                <div key={item.id}>
                  <span>
                    {cart[item.id]} × {item.name}
                  </span>
                  <b>{formatCurrency(item.price * cart[item.id])}</b>
                </div>
              ))}
            </div>
            <div className="checkout-total">
              <span>Subtotal</span>
              <b>{formatCurrency(subtotal)}</b>
              <span>GST (5%)</span>
              <b>{formatCurrency(tax)}</b>
              <strong>Total</strong>
              <strong>{formatCurrency(subtotal + tax)}</strong>
            </div>
            <form className="auth-form" onSubmit={pay}>
              <label>
                Table / pickup reference
                <input
                  value={table}
                  onChange={(event) => setTable(event.target.value)}
                  required
                />
              </label>
              <label>
                Dummy payment method
                <select
                  value={method}
                  onChange={(event) => setMethod(event.target.value)}
                >
                  <option>UPI Demo</option>
                  <option>Demo Card</option>
                  <option>Pay at counter</option>
                </select>
              </label>
              <button
                className="button button-primary auth-submit"
                disabled={busy}
              >
                {busy
                  ? "Authorising…"
                  : `Pay ${formatCurrency(subtotal + tax)}`}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  );
}
