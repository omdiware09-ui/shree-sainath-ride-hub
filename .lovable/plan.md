# Admin panel, test-ride booking, richer bike cards

## What you get

1. **Secure admin page** at `/admin` — sign in with your staff account, edit showroom info (name, tagline, phone, WhatsApp number, email, Instagram, address, hours) and manage the bike list (name, price, engine, mileage, photo, show/hide, order). Also see test-ride and enquiry submissions.
2. **Test Ride booking section** placed directly above Services on the home page — name, phone, bike, preferred date/time, message. Submissions are saved to the backend and visible in admin.
3. **Bike cards with photos** — each bike shows a real photo with price, cc and mileage floating over the image on a readable gradient overlay.
4. **Correct WhatsApp number** — all "Enquire on WhatsApp" buttons open a chat with +91 92899 22961, prefilled with the showroom name and the selected bike/service.
5. **Instagram** links point to `https://instagram.com/shree_sainath_hero`.
6. **Hero logo banner** in the top-left of the header, beside the "Shree Sainath Motors" wordmark.

## How it works

### Data
- New `site_settings` table (single row) holding all showroom contact/hours text, with public read access and staff-only write. The home page reads from it, falling back to the current constants if empty.
- Existing `bikes` table becomes the source of the "Bikes available now" grid (public read of active bikes; staff-only write). Seeded from the six bikes currently hard-coded, including image URLs.
- Test-ride bookings are stored in the existing `enquiries` table with `source = 'test_ride'`, using `preferred_date` / `preferred_time`.

### Access control
- `/admin` lives under an authenticated route gate; unauthenticated visitors are redirected to `/auth` (email + password sign-in, plus Google).
- Write access is enforced server-side via the existing `user_roles` + role-check function, not in the browser. A non-staff signed-in user sees "no access", and RLS blocks any write attempt regardless.
- You will need one staff account: sign up once, then I grant it the `admin` role.

### Public submit path
- Test-ride form posts through a server function that validates input with Zod and inserts the row, so no anonymous write access to the database is opened up.

### Front-end
- Bike photos: generated showroom-style images per model, stored in `src/assets` and referenced from the seeded bike rows; rendered through the existing lazy-loading image component with the overlay panel (price, cc, mileage) on top.
- Header logo: a compact Hero-style badge image beside the wordmark, with alt text.
- New routes: `/auth`, `/admin` (dashboard: settings, bikes, bookings tabs). Each gets its own metadata; `/admin` and `/auth` are `noindex`.

## Notes
- The floating detail overlay keeps WCAG-friendly contrast (dark gradient scrim behind light text) and the whole card stays keyboard reachable.
- The Instagram handle and phone number are applied everywhere they appear (header, contact block, footer, prefilled messages).
