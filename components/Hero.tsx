import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, ArrowRight, MapPin, Clock, Award } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero-light-bg relative overflow-hidden">
      <div className="industrial-grid absolute inset-0 text-secondary opacity-[0.04]" />

      <div className="relative mx-auto max-w-7xl px-[clamp(1rem,4vw,3rem)] py-12 sm:py-16 lg:py-24">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Texte */}
          <div className="lg:col-span-6">
            <div className="badge badge-outline mb-5 h-auto gap-2 whitespace-normal border-primary/40 bg-primary/10 px-3 py-2 text-left text-primary sm:mb-6 sm:px-4">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span className="text-[11px] font-semibold uppercase tracking-wide sm:text-xs">
                Partenaire industriel certifié à Douala
              </span>
            </div>

            <h1 className="text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-base-content sm:text-4xl md:text-5xl xl:text-6xl">
              L'expertise industrielle qui{" "}
              <span className="text-secondary">propulse vos sites</span> de
              production.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-base-content/70 sm:mt-6 sm:text-lg">
              Nettoyage technique, sablage, peinture époxy, chaudronnerie, soudure et
              tuyauterie. Malo Services SARL intervient sur les sites les plus exigeants
              du Cameroun avec des standards de sécurité et de qualité internationaux.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
              <Link
                href="/devis"
                className="btn btn-primary w-full gap-2 sm:btn-lg sm:w-auto"
              >
                Demander un Devis Industriel
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/services"
                className="btn btn-outline w-full border-base-300 sm:btn-lg sm:w-auto"
              >
                Explorer nos services
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-base-content/60 sm:mt-10">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> Douala, Cameroun
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" /> Intervention 24/7
              </span>
              <span className="inline-flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" /> Normes ISO & HSE
              </span>
            </div>
          </div>

          {/* Visuel */}
          <div className="lg:col-span-6">
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-base-300 shadow-lg sm:aspect-[16/10] sm:rounded-3xl lg:aspect-auto lg:h-[520px]">
                <Image
                  src="/Untitled.jpeg"
                  alt="Technicien Malo Services en opération de nettoyage industriel"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral/50 via-transparent to-transparent" />

                {/* Carte certification */}
                <div className="absolute inset-x-3 bottom-3 rounded-xl border border-base-300 bg-base-100/95 p-3 shadow-md backdrop-blur sm:inset-x-4 sm:bottom-4 sm:rounded-2xl sm:p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary sm:h-10 sm:w-10">
                      <ShieldCheck className="h-5 w-5 text-primary-content" />
                    </div>
                    <div className="min-w-0 leading-tight">
                      <div className="text-sm font-bold text-base-content">
                        Intervention certifiée HSE
                      </div>
                      <div className="truncate text-xs text-base-content/60">
                        Équipes formées · Équipements ATEX
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stat : ans d'expertise (dans l'image sur mobile, déborde dès lg) */}
              <div className="absolute right-3 top-3 rounded-xl bg-secondary px-3 py-2 text-secondary-content shadow-md sm:px-5 sm:py-3 lg:-right-4 lg:-top-4 lg:rounded-2xl">
                <div className="text-xl font-extrabold leading-none sm:text-2xl">12+</div>
                <div className="text-[10px] font-semibold uppercase tracking-wider opacity-90">
                  Ans d'expertise
                </div>
              </div>

              {/* Stat : disponibilité (masquée sur très petits écrans) */}
              <div className="absolute left-3 top-3 hidden rounded-xl border border-base-300 bg-base-100/95 px-3 py-2 text-secondary shadow-md backdrop-blur sm:block sm:px-5 sm:py-3 lg:-left-4 lg:-top-4 lg:rounded-2xl">
                <div className="text-xl font-extrabold leading-none sm:text-2xl">24/7</div>
                <div className="text-[10px] font-semibold uppercase tracking-wider opacity-90">
                  Disponibilité
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}