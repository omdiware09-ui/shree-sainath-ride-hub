# Shree Sainath Motors — Website Plan

## Goal
Build a fast, SEO-friendly, mobile-first website for Shree Sainath Motors, an authorized Hero MotoCorp showroom in Paratwada. The site should turn local search traffic into showroom visits and inquiries.

## Pages & routes

```text
/              Home (split-screen hero, featured bikes, services, contact CTA)
/bikes         Bike models / inventory listing
/services      Sales, finance, insurance, service center details
/contact       Address, phone, WhatsApp, Instagram, email, hours, map, contact form
```

## Sections to build (per user selection)

1. **Hero / showroom intro**
   - Split-screen layout: showroom identity and CTA on the left, featured Hero bike visual on the right.
   - Headline: "Shree Sainath Motors — Authorized Hero MotoCorp Showroom, Paratwada"
   - Subheadline: new-bike sales, finance, insurance, servicing.
   - CTAs: "Explore Bikes", "Visit Showroom", "WhatsApp Us".
   - Sticky header with quick contact: phone, WhatsApp, Instagram, email icons.

2. **Bike models / inventory**
   - Grid of Hero bikes available at the showroom.
   - Each card: bike image, name, starting price, engine/cc, mileage, key color variants, "View Details" / "Enquire Now" buttons.
   - Enquiry CTA pre-fills WhatsApp message with bike name.
   - Data sourced from a local static data file (no backend required for launch).

3. **Services**
   - Four service blocks: New Bike Sales, Finance Assistance, Insurance Renewal, Service & Repairs.
   - Each block: icon, short description, key benefit, CTA.
   - CTAs link to WhatsApp or contact form with pre-selected service interest.

4. **Contact / visit us**
   - Full address, phone, WhatsApp number, Instagram handle, email, business hours.
   - Clickable WhatsApp link with pre-filled greeting.
   - Clickable Instagram profile link.
   - Clickable email mailto link and phone tel link.
   - Contact form: name, phone, bike/service interest, message.
   - Form submissions handled via a secure server function (no exposed API keys).

5. **Map location with smart deep-link**
   - Embedded map preview of the Paratwada showroom location.
   - Clicking the map (or the "Get Directions" button) detects the device and opens the right app:
     - iOS / macOS: Apple Maps (`maps://` / `https://maps.apple.com/?q=...`)
     - Android and desktop: Google Maps (`https://www.google.com/maps/search/?api=1&query=...`)
   - Detection runs client-side only (after hydration) so SSR stays stable.
   - Fallback to Google Maps web if detection is inconclusive.

6. **AI chatbot assistant**
   - Floating chat bubble available on every page, styled in the Charcoal & Ember theme.
   - Answers visitor questions about bike models, prices, finance, insurance, service, showroom hours, and location.
   - Grounded in the site's own bike and service data plus showroom contact details, so it does not invent facts.
   - Escalation: offers a "Chat on WhatsApp" or "Call showroom" button when it cannot answer.
   - Powered by Lovable Cloud + Lovable AI (no external API keys for you to manage).


## Design system

- **Palette**: Charcoal & Ember
  - Background: `#1a1a1a`
  - Surface: `#2d2d2d`
  - Muted: `#4a4a4a`
  - Accent: `#e85d3a`
  - Text: white/off-white on dark.
- **Typography**: Urbanist (headings) + Epilogue (body).
- **Layout**: Split-screen hero; full-width bands for bikes, services, and contact.
- **Radius / spacing**: Modern, generous whitespace, sharp but polished cards, Ember accent on CTAs.

## SEO & local search

- Unique `head()` metadata (title, description, og:title, og:description, og:type, twitter:card) on every route.
- Local business JSON-LD (`AutomotiveBusiness` or `MotorcycleDealer`) on `/contact` including phone, WhatsApp, email, and social profile.
- Semantic HTML, alt text on all images, responsive viewport.
- `public/robots.txt` already allows crawlers; add `sitemap.xml` server route.
- Content optimized for "Hero showroom Paratwada", "Hero bikes Paratwada", "Shree Sainath Motors".

## Security & compliance

- No hardcoded secrets; any third-party keys read server-side only inside `createServerFn` handlers.
- Contact form and chatbot input validated with Zod, with length caps and server-side abuse limits.
- Chatbot calls the AI provider only from the server; no AI key ever reaches the browser.
- Chatbot replies rendered as sanitized markdown — no raw HTML injection.
- WhatsApp, email, and map links use proper URL encoding.
- No auth/roles required for a public showroom site.

## Assets needed

- Hero bike image (generate or use Hero MotoCorp approved imagery).
- Bike model images for inventory cards (generate realistic motorcycle studio shots).
- Showroom exterior/interior photo if available; otherwise generate a placeholder and note replacement.

## Technical notes

- Stack: TanStack Start + React 19 + Tailwind v4 + shadcn/ui components.
- Bike inventory and showroom contact details live in typed data files (`src/data/bikes.ts`, `src/data/showroom.ts`).
- Contact form uses `createServerFn`; chatbot uses a `createServerFn` streaming/chat handler backed by Lovable AI.
- Lovable Cloud is enabled to power the chatbot backend and store contact enquiries.
- Map deep-link helper is a small client-side utility gated behind hydration.
- All content routes are SSR for fast first paint and SEO.

## Launch checklist

- [ ] Provide real showroom phone, WhatsApp number, Instagram handle, email, address, and hours.
- [ ] Provide exact showroom coordinates (or Google Maps link) for the map deep-link.
- [ ] Replace generated bike images with official Hero MotoCorp assets if available.
- [ ] Test the map link on both an iPhone and an Android device.
- [ ] Test contact form and chatbot end-to-end.
- [ ] Run build and verify no lint/type errors.
