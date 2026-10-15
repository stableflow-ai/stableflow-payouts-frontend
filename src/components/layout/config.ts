export const HEADER_NAV_ACTIVE_COLOR = "#0054D2";

export const HEADER_ACCOUNT_MENU_VARIANT = {
  Capsule: "capsule",
  Sidebar: "sidebar",
} as const;

export type HeaderAccountMenuVariant =
  (typeof HEADER_ACCOUNT_MENU_VARIANT)[keyof typeof HEADER_ACCOUNT_MENU_VARIANT];

export const HEADER_ACCOUNT_TRIGGER_LABEL = {
  Name: "name",
  Email: "email",
} as const;

export type HeaderAccountTriggerLabel =
  (typeof HEADER_ACCOUNT_TRIGGER_LABEL)[keyof typeof HEADER_ACCOUNT_TRIGGER_LABEL];

export const HEADER_NAV_ITEMS = [
  { label: "Pay", to: "/pay" },
] as const;

export const HOW_IT_WORKS_PATH = "/howitworks";
export const DOCS_PATH = "/docs";
export const STABLEFLOW_ABOUT_URL = "https://app.stableflow.ai/about";

export function isHeaderNavActive(pathname: string, to: string): boolean {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}
