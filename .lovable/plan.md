# Shree Sainath Motors — Website Plan

## Goal
Build a fast, SEO-friendly, mobile-first website for Shree Sainath Motors, an authorized Hero MotoCorp showroom in Paratwada. The site should turn local search traffic into showroom visits and inquiries.

## Pages & routes

```text
/                    Home (cinematic hero, featured bikes, offers, services, testimonials, contact)
/bikes               Bike models / inventory listing with filters
/bikes/$slug         Bike detail page (gallery, variants, specs, EMI, enquiry)
/compare             Side-by-side bike comparison
/services            Sales, finance, insurance, service center details
/book-test-ride      Test ride booking
/book-service        Service slot booking
/offers              Current offers and new launches
/gallery             Showroom and delivery gallery
/about               Team, credentials, and why choose us
/contact             Address, phone, WhatsApp, Instagram, email, hours, map, contact form
/admin               Staff dashboard (login protected)
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

7. **Admin dashboard (staff only, at `/admin`)**
   - Login-protected area, separate from the public site.
   - **Overview**: enquiry count, chatbot conversations, WhatsApp/call click-throughs, most-viewed bikes, upcoming service reminders due.
   - **Enquiries**: table of contact-form submissions with status (new / contacted / closed), search and filter, export to CSV.
   - **Customers**: name, phone, email, bike purchased, purchase date, last service date, next service due.
   - **Reminders**: view scheduled and sent reminder emails, resend or cancel one.
   - **Logs**: activity log of admin actions, email send results, chatbot errors, and failed form submissions.
   - **Bike catalog editor**: add/edit/hide bike models and prices without a code change.

8. **Automated email reminders**
   - Scheduled job runs daily and sends:
     - **Service reminders** — e.g. 30 days, 7 days, and on the due date before the next service.
     - **Follow-up mails** — thank-you after purchase, feedback request after a service visit.
     - **Insurance renewal reminders** — before the policy expiry date.
   - Each reminder is templated in the showroom's branding and includes call/WhatsApp buttons.
   - Duplicate-send protection: every reminder is recorded so a customer is never mailed twice for the same event.
   - Admin can pause the automation or edit templates from the dashboard.

## Premium features (inspired by leading automotive brand sites)

**Buying journey**
- **Book a test ride** — pick a bike, date, and time slot; confirmation email plus an entry in the admin dashboard.
- **Compare bikes** — select two or three models and see specs side by side.
- **On-road price estimator** — ex-showroom price plus RTO, insurance, and accessories, itemized.
- **Exchange / trade-in enquiry** — tell us your old bike and get a call back with an estimate.
- **Book a service slot** — pick a date and describe the issue; feeds the same reminder system.

**Presentation polish**
- **Cinematic hero** — full-bleed bike imagery with subtle parallax and a restrained scroll reveal.
- **Bike detail pages** — dedicated route per model with gallery, color-variant switcher, spec table, mileage and price highlights, and sticky enquiry bar.
- **Color variant switcher** — tap a swatch and the bike image changes.
- **Offers / launch banner** — highlight current festive offers and new arrivals.
- **Showroom gallery** — photos of the showroom, service bay, and delivery moments.
- **Customer testimonials + delivery wall** — real reviews and happy-delivery photos.
- **Counters** — bikes delivered, years in business, services completed.
- **Micro-interactions** — smooth hover states, magnetic CTA buttons, section reveals, and a sticky quick-action bar (Call · WhatsApp · Directions) on mobile.

**Trust & convenience**
- **Why choose us** — authorized Hero dealer, genuine parts, trained technicians, transparent pricing.
- **FAQ accordion** — finance documents, service intervals, warranty, timings.
- **Google reviews / ratings strip**.
- **Multi-language toggle** — English and Marathi for local customers.
- **Dark/light aware theming** built on the Charcoal & Ember tokens.

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
- **Motion**: Restrained and purposeful — no fade-in on every element.

## SEO & local search

- Unique `head()` metadata (title, description, og:title, og:description, og:type, twitter:card) on every route.
- Local business JSON-LD (`AutomotiveBusiness` or `MotorcycleDealer`) on `/contact` including phone, WhatsApp, email, and social profile.
- Semantic HTML, alt text on all images, responsive viewport.
- `public/robots.txt` already allows crawlers; add `sitemap.xml` server route.
- Content optimized for "Hero showroom Paratwada", "Hero bikes Paratwada", "Shree Sainath Motors".

## Security & compliance

- Admin area requires login; staff accounts only, no public signup.
- Roles stored in a dedicated roles table (never on the profile record) and checked server-side — no client-side or localStorage admin checks.
- Row-level security on every table so customers' data is only readable by authenticated staff.
- No hardcoded secrets; all keys read server-side only inside server function handlers.
- Contact form and chatbot input validated with Zod, with length caps and server-side abuse limits.
- Chatbot calls the AI provider only from the server; no AI key ever reaches the browser.
- Chatbot replies rendered as sanitized markdown — no raw HTML injection.
- The scheduled reminder endpoint verifies its caller credential before doing any work.
- Every email send and admin action is written to an audit log.
- WhatsApp, email, and map links use proper URL encoding.

### Human verification (reCAPTCHA)

- **Google reCAPTCHA v3** (invisible score-based) on every public submission: contact form, test-ride booking, service booking, exchange/finance enquiry, and the chatbot's first message per session.
- No puzzles or checkbox for genuine users — the widget runs silently and returns a score.
- The site key lives in the frontend; the secret key is stored securely and used only inside server code.
- Every submission is verified server-side before anything is saved or emailed: low-score or failed-token requests are rejected with a friendly "please try again" message and logged as a failed submission in the admin logs.
- Fallback: if the score is borderline, show a reCAPTCHA v2 checkbox challenge instead of rejecting outright, so real customers are never blocked.
- Combined with the existing Zod validation and per-IP rate limits, this stops spam bots from flooding enquiries and burning AI chatbot credits.
- Small "protected by reCAPTCHA" note with Google privacy/terms links, as Google requires.

## Assets needed

- Hero bike image (generate or use Hero MotoCorp approved imagery).
- Bike model images for inventory cards (generate realistic motorcycle studio shots).
- Showroom exterior/interior photo if available; otherwise generate a placeholder and note replacement.

## Technical notes

- Stack: TanStack Start + React 19 + Tailwind v4 + shadcn/ui components.
- Lovable Cloud provides the database, staff authentication, and scheduled jobs.
- Tables: `bikes`, `enquiries`, `customers`, `service_records`, `reminders`, `email_log`, `activity_log`, `chat_conversations`, `user_roles`.
- Public pages stay SSR and fast; the admin area sits behind an authenticated route group.
- Chatbot and contact form run through server functions backed by Lovable AI and Lovable Cloud.
- Reminder automation: a daily scheduled job hits a protected endpoint that queries due reminders and sends emails via Lovable Email.
- Map deep-link helper is a small client-side utility gated behind hydration.

## Assumptions (tell me if any are wrong)

- Staff accounts are created by you; there is no public registration.
- Reminder emails are sent from your showroom email address once the domain is verified.
- Default service interval is 90 days from the last service (adjustable in the admin settings).

## Launch checklist

- [ ] Provide real showroom phone, WhatsApp number, Instagram handle, email, address, and hours.
- [ ] Provide exact showroom coordinates (or Google Maps link) for the map deep-link.
- [ ] Create the first admin staff account.
- [ ] Provide Google reCAPTCHA site key and secret key (free, from google.com/recaptcha).
- [ ] Verify the sending email domain for reminder mails.
- [ ] Replace generated bike images with official Hero MotoCorp assets if available.
- [ ] Test the map link on both an iPhone and an Android device.
- [ ] Test contact form, chatbot, admin login, and a reminder send end-to-end.
- [ ] Run build and verify no lint/type errors.
