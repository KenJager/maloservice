import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Hammer, CheckCircle2, ArrowRight, Phone } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Nos services | Malo Services SARL",
  description:
    "Nettoyage industriel et chaudronnerie industrielle à Douala : peinture, sablage, revêtement époxy, soudure, tuyauterie.",
};

const pillars = [
  {
    id: "nettoyage-industriel",
    icon: Sparkles,
    eyebrow: "Pôle 01",
    title: "Nettoyage industriel",
    tagline: "Des spécialistes formés, des modes opératoires précis.",
    paragraphs: [
      "Le nettoyage industriel obéit à des règles et à des normes strictes : il doit être confié à des spécialistes équipés et formés à des modes opératoires précis. C'est l'engagement de chaque agent d'entretien Malo Services, au service d'un environnement de travail et d'une qualité de produits toujours meilleurs.",
      "Notre équipe de techniciens qualifiés et expérimentés limite au maximum les risques de perturbation de votre production pendant les travaux. Nous tenons compte des particularités de votre activité et de votre organisation, dans une approche de maintenance productive totale.",
    ],
    subServices: [
      "Peinture industrielle",
      "Sablage",
      "Revêtement de sol (époxy)",
      "Marquage au sol",
      "Ramonage",
    ],
    images: [
      { src: "/nettoyageIndustrielle.png", alt: "Techniciens Malo Services en nettoyage de locaux" },
      { src: "/images.jpeg", alt: "Agent d'entretien équipé en intervention" },
      { src: "/images2.jpeg", alt: "Équipe de nettoyage industriel sur site" },
    ],
  },
  {
    id: "chaudronnerie",
    icon: Hammer,
    eyebrow: "Pôle 02",
    title: "Chaudronnerie industrielle",
    tagline: "L'art de donner forme à l'industrie.",
    paragraphs: [
      "Pilier discret de l'industrie, la chaudronnerie regroupe plusieurs corps de métiers : chaudronnier, tuyauteur, soudeur. Elle couvre la fabrication et la transformation de pièces métalliques à partir de matériaux comme l'acier ou l'inox, des pointes de l'industrie jusqu'à la vie courante : citernes, radiateurs, cuves.",
      "Notre objectif : produire et fournir des pièces métalliques de qualité pour l'énergie, la chimie, la pétrochimie, l'alimentation, l'automobile, l'aéronautique et bien d'autres secteurs, grâce à des processus fiables, des matériaux de qualité et une main-d'œuvre qualifiée, capable de répondre vite à vos demandes.",
    ],
    subServices: ["Soudure", "Tertiaire", "Industriel", "Maître d'œuvre"],
    images: [
      { src: "/chaudronnerie.png", alt: "Équipe Malo Services manipulant des tubes et échafaudages" },
      { src: "/images3.jpeg", alt: "Soudure sur site industriel" },
      { src: "/images4.jpeg", alt: "Pièces métalliques fabriquées en atelier" },
    ],
  },
];

function Photo({
  src,
  alt,
  className = "",
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-md border border-base-300 bg-base-200 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-500 hover:scale-[1.03]"
      />
    </div>
  );
}

export default function ServicesPage() {
  return (
    <main>
      {/* En-tête */}
      <section className="hero-light-bg border-b border-base-300">
        <div className="mx-auto max-w-7xl px-[clamp(1rem,4vw,3rem)] py-12 sm:py-16 lg:py-20">
          <Reveal className="max-w-3xl">
            <div className="badge badge-outline mb-4 gap-2 border-primary/40 bg-primary/10 px-3 py-3 text-primary">
              <span className="text-xs font-semibold uppercase tracking-wide">
                Nos services
              </span>
            </div>
            <h1 className="text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-base-content sm:text-4xl lg:text-5xl">
              Deux métiers, une exigence :{" "}
              <span className="text-secondary">la performance industrielle</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-base-content/70 sm:text-lg">
              Des équipes spécialisées, des équipements adaptés et une méthodologie
              rigoureuse pour intervenir en milieu industriel.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {pillars.map((p) => (
                <a
                  key={p.id}
                  href={`#${p.id}`}
                  className="btn btn-outline btn-sm border-base-300 sm:btn-md"
                >
                  {p.title}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pôles */}
      {pillars.map((p, i) => {
        const Icon = p.icon;
        const reversed = i % 2 === 1;
        return (
          <section
            key={p.id}
            id={p.id}
            className={`scroll-mt-20 py-12 sm:py-16 lg:scroll-mt-24 lg:py-24 ${
              reversed ? "bg-base-200/60" : "bg-base-100"
            }`}
          >
            <div className="mx-auto max-w-7xl px-[clamp(1rem,4vw,3rem)]">
              <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-14">
                {/* Texte */}
                <Reveal
                  className={`lg:col-span-6 ${reversed ? "lg:order-2" : ""}`}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-md bg-secondary text-primary-content">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-base-content/60">
                      {p.eyebrow}
                    </span>
                  </div>

                  <h2 className="text-balance text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl lg:text-4xl">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-sm font-semibold text-secondary sm:text-base">
                    {p.tagline}
                  </p>

                  <div className="mt-5 space-y-4 text-sm leading-relaxed text-base-content/70 sm:text-base">
                    {p.paragraphs.map((t) => (
                      <p key={t}>{t}</p>
                    ))}
                  </div>

                  <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {p.subServices.map((s) => (
                      <li key={s} className="flex items-center gap-3 text-sm">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-secondary" />
                        {s}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/devis"
                    className="btn btn-primary mt-8 w-full gap-2 sm:w-auto"
                  >
                    Demander un devis
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Reveal>

                {/* Image principale */}
                <Reveal
                  delay={0.1}
                  className={`lg:col-span-6 ${reversed ? "lg:order-1" : ""}`}
                >
                  <Photo
                    src={p.images[0].src}
                    alt={p.images[0].alt}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    priority={i === 0}
                    className="aspect-[4/3] shadow-sm sm:aspect-[16/10] rounded-md"
                  />
                </Reveal>
              </div>

              {/* Galerie */}
              <Reveal className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-4">
                {p.images.slice(1).map((img) => (
                  <Photo
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    sizes="(min-width: 1280px) 600px, 50vw"
                    className="aspect-[4/3] sm:aspect-[16/9] rounded-md"
                  />
                ))}
              </Reveal>
            </div>
          </section>
        );
      })}

      {/* Bandeau devis */}
      <section className="border-t border-base-300 bg-neutral py-12 text-neutral-content sm:py-16">
        <Reveal className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-[clamp(1rem,4vw,3rem)] lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="text-balance text-2xl font-extrabold tracking-tight sm:text-3xl">
              Un projet sur votre site ? Parlons-en.
            </h2>
            <p className="mt-2 text-sm text-neutral-content/70 sm:text-base">
              Décrivez-nous votre besoin, nous revenons vers vous rapidement avec une
              proposition adaptée.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/devis" className="btn btn-primary gap-2">
              Demander un devis
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+237696879990"
              className="btn btn-outline gap-2 border-neutral-content/30 text-neutral-content hover:border-neutral-content/60 hover:bg-neutral-content/10"
            >
              <Phone className="h-4 w-4" />
              +237 696 87 99 90
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}