import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BRAND, OPENING_HOURS } from "./data";

export const metadata: Metadata = {
  metadataBase: new URL("https://streetfades.ph"),
  title:
    "STREET FADES HAIR STUDIO \ud83d\udc88 | Pasig \u2013 24 Dr. Sixto Antonio Ave, 5.0 Rating (15 reviews)",
  description:
    "Street Fades Hair Studio \u2014 premium barbershop at 24 Dr. Sixto Antonio Avenue, Rosario, Pasig City 1609. Open daily 10:00 AM \u2013 9:30 PM. Rated 5.0 from 15 reviews. Signature fades from \u20b1399, BAPE Signature \u20b1599, 18-in-1 Ultimate Grooming \u20b1999, premium colour, perms and braids. Walk-ins welcome \u2014 call +63 967 453 1188.",
  keywords: [
    "barbershop Pasig",
    "hair studio Pasig",
    "skin fade Pasig",
    "barbershop near me",
    "Dr. Sixto Antonio Avenue barbershop",
    "premium haircut Philippines",
    "perm Pasig",
    "hair color Pasig",
    "braids Pasig",
  ],
  openGraph: {
    type: "website",
    title: "STREET FADES HAIR STUDIO \ud83d\udc88 | Pasig City",
    description:
      "PREMIUM CUTS. PREMIUM EXPERIENCE. \u2014 24 Dr. Sixto Antonio Avenue, Rosario, Pasig City. Open daily 10:00 AM \u2013 9:30 PM \u00b7 5.0 from 15 reviews \u00b7 Walk-ins welcome.",
    siteName: "Street Fades Hair Studio",
    locale: "en_PH",
    images: ["/images/logo-official.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "STREET FADES HAIR STUDIO \ud83d\udc88 | Pasig City",
    description:
      "Premium barbershop in Pasig. Open daily 10:00 AM \u2013 9:30 PM. 5.0 from 15 reviews. Walk-ins welcome.",
    images: ["/images/logo-official.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};


/* Local-business structured data. aggregateRating uses only the verified
   Setmore figures, never the marketing testimonials on the page. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: `${BRAND.name} ${BRAND.sub}`,
  description: BRAND.about,
  image: "/images/logo-official.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "24 Dr. Sixto Antonio Avenue",
    addressLocality: "Rosario, Pasig City",
    postalCode: "1609",
    addressRegion: "Metro Manila",
    addressCountry: "PH",
  },
  telephone: BRAND.phoneTel,
  email: BRAND.email,
  url: "https://streetfades.ph",
  hasMap: BRAND.googleMapsUrl,
  priceRange: "\u20b1\u20b1",
  currenciesAccepted: "PHP",
  sameAs: [BRAND.facebook, BRAND.tiktok],
  openingHoursSpecification: OPENING_HOURS.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.day,
    opens: "10:00",
    closes: "21:30",
  })),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: BRAND.rating,
    reviewCount: 15,
    bestRating: 5,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink text-white antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
