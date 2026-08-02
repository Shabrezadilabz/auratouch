import { PRODUCTS } from "../lib/store";

export function productImage(productId: string) {
  return PRODUCTS.find((item) => item.id === productId)?.image ?? "/aura-touch-logo.jpeg";
}
