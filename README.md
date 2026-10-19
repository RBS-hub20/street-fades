# STREET FADES HAIR STUDIO

Mobile-first booking site for Street Fades Hair Studio — Next.js 14 (App Router) + Tailwind CSS,
no external UI libraries.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Where things live

Everything that renders the page is in [`app/page.tsx`](app/page.tsx), one file, in this order:

| Region | What it holds |
| --- | --- |
| `BRAND` | Name, taglines, socials, hours, address, phone |
| `services` | The 5 bookable services, prices, variants and inclusions |
| `barbers`, `stats`, `pricingLeft/Right`, `lookbook`, `reviews` | Section content |
| `TIME_SLOTS` | Bookable hours (10:00 AM – 9:00 PM) |
| Components | `Header`, `Hero`, `Services`, `Pricing`, `Lookbook`, `Barbers`, `Testimonials`, `Footer` |
| `BookingModal` | The 4-step flow: service → barber → date & time → details → success |

Colours and fonts are tokens in [`tailwind.config.ts`](tailwind.config.ts):
`ink #050505`, `card #121212`, `cardhi #1A1A1A`, `line #232323`, `muted #8A8A8A`,
`neon #7ED321`, `blood #E11D48`. Headings use Anton / Bebas Neue, body uses Inter.

## Content taken from the posters

Prices, inclusions, colour variants and braid styles are transcribed from the shop's
own posters: BAPE ₱599, 18-in-1 ₱999 (was ₱2,500), colour ₱1,999 / ₱2,299 / ₱2,499 / ₱2,999,
perm and braids ₱2,500 – ₱4,000, Baby Milo ₱399.

Baby Milo appears in the pricing list and as a card in the services grid, but is not one of
the five bookable services in the modal — the brief fixed that list at five. Add it to
`services` if you want it bookable.

## Placeholders to replace

- **Barber names and bios** — `barbers` in `app/page.tsx`. Photos are cropped out of
  `public/images/team.jpg` by `BarberPhoto`; give each barber their own headshot and the
  crop logic can go.
- **Stats** (25 / 80K / 18 / 98%) — `stats`. The numbers came from the layout brief; the
  labels are written to be defensible, but check them before launch.
- **Testimonials** — `reviews`. Written as realistic placeholders, not real customers.
- **Address and phone** — `BRAND.address`, `BRAND.phone`.

## Booking is front-end only

`BookingModal` holds everything in `useState` and confirms locally — nothing is sent anywhere
and no slots are persisted. Availability in step 3 is mocked by `isSlotTaken()`, a hash of
date + barber + slot index, so it is stable between server render and client render instead
of flickering on hydration.

To make it real, POST the booking state from `confirm()` in `BookingModal` to your backend
(or a Facebook/Messenger handoff) and replace `isSlotTaken` with a fetch of actual availability.
