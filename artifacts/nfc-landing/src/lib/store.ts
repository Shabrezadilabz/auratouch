import type {
  MailMessage,
  Order,
  OrderStatus,
  Product,
  Session,
  User,
} from "./types";

const STORAGE_KEYS = {
  users: "aura.users",
  orders: "aura.orders",
  mails: "aura.mails",
  session: "aura.session",
  seeded: "aura.seeded",
} as const;

export const PRODUCTS: Product[] = [
  {
    id: "passport",
    name: "Aura Super-Passport",
    tagline: "One durable NFC passport for every journey.",
    price: 2499,
    image: "/aura-touch-logo.jpeg",
    features: ["NFC + QR", "Battery-free", "Remote destination updates"],
  },
  {
    id: "pay",
    name: "Aura Pay Tag",
    tagline: "Turn any surface into an instant payment point.",
    price: 1499,
    image: "/aura-retail-payment.png",
    features: ["Retail checkout", "Receipts", "Secure tap"],
  },
  {
    id: "access",
    name: "Aura Access Tag",
    tagline: "Open doors and digital spaces with one interaction.",
    price: 1799,
    image: "/aura-hotel-access.png",
    features: ["Room unlock", "Visitor access", "Audit trail"],
  },
  {
    id: "book",
    name: "Aura Transit Tag",
    tagline: "Book and board without hunting for an app.",
    price: 1299,
    image: "/aura-bus-booking.png",
    features: ["Bus booking", "Metro entry", "Ticketless travel"],
  },
  {
    id: "care",
    name: "Aura Care Tag",
    tagline: "Share verified medical context when seconds matter.",
    price: 1999,
    image: "/aura-hospital-care.png",
    features: ["Medical ID", "Emergency profile", "Hospital ready"],
  },
];

export const DEMO_ACCOUNTS = {
  customer: {
    email: "customer@auratouch.com",
    password: "customer123",
  },
  admin: {
    email: "admin@auratouch.com",
    password: "admin123",
  },
} as const;

const seedUsers: User[] = [
  {
    id: "user-admin",
    name: "Asha Verma",
    email: DEMO_ACCOUNTS.admin.email,
    password: DEMO_ACCOUNTS.admin.password,
    role: "admin",
  },
  {
    id: "user-customer",
    name: "Rohan Mehta",
    email: DEMO_ACCOUNTS.customer.email,
    password: DEMO_ACCOUNTS.customer.password,
    role: "customer",
  },
  {
    id: "user-priya",
    name: "Priya Nair",
    email: "priya@example.com",
    password: "demo123",
    role: "customer",
  },
];

function daysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

function makeTracking() {
  return `AT-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Date.now()
    .toString()
    .slice(-4)}`;
}

function makeId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

const seedOrders: Order[] = [
  {
    id: "ord-1001",
    trackingCode: "AT-PAY-1001",
    userId: "user-customer",
    customerName: "Rohan Mehta",
    customerEmail: "customer@auratouch.com",
    productId: "pay",
    productName: "Aura Pay Tag",
    quantity: 2,
    amount: 2998,
    status: "active",
    paymentMethod: "Demo Card",
    createdAt: daysAgo(18),
    paidAt: daysAgo(18),
    dispatchedAt: daysAgo(16),
    receivedAt: daysAgo(12),
    activatedAt: daysAgo(11),
    shippingAddress: "12 Marine Drive, Mumbai",
    emailSent: true,
  },
  {
    id: "ord-1002",
    trackingCode: "AT-ACC-1002",
    userId: "user-priya",
    customerName: "Priya Nair",
    customerEmail: "priya@example.com",
    productId: "access",
    productName: "Aura Access Tag",
    quantity: 1,
    amount: 1799,
    status: "received",
    paymentMethod: "UPI Demo",
    createdAt: daysAgo(10),
    paidAt: daysAgo(10),
    dispatchedAt: daysAgo(8),
    receivedAt: daysAgo(4),
    shippingAddress: "88 Brigade Road, Bengaluru",
    emailSent: true,
  },
  {
    id: "ord-1003",
    trackingCode: "AT-BUS-1003",
    userId: "user-customer",
    customerName: "Rohan Mehta",
    customerEmail: "customer@auratouch.com",
    productId: "book",
    productName: "Aura Transit Tag",
    quantity: 3,
    amount: 3897,
    status: "dispatched",
    paymentMethod: "Demo Card",
    createdAt: daysAgo(5),
    paidAt: daysAgo(5),
    dispatchedAt: daysAgo(2),
    shippingAddress: "12 Marine Drive, Mumbai",
    emailSent: true,
  },
  {
    id: "ord-1004",
    trackingCode: "AT-CARE-1004",
    userId: "user-priya",
    customerName: "Priya Nair",
    customerEmail: "priya@example.com",
    productId: "care",
    productName: "Aura Care Tag",
    quantity: 1,
    amount: 1999,
    status: "paid",
    paymentMethod: "Demo Card",
    createdAt: daysAgo(2),
    paidAt: daysAgo(2),
    shippingAddress: "88 Brigade Road, Bengaluru",
    emailSent: true,
  },
  {
    id: "ord-1005",
    trackingCode: "AT-PASS-1005",
    userId: "user-customer",
    customerName: "Rohan Mehta",
    customerEmail: "customer@auratouch.com",
    productId: "passport",
    productName: "Aura Super-Passport",
    quantity: 1,
    amount: 2499,
    status: "pending_payment",
    paymentMethod: "",
    createdAt: daysAgo(1),
    shippingAddress: "12 Marine Drive, Mumbai",
    emailSent: false,
  },
];

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function ensureSeedData() {
  if (localStorage.getItem(STORAGE_KEYS.seeded) === "1") return;
  writeJson(STORAGE_KEYS.users, seedUsers);
  writeJson(STORAGE_KEYS.orders, seedOrders);
  writeJson(STORAGE_KEYS.mails, [] as MailMessage[]);
  localStorage.setItem(STORAGE_KEYS.seeded, "1");
}

export function getUsers() {
  ensureSeedData();
  return readJson<User[]>(STORAGE_KEYS.users, seedUsers);
}

export function getOrders() {
  ensureSeedData();
  return readJson<Order[]>(STORAGE_KEYS.orders, seedOrders);
}

export function getMails() {
  ensureSeedData();
  return readJson<MailMessage[]>(STORAGE_KEYS.mails, []);
}

export function getSession(): Session | null {
  ensureSeedData();
  return readJson<Session | null>(STORAGE_KEYS.session, null);
}

export function setSession(session: Session | null) {
  if (!session) {
    localStorage.removeItem(STORAGE_KEYS.session);
    return;
  }
  writeJson(STORAGE_KEYS.session, session);
}

export function authenticate(email: string, password: string) {
  const user = getUsers().find(
    (item) =>
      item.email.toLowerCase() === email.trim().toLowerCase() &&
      item.password === password,
  );
  if (!user) return null;
  const session: Session = {
    userId: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
  };
  setSession(session);
  return session;
}

export function getOrdersForUser(userId: string) {
  return getOrders()
    .filter((order) => order.userId === userId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

export function getOrderById(orderId: string) {
  return getOrders().find((order) => order.id === orderId) ?? null;
}

export function getOrderByTracking(trackingCode: string) {
  return (
    getOrders().find(
      (order) =>
        order.trackingCode.toLowerCase() === trackingCode.trim().toLowerCase(),
    ) ?? null
  );
}

export function createOrder(input: {
  userId: string;
  customerName: string;
  customerEmail: string;
  productId: Product["id"];
  quantity: number;
  shippingAddress: string;
  notes?: string;
}) {
  const product = PRODUCTS.find((item) => item.id === input.productId);
  if (!product) throw new Error("Product not found");

  const order: Order = {
    id: makeId("ord"),
    trackingCode: makeTracking(),
    userId: input.userId,
    customerName: input.customerName,
    customerEmail: input.customerEmail,
    productId: product.id,
    productName: product.name,
    quantity: input.quantity,
    amount: product.price * input.quantity,
    status: "pending_payment",
    paymentMethod: "",
    createdAt: new Date().toISOString(),
    shippingAddress: input.shippingAddress,
    notes: input.notes,
    emailSent: false,
  };

  const orders = [order, ...getOrders()];
  writeJson(STORAGE_KEYS.orders, orders);
  return order;
}

export function completePayment(orderId: string, paymentMethod: string) {
  const orders = getOrders();
  const index = orders.findIndex((order) => order.id === orderId);
  if (index < 0) throw new Error("Order not found");

  const order = {
    ...orders[index],
    status: "paid" as OrderStatus,
    paymentMethod,
    paidAt: new Date().toISOString(),
    emailSent: true,
  };
  orders[index] = order;
  writeJson(STORAGE_KEYS.orders, orders);

  const mail: MailMessage = {
    id: makeId("mail"),
    to: order.customerEmail,
    subject: `Aura Touch order confirmed · ${order.trackingCode}`,
    body: `Hi ${order.customerName},\n\nYour ${order.productName} order is confirmed.\nTracking code: ${order.trackingCode}\nAmount paid: ₹${order.amount.toLocaleString("en-IN")}\n\nTrack anytime at /track/${order.trackingCode}\n\n— Aura Touch`,
    orderId: order.id,
    trackingCode: order.trackingCode,
    sentAt: new Date().toISOString(),
  };
  writeJson(STORAGE_KEYS.mails, [mail, ...getMails()]);
  return { order, mail };
}

export function updateOrderStatus(orderId: string, status: OrderStatus) {
  const orders = getOrders();
  const index = orders.findIndex((order) => order.id === orderId);
  if (index < 0) throw new Error("Order not found");

  const now = new Date().toISOString();
  const order = { ...orders[index], status };
  if (status === "dispatched") order.dispatchedAt = now;
  if (status === "received") order.receivedAt = now;
  if (status === "active") order.activatedAt = now;

  orders[index] = order;
  writeJson(STORAGE_KEYS.orders, orders);
  return order;
}

export function getAnalytics() {
  const orders = getOrders();
  const paidLike = orders.filter((order) => order.status !== "pending_payment");
  return {
    totalOrders: orders.length,
    pendingPayment: orders.filter((o) => o.status === "pending_payment").length,
    paid: orders.filter((o) => o.status === "paid").length,
    dispatched: orders.filter((o) => o.status === "dispatched").length,
    received: orders.filter((o) => o.status === "received").length,
    activePayments: orders.filter((o) => o.status === "active").length,
    revenue: paidLike.reduce((sum, order) => sum + order.amount, 0),
    byProduct: PRODUCTS.map((product) => ({
      id: product.id,
      name: product.name,
      count: orders.filter((order) => order.productId === product.id).length,
      revenue: paidLike
        .filter((order) => order.productId === product.id)
        .reduce((sum, order) => sum + order.amount, 0),
    })),
  };
}

export function formatCurrency(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function formatDate(value?: string) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function statusLabel(status: OrderStatus) {
  switch (status) {
    case "pending_payment":
      return "Pending payment";
    case "paid":
      return "Paid";
    case "dispatched":
      return "Dispatched";
    case "received":
      return "Received";
    case "active":
      return "Active for payments";
  }
}
