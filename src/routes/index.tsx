import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, Instagram, MapPin, Clock, Bike, Wrench, ShieldCheck, BadgeIndianRupee } from "lucide-react";

import heroBike from "@/assets/hero-bike.jpg";
import showroomPhoto from "@/assets/showroom.jpg";
import { AppImage } from "@/components/AppImage";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SHOWROOM, BIKES, SERVICES, mapsUrl } from "@/lib/showroom";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shree Sainath Motors — Hero Bikes in Paratwada" },
      {
        name: "description",
        content:
          "Shree Sainath Motors is the authorized Hero MotoCorp showroom in Paratwada — new bikes, finance, insurance and genuine servicing. Chat on WhatsApp today.",
      },
      { property: "og:title", content: "Shree Sainath Motors — Hero Bikes in Paratwada" },
      {
        property: "og:description",
        content:
          "Authorized Hero MotoCorp showroom in Paratwada. Explore bikes, get finance help and book a service.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SERVICE_ICONS = [Bike, BadgeIndianRupee, ShieldCheck, Wrench];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <a href="#main" className="font-display text-base font-extrabold sm:text-lg">
            Shree Sainath <span className="text-primary">Motors</span>
          </a>
          <nav aria-label="Quick contact" className="flex items-center gap-1">
            <a
              href={`tel:${SHOWROOM.phone}`}
              aria-label="Call the showroom"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-foreground hover:bg-secondary"
            >
              <Phone aria-hidden="true" className="size-5" />
            </a>
            <a
              href={`mailto:${SHOWROOM.email}`}
              aria-label="Email the showroom"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-foreground hover:bg-secondary"
            >
              <Mail aria-hidden="true" className="size-5" />
            </a>
            <a
              href={SHOWROOM.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram profile of Shree Sainath Motors"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-foreground hover:bg-secondary"
            >
              <Instagram aria-hidden="true" className="size-5" />
            </a>
            <WhatsAppButton className="hidden sm:inline-flex" subject="Hero bikes and offers" />
          </nav>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section className="border-b border-border">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Paratwada · Amravati
              </p>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
                {SHOWROOM.name} — {SHOWROOM.tagline}
              </h1>
              <p className="mt-5 max-w-xl text-base text-muted-foreground">
                New Hero bike sales, on-the-spot finance, insurance renewals and genuine-parts
                servicing — all under one roof.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#bikes"
                  className="inline-flex min-h-11 items-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Explore Bikes
                </a>
                <a
                  href="#visit"
                  className="inline-flex min-h-11 items-center rounded-md border border-border px-5 text-sm font-semibold hover:bg-secondary"
                >
                  Visit Showroom
                </a>
                <WhatsAppButton variant="outline" subject="a new Hero bike enquiry" />
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <AppImage
                src={heroBike}
                alt="Hero motorcycle displayed under warm showroom lighting"
                width={1536}
                height={1024}
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
              />
            </div>
          </div>
        </section>

        {/* Bikes */}
        <section id="bikes" className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-bold">Bikes available now</h2>
          <p className="mt-2 text-muted-foreground">
            Tap “Enquire on WhatsApp” and your message arrives pre-filled with the model name.
          </p>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BIKES.map((bike) => (
              <li
                key={bike.slug}
                className="flex flex-col rounded-xl border border-border bg-card p-5"
              >
                <h3 className="text-lg font-bold">{bike.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {bike.cc} · {bike.mileage}
                </p>
                <p className="mt-4 text-xl font-bold text-primary">{bike.price}</p>
                <p className="text-xs text-muted-foreground">Ex-showroom, starting price</p>
                <WhatsAppButton
                  className="mt-5 w-full"
                  subject={bike.name}
                  label="Enquire on WhatsApp"
                />
              </li>
            ))}
          </ul>
        </section>

        {/* Services */}
        <section id="services" className="border-y border-border bg-card/40">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="text-3xl font-bold">Services</h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {SERVICES.map((service, i) => {
                const Icon = SERVICE_ICONS[i] ?? Bike;
                return (
                  <li key={service.title} className="rounded-xl border border-border bg-card p-6">
                    <Icon aria-hidden="true" className="size-6 text-primary" />
                    <h3 className="mt-4 text-lg font-bold">{service.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
                    <WhatsAppButton
                      className="mt-5"
                      variant="outline"
                      subject={service.subject}
                      label={`WhatsApp about ${service.title}`}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Visit / contact */}
        <section id="visit" className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">Visit our showroom</h2>
              <address className="mt-6 space-y-4 not-italic text-sm">
                <p className="flex gap-3">
                  <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span>{SHOWROOM.address}</span>
                </p>
                <p className="flex gap-3">
                  <Clock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span>{SHOWROOM.hours}</span>
                </p>
                <p className="flex gap-3">
                  <Phone aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
                  <a className="underline underline-offset-4" href={`tel:${SHOWROOM.phone}`}>
                    {SHOWROOM.phone}
                  </a>
                </p>
                <p className="flex gap-3">
                  <Mail aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
                  <a className="underline underline-offset-4" href={`mailto:${SHOWROOM.email}`}>
                    {SHOWROOM.email}
                  </a>
                </p>
              </address>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => window.open(mapsUrl(), "_blank", "noopener,noreferrer")}
                  className="inline-flex min-h-11 items-center rounded-md border border-border px-5 text-sm font-semibold hover:bg-secondary"
                >
                  Get Directions
                </button>
                <WhatsAppButton subject="visiting the showroom" label="Chat before you visit" />
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <AppImage
                src={showroomPhoto}
                alt="Interior of the Shree Sainath Motors showroom with bikes on display"
                width={1536}
                height={1024}
                sizes="(min-width: 1024px) 560px, 100vw"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} {SHOWROOM.name}, Paratwada. Authorized Hero MotoCorp dealer.
      </footer>

      {/* Floating WhatsApp CTA */}
      <WhatsAppButton
        className="fixed bottom-5 right-5 z-50 shadow-lg"
        subject="Hero bikes and services"
        label="WhatsApp"
      />
    </div>
  );
}
