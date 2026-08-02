export type UserRole = "customer" | "admin";

export type OrderStatus =
  | "pending_payment"
  | "paid"
  | "dispatched"
  | "received"
  | "active";

export type ProductId = "pay" | "access" | "book" | "care" | "passport";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

export type Product = {
  id: ProductId;
  name: string;
  tagline: string;
  price: number;
  image: string;
  features: string[];
};

export type Order = {
  id: string;
  trackingCode: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  productId: ProductId;
  productName: string;
  quantity: number;
  amount: number;
  status: OrderStatus;
  paymentMethod: string;
  createdAt: string;
  paidAt?: string;
  dispatchedAt?: string;
  receivedAt?: string;
  activatedAt?: string;
  shippingAddress: string;
  notes?: string;
  emailSent: boolean;
};

export type MailMessage = {
  id: string;
  to: string;
  subject: string;
  body: string;
  orderId: string;
  trackingCode: string;
  sentAt: string;
};

export type Session = {
  userId: string;
  role: UserRole;
  name: string;
  email: string;
};
