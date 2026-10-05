"use client";

import { useState } from "react";
import { Droplets, Wrench, MapPin } from "lucide-react";
import { projects } from "@/lib/data";

const categories = ["Tous", "Chaudronnerie", "Nettoyage"];

export default function Portfolio() {
  const [active, setActive] = useState("Tous");
  const filtered =
    active === "Tous" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="realisations" className="py-20 lg:py-28 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="section-eyebrow">Réalisations</span>
            <h2 className="section-title mt-3">
              Des chantiers concrets, des résultats mesurables.
            </h2>
            <p className="mt-4 text-lg text-base-content/70">
              Découvrez une sélection de nos interventions récentes sur des sites industriels
              majeurs au Cameroun.
            </p>
          </div>

          <div role="tablist" className="tabs tabs-boxed bg-base-100 p-1.5 border border-base-300">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                onClick={() => setActive(cat)}
                className={`tab font-bold ${active === cat ? "tab-active !bg-neutral !text-neutral-content" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="card bg-base-100 border border-base-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-44 bg-gradient-to-br from-neutral to-neutral/80 flex items-center justify-center">
                <div className="absolute inset-0 industrial-grid opacity-10 text-white" />
                {p.category === "Nettoyage" ? (
                  <Droplets className="w-16 h-16 text-primary relative z-10" />
                ) : (
                  <Wrench className="w-16 h-16 text-secondary relative z-10" />
                )}
                <div className="absolute top-4 right-4">
                  <span
                    className={`badge badge-sm font-extrabold tracking-wider uppercase ${
                      p.badge === "Terminé"
                        ? "badge-success text-white"
                        : p.badge === "En cours"
                        ? "badge-warning"
                        : "badge-primary"
                    }`}
                  >
                    {p.badge}
                  </span>
                </div>
              </div>

              <div className="card-body p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`badge badge-sm font-bold uppercase ${
                      p.category === "Nettoyage"
                        ? "badge-primary badge-outline"
                        : "badge-secondary badge-outline"
                    }`}
                  >
                    {p.category}
                  </span>
                  <span className="text-xs font-semibold text-base-content/60">
                    {p.sector}
                  </span>
                </div>
                <h3 className="card-title text-lg leading-snug">{p.title}</h3>
                <p className="mt-2 text-sm text-base-content/60 inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {p.location}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}