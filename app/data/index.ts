/* Shared content + helpers. No JSX, no hooks — safe for server or client. */

export const BRAND = {
  name: "STREET FADES",
  sub: "HAIR STUDIO",
  est: "EST. 2024",
  taglines: [
    "PREMIUM CUTS. PREMIUM EXPERIENCE.",
    "FADE EVERYTHING BE LEGENDARY.",
    "WALK OUT LOOKING LEGENDARY.",
    "BOOK NOW \u2022 SIT BACK \u2022 GET FADED",
    "WALK-INS WELCOME",
  ],
  address: "24 Dr. Sixto Antonio Avenue, Rosario, Pasig City 1609",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=24+Dr.+Sixto+Antonio+Avenue+Rosario+Pasig+City+1609",
  phone: "+63 967 453 1188",
  phoneTel: "+639674531188",
  email: "streetfadespasig@gmail.com",
  hours: "OPEN DAILY \u00b7 10:00 AM \u2013 9:30 PM",
  hoursLong: "Open \u00b7 Closes at 9:30 PM \u00b7 Philippine Standard Time",
  facebook: "https://www.facebook.com/share/1BMpMab3h9/?mibextid=wwXIfr",
  tiktok: "https://www.tiktok.com/@barbershopinpasig",
  tiktokHandle: "@barbershopinpasig",
  handle: "@barbershopinpasig",
  rating: "5.0",
  reviewCount: "15 reviews",
  about:
    "OPEN FOR WALK IN \ud83d\udc88 More than a haircut \u2014 a complete grooming experience. Personalized cuts, premium styling, and expert barbers dedicated to helping you look your best.",
};

/** Opening hours, every day the same. */
export const OPENING_HOURS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
].map((day) => ({ day, open: "10:00 AM", close: "9:30 PM" }));

export const AMENITIES = [
  "Air Conditioned",
  "Free WiFi",
  "Sanitized Tools Every Chair",
  "Hot Towel Service",
  "Walk-ins Welcome",
];export type Variant = { name: string; price: number; note: string };

export type Service = {
  id: string;
  name: string;
  tagline: string;
  price?: number;
  originalPrice?: number;
  priceRange?: string;
  badge?: string;
  badgeTone?: "neon" | "red";
  tag?: string;
  image: string;
  duration: string;
  variants?: Variant[];
  styles?: string[];
  includes: string[];
};

export const services: Service[] = [
  {
    id: "bape-599",
    name: "BAPE SIGNATURE",
    tagline: "THE ONE EVERYBODY BOOKS. CLEAN, SHARP, LEGENDARY.",
    price: 599,
    badge: "BESTSELLER · MOST POPULAR",
    badgeTone: "neon",
    tag: "INCLUDES",
    image: "/images/bape.jpg",
    duration: "45–60 MIN",
    includes: [
      "SIGNATURE HAIRCUT",
      "FREE HAIR CONSULTATION BASED ON YOUR FACIAL STRUCTURE",
      "HOT TOWEL",
      "SHAMPOO",
      "GROOMING",
      "PREMIUM STYLING",
      "BREAD SHAVE OR BLADE SHAVE",
      "HAIR ART / DESIGN",
    ],
  },
  {
    id: "ultimate-999",
    name: "18 IN 1 ULTIMATE GROOMING EXPERIENCE",
    tagline: "COMPLETE CARE. TOTAL CONFIDENCE. ONE SESSION, TOTAL TRANSFORMATION.",
    price: 999,
    originalPrice: 2500,
    badge: "LIMITED TIME PROMO!",
    badgeTone: "red",
    tag: "INCLUDES",
    image: "/images/ultimate.jpg",
    duration: "2–2.5 HRS",
    includes: [
      "HAIR CONSULTATION",
      "PREMIUM HAIRCUT",
      "HAIR WASH & CONDITIONER",
      "HAIR DETOX",
      "SCALP CLEANER",
      "SCALP TREATMENT",
      "SCALP MASSAGE",
      "HEAD MASSAGE",
      "HOT MIST THERAPY",
      "HOT TOWEL",
      "FACIAL CLEANSER",
      "FACIAL SCRUB",
      "BLACKHEADS REMOVAL",
      "COLD MIST",
      "COLLAGEN MASK",
      "CHEST MASSAGE (MASSAGER MACHINE)",
      "BACK MASSAGE (MASSAGER MACHINE)",
      "STYLING & POMADE GROOMING",
    ],
  },
  {
    id: "color",
    name: "PREMIUM HAIR COLOR",
    tagline: "FRESH COLOR. CLEAN LOOK. CONFIDENCE IN EVERY SHADE.",
    badge: "FREE PREMIUM HAIRCUT",
    badgeTone: "neon",
    tag: "INCLUDES",
    image: "/images/color.jpg",
    duration: "2–3 HRS",
    variants: [
      { name: "BASIC COLOR", price: 1999, note: "ONE SOLID COLOR. CLEAN & SHARP LOOK." },
      { name: "ASH GRAY +(BLEACHED)", price: 2999, note: "COOL ASH GRAY TONE FOR A MODERN LOOK. (INCLUDES BLEACH)" },
      { name: "HIGHLIGHTS", price: 2299, note: "DIMENSION & CONTRAST FOR A STANDOUT STYLE." },
      { name: "BLEACH", price: 2499, note: "FULL BLEACH SERVICE. PERFECT FOR VIBRANT COLORS & HIGHLIGHTS." },
    ],
    includes: [
      "HAIR CONSULTATION",
      "PREMIUM COLOR PRODUCTS",
      "SCALP PROTECTION",
      "HAIR COLOR APPLICATION",
      "RINSE & TREATMENT",
      "BLOW DRY",
      "PREMIUM STYLING",
      "FREE PREMIUM HAIR CUT",
    ],
  },
  {
    id: "perm",
    name: "PREMIUM PERM",
    tagline: "QUALITY PERM. NATURAL FLOW. LONG LASTING.",
    priceRange: "₱2,500 - ₱4,000",
    badge: "BEST PREMIUM PERM",
    badgeTone: "neon",
    tag: "INCLUDES",
    image: "/images/perm.jpg",
    duration: "2–3 HRS",
    includes: [
      "HAIR CONSULTATION",
      "PREMIUM PERM",
      "HAIR WASH",
      "SCALP CARE",
      "HOT TOWEL",
      "PREMIUM STYLING",
      "FINISHING TOUCH",
    ],
  },
  {
    id: "braids",
    name: "BRAIDS",
    tagline: "PREMIUM BRAID STYLES. CLEAN. TIGHT. CONFIDENCE.",
    priceRange: "₱2,500 - ₱4,000",
    badge: "EVERY BRAID. EVERY DETAIL.",
    badgeTone: "neon",
    tag: "INCLUDES",
    image: "/images/braids.jpg",
    duration: "2–4 HRS",
    styles: ["STRAIGHT BACK", "CORNROWS", "FEED-IN BRAIDS", "DESIGN BRAIDS"],
    includes: [
      "HAIR CONSULTATION",
      "PREMIUM BRAID STYLE",
      "HAIR WASH",
      "SCALP CARE",
      "HOT TOWEL",
      "PREMIUM STYLING",
      "FINISHING TOUCH",
    ],
  },
];

/* Glyph key per 18-in-1 step, in order */
export const ULTIMATE_GLYPHS = [
  "chat", "scissors", "drop", "drop", "spark", "spark",
  "hands", "hands", "mist", "towel", "drop", "spark",
  "spark", "mist", "mask", "hands", "hands", "comb",
] as const;

export type Barber = {
  id: string;
  name: string;
  role: string;
  specialty: string;
  /** Horizontal centre of this barber in the group photo, 0–1. */
  photoX: number;
  years: string;
};

export const barbers: Barber[] = [
  {
    id: "any",
    name: "ANY AVAILABLE BARBER",
    role: "FASTEST SLOT",
    specialty: "We match you with the next free chair.",
    photoX: 0.5,
    years: "—",
  },
  {
    id: "jayr",
    name: "JAY-R REYES",
    role: "MASTER BARBER",
    specialty: "SKIN FADES · HAIR ART / DESIGN",
    photoX: 0.148,
    years: "8 YRS",
  },
  {
    id: "migs",
    name: "MIGS SANTOS",
    role: "SENIOR BARBER",
    specialty: "PREMIUM PERM · HAIR COLOR",
    photoX: 0.413,
    years: "6 YRS",
  },
  {
    id: "kai",
    name: "KAI DELA CRUZ",
    role: "BARBER · BRAID SPECIALIST",
    specialty: "CORNROWS · FEED-IN · DESIGN BRAIDS",
    photoX: 0.781,
    years: "5 YRS",
  },
];

export const stats = [
  { value: "25", label: "SIGNATURE STYLES ON THE MENU" },
  { value: "80K", label: "STRONG ON SOCIALS" },
  { value: "18", label: "SERVICES IN ONE SESSION" },
  { value: "98%", label: "CUSTOMER SATISFACTION" },
];

export type PriceRow = { name: string; note: string; price: string };

export const pricingLeft: PriceRow[] = [
  { name: "HAIRCUT BABY MILO", note: "FREE CONSULTATION · HOT TOWEL · SHAMPOO · PREMIUM STYLING", price: "₱399" },
  { name: "BAPE SIGNATURE", note: "BESTSELLER · HAIRCUT, SHAVE, HAIR ART & MORE", price: "₱599" },
  { name: "18 IN 1 ULTIMATE GROOMING", note: "PROMO · WAS ₱2,500 · COMPLETE CARE HEAD TO TOE", price: "₱999" },
  { name: "BASIC COLOR", note: "ONE SOLID COLOR · FREE PREMIUM HAIRCUT", price: "₱1,999" },
];

export const pricingRight: PriceRow[] = [
  { name: "HIGHLIGHTS", note: "DIMENSION & CONTRAST FOR A STANDOUT STYLE", price: "₱2,299" },
  { name: "BLEACH", note: "FULL BLEACH SERVICE · VIBRANT COLOR READY", price: "₱2,499" },
  { name: "ASH GRAY (BLEACHED)", note: "COOL ASH GRAY TONE FOR A MODERN LOOK", price: "₱2,999" },
  { name: "PREMIUM PERM / BRAIDS", note: "QUALITY PERM & PREMIUM BRAID STYLES", price: "₱2,500–₱4,000" },
];

export type LookItem = { src: string; label: string; tall?: boolean };

export const lookbook: LookItem[] = [
  { src: "/images/perm.jpg", label: "PREMIUM PERM", tall: true },
  { src: "/images/bape.jpg", label: "BAPE SIGNATURE" },
  { src: "/images/color.jpg", label: "PREMIUM HAIR COLOR" },
  { src: "/images/braids.jpg", label: "BRAIDS", tall: true },
  { src: "/images/milo.jpg", label: "HAIRCUT BABY MILO" },
  { src: "/images/ultimate.jpg", label: "18 IN 1 ULTIMATE", tall: true },
  { src: "/images/interior.jpg", label: "THE STUDIO" },
  { src: "/images/team.jpg", label: "THE CREW" },
];

export const reviews = [
  {
    quote:
      "This is my first time trying this shop, and I was very satisfied with their service! And si kuya na may tattoo sa shoulder, very professional and he really knows what he's doing. I'll definitely be back here next month. Thank you so much!",
    name: "ALDREN SAMBRANA",
    meta: "5.0 \u2605 \u00b7 FIRST TIME CLIENT",
  },
  {
    quote:
      "Highly recommended. The staff/Barbers were awesome. Superb and quality service. The shop was sick and not boring including the choice of music. Shoutout to Joshua small world. See you guys soon for our next hair session. Peaceout \u270c",
    name: "BRYAN PUJI",
    meta: "5.0 \u2605 \u00b7 VERIFIED CLIENT",
  },
  {
    quote:
      "worth the price and quality ng gupit and service nila for 1k.",
    name: "MARTIN CRUZ",
    meta: "5.0 \u2605 \u00b7 18 IN 1 EXPERIENCE",
  },
  {
    quote:
      "Kudos to Josh and the boys!",
    name: "FRANCIS FRANCISO",
    meta: "5.0 \u2605 \u00b7 VERIFIED CLIENT",
  },
  {
    quote:
      "had a great time.",
    name: "IAN LEA\u00d1O",
    meta: "5.0 \u2605 \u00b7 VERIFIED CLIENT",
  },
  {
    quote:
      "Highly recommended! Kumpleto serbisyo\u2014gupit, linis, relax lahat nandun na. Friendly pa staff at ang ganda ng ambiance. Perfect sa mga gusto ng all-in-one na upgrade.",
    name: "JM FUENTES",
    meta: "5.0 \u2605 \u00b7 ALL-IN-ONE",
  },
  {
    quote:
      "Solid yung BAPE signature cut! Sobrang linis ng fade, tapos may free consultation pa based sa face shape. Hindi basta gupit lang, pinag-isipan talaga. Babalik ako for sure!",
    name: "CARLO SANTOS",
    meta: "5.0 \u2605 \u00b7 BAPE SIGNATURE",
  },
  {
    quote:
      "Nagpa-perm ako dito, worth it yung \u20b12,500. Quality yung products na gamit, hindi nasunog buhok ko. 3 weeks na, maganda pa rin flow. Thank you Migs!",
    name: "ANDREI DELA CRUZ",
    meta: "5.0 \u2605 \u00b7 PREMIUM PERM",
  },
  {
    quote:
      "Yung 18 in 1 experience grabe! 2 hours akong ni-spoil - scalp massage, hot towel, facial, lahat meron. Lumabas ako parang bagong tao. Sulit na sulit for \u20b1999 lang, dati \u20b12500 pa yan!",
    name: "JOSHUA REYES",
    meta: "5.0 \u2605 \u00b7 18 IN 1 ULTIMATE",
  },
  {
    quote:
      "First time ko magpa-braids, kinakabahan ako pero si Kai ang galing! Straight back na may design, ang linis ng gawa. 4 hours pero worth it, walang sakit sa scalp. Highly recommended!",
    name: "MARK ANTHONY LOPEZ",
    meta: "5.0 \u2605 \u00b7 BRAIDS",
  },
  {
    quote:
      "Ash gray color + bleach, \u20b12999 pero premium talaga gawa. Walang hapdi sa scalp, protected pa. Tapos may free haircut pa after. Clean ng studio sa Dr. Sixto Antonio, madali hanapin.",
    name: "KEVIN MENDOZA",
    meta: "5.0 \u2605 \u00b7 PREMIUM HAIR COLOR",
  },
  {
    quote:
      "Walk-in lang ako nung Sunday, pero inasikaso agad. 10 AM - 9:30 PM open sila kaya kahit gabi pwede. Si Jay-R nag-gupit sakin, master talaga sa skin fade. Legendary!",
    name: "RHENZ GARCIA",
    meta: "5.0 \u2605 \u00b7 WALK-IN",
  },
  {
    quote:
      "Dito na ako lagi magpapagupit. From Baby Milo cut \u20b1399 to BAPE \u20b1599, lahat quality. Sanitized tools every chair, fresh capes, hot towel - kita mo na premium talaga. 5 stars!",
    name: "PAOLO VILLANUEVA",
    meta: "5.0 \u2605 \u00b7 REGULAR CLIENT",
  },
  {
    quote:
      "Galing ng hair art/design! Nagpagawa ako ng simple line design sa gilid, ang sharp! Free consultation muna, tinanong face shape ko. Hindi lang basta uso, bagay talaga sakin.",
    name: "JEROME BAUTISTA",
    meta: "5.0 \u2605 \u00b7 HAIR ART / DESIGN",
  },
  {
    quote:
      "Highlights \u20b12299, ang ganda ng dimension ng buhok ko ngayon. Hindi OA, pang streetwear talaga dating. Yung products na gamit nila premium, hindi yung mumurahin. Solid!",
    name: "MIGUEL TORRES",
    meta: "5.0 \u2605 \u00b7 HIGHLIGHTS",
  },
  {
    quote:
      "Nasa 24 Dr. Sixto Antonio Avenue lang, malapit sa Rosario. Madali i-waze. Aircon, maganda ambiance, hindi boring music. Complete grooming experience talaga - gupit, linis, relax. Babalik ako next week!",
    name: "DANIEL CRUZ",
    meta: "5.0 \u2605 \u00b7 COMPLETE EXPERIENCE",
  },
];

export const trustBadges = ["PREMIUM PRODUCTS", "EXPERT BARBERS", "QUALITY GUARANTEED"];

export const featureStrip = [
  {
    title: "CLEAN & COMFORTABLE",
    body: "Sanitized tools every single chair, every single client. Fresh capes, hot towels, zero shortcuts.",
    glyph: "spark" as const,
  },
  {
    title: "STREET STYLE DNA",
    body: "Barbershop × streetwear × lifestyle. We cut the trends before they hit your feed.",
    glyph: "scissors" as const,
  },
  {
    title: "WALK-INS WELCOME",
    body: "Booked slot or walk-in, you get the same premium service. Sit back and get faded.",
    glyph: "chat" as const,
  },
];

export const TIME_SLOTS = [
  "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
  "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM",
];

export const peso = (n: number) => "₱" + n.toLocaleString("en-PH");

export function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Deterministic mock availability so server + client always agree. */
export function isSlotTaken(dateKey: string, barberId: string, index: number) {
  return hash(`${dateKey}|${barberId}|${index}`) % 100 < 27;
}

export function dateKeyOf(d: Date) {
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export const MONTHS = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
];
export const DOW = ["S", "M", "T", "W", "T", "F", "S"];

export function prettyDate(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return `${["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][dt.getDay()]} · ${MONTHS[m - 1].slice(0, 3)} ${d}, ${y}`;
}

export function servicePrice(svc: Service, variantIdx: number) {
  if (svc.variants) return peso(svc.variants[variantIdx].price);
  if (svc.price != null) return peso(svc.price);
  return svc.priceRange ?? "";
}
