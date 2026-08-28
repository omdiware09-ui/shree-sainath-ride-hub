export const SHOWROOM = {
  name: "Shree Sainath Motors",
  tagline: "Authorized Hero MotoCorp Showroom, Paratwada",
  phone: "+91  92899 22961 ",
  whatsapp: "919999999999",
  email: "shreesainathmotors@gmail.com",
  instagram: "https://instagram.com/shreesainathmotors",
  address: "Plot No 01, Amravati Rd, opposite Railway Station, Narayanpur, Harde Nagar, Amravati, Achalpur, Maharashtra 444806",
  hours: "Mon – Sat, 9:30 AM – 8:30 PM · Sunday, 10:00 AM – 8:30 PM",
  mapQuery: "Shree Sainath Motors, Paratwada, Amravati, Maharashtra",
} as const;

/**
 * Builds a WhatsApp click-to-chat URL with a prefilled message that always
 * names the showroom and the selected service / bike.
 */
export function whatsappUrl(subject?: string): string {
  const message = subject
    ? `Hello ${SHOWROOM.name}, I am interested in ${subject}. Please share more details.`
    : `Hello ${SHOWROOM.name}, I would like to know more about your bikes and services.`;
  return `https://wa.me/${SHOWROOM.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function mapsUrl(): string {
  const q = encodeURIComponent(SHOWROOM.mapQuery);
  if (typeof navigator !== "undefined") {
    const ua = navigator.userAgent;
    const isApple = /iPhone|iPad|iPod|Macintosh/.test(ua);
    if (isApple) return `https://maps.apple.com/?q=${q}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export const BIKES = [
  { slug: "splendor-plus", name: "Hero Splendor Plus", price: "₹ 79,900", cc: "97.2 cc", mileage: "70 kmpl" },
  { slug: "passion-pro", name: "Hero Passion Pro", price: "₹ 84,500", cc: "113 cc", mileage: "64 kmpl" },
  { slug: "glamour", name: "Hero Glamour", price: "₹ 89,300", cc: "124.7 cc", mileage: "63 kmpl" },
  { slug: "xtreme-160r", name: "Hero Xtreme 160R", price: "₹ 1,29,500", cc: "163 cc", mileage: "45 kmpl" },
  { slug: "xpulse-200", name: "Hero XPulse 200 4V", price: "₹ 1,52,000", cc: "199.6 cc", mileage: "40 kmpl" },
  { slug: "destini-125", name: "Hero Destini 125", price: "₹ 81,700", cc: "124.6 cc", mileage: "55 kmpl" },
] as const;

export const SERVICES = [
  {
    title: "New Bike Sales",
    description: "Full Hero MotoCorp line-up in stock with transparent on-road pricing and quick delivery.",
    subject: "buying a new Hero bike",
  },
  {
    title: "Finance Assistance",
    description: "Low down-payment loan options from partner banks and NBFCs, approved in a single visit.",
    subject: "bike finance assistance",
  },
  {
    title: "Insurance Renewal",
    description: "New policies and hassle-free renewals with instant documentation at the counter.",
    subject: "insurance renewal",
  },
  {
    title: "Service & Repairs",
    description: "Hero-trained technicians, genuine spare parts and same-day periodic servicing.",
    subject: "bike service and repairs",
  },
] as const;
