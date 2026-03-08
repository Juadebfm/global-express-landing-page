export const DASHBOARD_URL =
  import.meta.env.VITE_DASHBOARD_URL ||
  "https://app.globalexpress.kr";

export const CONTACT = {
  addresses: {
    nigeria: "58B Awoniyi Elemo Street, Ajao Estate Lagos",
    korea: "76-25 Daehwa-ro, Ilsanseo-gu Goyang-si, Gyeonggi-do (Bldg. B)",
  },
  phones: {
    korea: "+82 (0)70 4142 5371",
    nigeria: "+234 (0)906 000 0193",
    koreaRaw: "+8207041425371",
    nigeriaRaw: "+2349060000193",
  },
  email: "sales@globalexpress.kr",
};

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },

  { label: "Shipment Calculator", to: "/shipment-calculator" },
  { label: "Contact Us", to: "/contact" },
];

export const SERVICE_CARDS = [
  {
    stat: "15K",
    statValue: 15000,
    percentage: 75,
    subtitle: "CLIENT",
    title: "Logistics",
    description:
      "We're helping you move cargo across borders without the stress.",
  },
  {
    stat: "12K",
    statValue: 12000,
    percentage: 60,
    subtitle: "CLIENT",
    title: "Global Trade",
    description:
      "We're helping you connect your business to the world's biggest markets.",
  },
  {
    stat: "10M",
    statValue: 10000000,
    percentage: 50,
    subtitle: "CLIENT",
    title: "Clearing",
    description:
      "We're helping you bypass delays with expert local knowledge.",
  },
];

export const SOCIAL_LINKS = {
  youtube: "#",
  facebook: "#",
  twitter: "#",
  instagram: "#",
  linkedin: "#",
};
