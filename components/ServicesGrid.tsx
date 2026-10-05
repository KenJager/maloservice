import Link from "next/link";
import { Sparkles, Hammer, CheckCircle2, ChevronRight } from "lucide-react";
import { services } from "@/lib/data";

const iconMap = { Sparkles, Hammer } as const;

export default function ServicesGrid() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <span className="section-eyebrow">Nos pôles d'expertise</span>
          <h2 className="section-title mt-3">
            Deux métiers, une exigence : la performance industrielle.
          </h2>
          <p className="mt-4 text-lg text-base-content/70">
            Des équipes spécialisées, des équipements certifiés et une méthodologie HSE rigoureuse
            pour intervenir en milieu industriel sensible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <div
                key={service.title}
                className="card bg-base-200 border border-base-300 rounded-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className={`h-1.5 bg-gradient-to-r ${service.accent}`} />
                <div className="card-body p-8 lg:p-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.accent} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <h3 className="card-title text-2xl font-extrabold">{service.title}</h3>
                  <p className="text-sm font-semibold text-secondary">{service.subtitle}</p>
                  <p className="mt-4 text-base-content/70 leading-relaxed">{service.description}</p>

                  <ul className="mt-6 space-y-3">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="card-actions mt-8">
                    <Link
                      href={service.href}
                      className="link link-hover inline-flex items-center gap-2 text-sm font-bold text-base-content"
                    >
                      Découvrir le pôle
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}