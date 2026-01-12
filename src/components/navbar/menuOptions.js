export const TOOLS_MENU_ITEMS = [
  { href: "/tools/calculators", label: "Financial Calculators" },
  { href: "/tools/financial-health", label: "Check Financial Health" },
  { href: "/performance/fund-performance", label: "Fund Performance" },
  { href: "/tools/pay-premium-online", label: "Pay Premium Online" },
  { href: "/tools/useful-links", label: "Useful Links" },
];

export const MAIN_MENU_ITEMS = [
  { href: "/", label: "Home", showChevron: true },
  { href: "/about-us", label: "About Us" },
  { href: "/gallery", label: "Gallery" },
  { key: "tools", label: "Tools", children: TOOLS_MENU_ITEMS },
  { key: "services", label: "Services", children: "services" },
  { href: "/contact-us", label: "Contact Us" },
];

