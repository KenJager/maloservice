"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Phone, Mail, Navigation } from "lucide-react";
import { agencies } from "@/lib/data";
import type { MapPoint } from "./LocalisationMap";

const LocalisationMap = dynamic(() => import("./LocalisationMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-base-200">
      <span className="loading loading-spinner loading-md text-primary" />
    </div>
  ),
});

type Agency = (typeof agencies)[number] & { lat?: number; lng?: number };

// Repli par ville si l'agence n'a pas de lat/lng dans lib/data (centres-villes approximatifs)
const CITY_COORDS: Record<string, [number, number]> = {
  douala: [4.0511, 9.7679],
  bafoussam: [5.4737, 10.4179],
};

function getCoords(a: Agency): [number, number] {
  if (typeof a.lat === "number" && typeof a.lng === "number") return [a.lat, a.lng];
  const hay = `${a.name} ${a.address}`.toLowerCase();
  for (const [city, c] of Object.entries(CITY_COORDS)) {
    if (hay.includes(city)) return c;
  }
  return CITY_COORDS.douala;
}

export default function Localisation() {
  const [active, setActive] = useState(0);

  if (!agencies.length) return null;

  const list = agencies as Agency[];
  const points: MapPoint[] = list.map((a) => {
    const [lat, lng] = getCoords(a);
    return { name: a.name, lat, lng };
  });
  const current = list[active];
  const { lat, lng } = points[active];
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <section className="border-t border-base-300 bg-base-200/60 py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-[clamp(1rem,4vw,3rem)]">
        <div className="grid items-stretch gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Texte + agences */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="badge badge-outline mb-4 gap-2 border-primary/40 bg-primary/10 px-3 py-3 text-primary">
              <MapPin className="h-3.5 w-3.5" />
              <span className="text-xs font-semibold uppercase tracking-wide">
                Nous trouver
              </span>
            </div>

            <h2 className="text-balance text-2xl font-extrabold leading-tight tracking-tight text-base-content sm:text-3xl lg:text-4xl">
              Au plus près de <span className="text-secondary">vos sites</span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-base-content/70 sm:text-base">
              Nos équipes interviennent depuis nos agences pour répondre rapidement à
              vos besoins, où que se trouve votre site de production.
            </p>

            <div role="tablist" aria-label="Choisir une agence" className="mt-6 flex flex-col gap-3 sm:mt-8">
              {list.map((a, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={a.name}
                    className={`overflow-hidden rounded-md bg-base-100 border border-base-300 transition-colors`}
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActive(i)}
                      className="flex w-full items-center gap-3 p-4 text-left"
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md transition-colors bg-secondary/10`}
                      >
                        <MapPin className="h-5 w-5 text-secondary" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-bold text-base-content">{a.name}</span>
                        <span className="block truncate text-sm text-base-content/60">
                          {a.address}
                        </span>
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          key="details"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-3 border-t border-base-300 px-4 pb-4 pt-4 text-sm">
                            <a
                              href={`tel:${a.phone.replace(/\s/g, "")}`}
                              className="flex items-center gap-3 text-base-content/80 transition-colors hover:text-primary"
                            >
                              <Phone className="h-4 w-4 shrink-0 text-secondary" />
                              <span className="break-words">{a.phone}</span>
                            </a>
                            <a
                              href={`mailto:${a.email}`}
                              className="flex items-center gap-3 text-base-content/80 transition-colors hover:text-primary"
                            >
                              <Mail className="h-4 w-4 shrink-0 text-secondary" />
                              <span className="break-all">{a.email}</span>
                            </a>
                            <a
                              href={directionsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-primary btn-sm mt-1 w-full gap-2 sm:w-auto"
                            >
                              <Navigation className="h-4 w-4" />
                              Itinéraire
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Carte */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            role="tabpanel"
            className="relative isolate min-h-[320px] overflow-hidden rounded-md border border-base-300 bg-base-100 shadow-sm sm:min-h-[400px] lg:col-span-7 lg:min-h-[520px]"
          >
            <div className="absolute inset-0">
              <LocalisationMap points={points} activeIndex={active} onSelect={setActive} />
            </div>

            {/* Carte flottante */}
            <div className="pointer-events-none rounded-md absolute inset-x-3 bottom-3 z-[1000] sm:inset-x-auto sm:bottom-4 sm:left-4 sm:max-w-xs">
              <div className="border border-base-300 bg-base-100/95 p-3 shadow-md backdrop-blur sm:rounded-2xl sm:p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary">
                    <MapPin className="h-4 w-4 text-secondary-content" />
                  </div>
                  <div className="min-w-0 leading-tight">
                    <div className="text-sm font-bold text-base-content">{current.name}</div>
                    <div className="mt-0.5 text-xs text-base-content/60">{current.address}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}