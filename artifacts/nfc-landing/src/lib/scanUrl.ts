export function getAppOrigin() {
  if (typeof window === "undefined") return "";
  return window.location.origin;
}

export function getScanUrl(path = "/scan") {
  return `${getAppOrigin()}${path}`;
}

export function getQrImageUrl(data: string, size = 280) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=12&ecc=H&data=${encodeURIComponent(data)}`;
}

export function getBrandedQrImageUrl(data: string, size = 280) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=8&ecc=H&color=111111&bgcolor=C0785A&data=${encodeURIComponent(data)}`;
}

export function isAuraScanPayload(value: string) {
  try {
    const url = new URL(value);
    return (
      url.pathname === "/scan" ||
      url.pathname.startsWith("/scan/") ||
      url.pathname === "/scanner"
    );
  } catch {
    return /\/scan(\/|$)/.test(value) || value.trim().toUpperCase() === "AURA-SCAN";
  }
}

export function resolveScanRoute(value: string) {
  try {
    const url = new URL(value, getAppOrigin());
    if (url.pathname.startsWith("/scan/menu")) return "/scan/menu";
    if (url.pathname.startsWith("/scan/drive")) return "/scan/drive";
    if (url.pathname.startsWith("/scan")) return "/scan";
  } catch {
    // ignore
  }
  if (value.includes("menu")) return "/scan/menu";
  if (value.includes("drive")) return "/scan/drive";
  return "/scan";
}
