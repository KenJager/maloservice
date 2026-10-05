import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles, Hammer, ArrowRight, MapPin, ShieldCheck, ClipboardCheck,
  LifeBuoy, Users, Target, Award,
} from "lucide-react";
import { agencies } from "@/lib/data";
import Reveal from "@/components/Reveal";
import VideoPlayer from "@/components/VideoPlayer";

export const metadata: Metadata = {
  title: "À propos | Malo Services SARL",
  description:
    "Malo Services SARL, entreprise de nettoyage industriel et de chaudronnerie industrielle basée à Douala, au Cameroun, depuis 1990.",
};

// ID de la vidéo YouTube (ex. pour https://youtu.be/AbC123xyz → "AbC123xyz").
// Laisse vide pour masquer la section vidéo.
const VIDEO_ID = "https://youtu.be/F8mBYVbbwDY";

// Ajoute `photo: "/images/equipe/xxx.jpg"` pour afficher une photo (sinon : initiales)
const team = [
  { name: "Patriarche MANDAG Louis", role: "Fondateur", photo: "founder-0d35075f.svg" },
  { name: "NGO BIHENG Marie Émilienne, épouse MANDAG", role: "Co-fondatrice", photo: "co-founder-85315ba5.svg" },
  { name: "TSHIMANGA Kazadi Guy", role: "Directeur Général", photo: "general_manager-96de2d8a.svg" },
  { name: "Mme NGO MANDAG Claire Perpétue", role: "DRH & Finance", photo: "drh-a5f3bccd.svg" },
  { name: "Mlle GOUFAN Hélène Vanessa", role: "Chef travaux & personnel", photo: "chief-24a1205c.svg" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Confiance",
    text: "Des engagements tenus, une relation durable avec chacun de nos clients.",
  },
  {
    icon: ClipboardCheck,
    title: "Responsabilité & gestion",
    text: "Des chantiers organisés, suivis et livrés dans le respect des délais.",
  },
  {
    icon: LifeBuoy,
    title: "Soutien",
    text: "Une équipe disponible et à l'écoute, avant, pendant et après l'intervention.",
  },
  {
    icon: Users,
    title: "Respect",
    text: "Respect des personnes, des sites, des règles de sécurité et de l'environnement.",
  },
  {
    icon: Target,
    title: "Exigence",
    text: "Des standards de qualité élevés appliqués à chaque détail du chantier.",
  },
  {
    icon: Award,
    title: "Professionnalisme",
    text: "Des techniciens qualifiés, formés et expérimentés, aux méthodes éprouvées.",
  },
];

const pillars = [
  {
    icon: Sparkles,
    title: "Nettoyage industriel",
    text: "Nettoyage de machines et de lignes de production, décapage de pièces métalliques, peinture, sablage, revêtements de sol époxy.",
    href: "/services#nettoyage-industriel",
  },
  {
    icon: Hammer,
    title: "Chaudronnerie industrielle",
    text: "Fabrication et transformation de pièces métalliques, rénovation de chaudières et de réservoirs, soudure et tuyauterie.",
    href: "/services#chaudronnerie",
  },
];

function initials(name: string) {
  const words = name
    .replace(/^(Mme|Mlle|M\.|Patriarche)\s+/i, "")
    .split(/[\s,]+/)
    .filter((w) => /^[A-ZÀ-Ý]/.test(w));
  return (words[0]?.[0] ?? "") + (words[1]?.[0] ?? "");
}

export default function AboutPage() {
  return (
    <main>
      {/* En-tête */}
      <section className="hero-light-bg border-b border-base-300">
        <div className="mx-auto max-w-7xl px-[clamp(1rem,4vw,3rem)] py-12 sm:py-16 lg:py-20">
          <Reveal className="max-w-3xl">
            <div className="badge badge-outline mb-4 gap-2 border-primary/40 bg-primary/10 px-3 py-3 text-primary">
              <span className="text-xs font-semibold uppercase tracking-wide">À propos</span>
            </div>
            <h1 className="text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-base-content sm:text-4xl lg:text-5xl">
              Une expertise industrielle{" "}
              <span className="text-secondary">au service de vos sites</span> depuis 1990
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Présentation */}
      <section className="bg-base-100 py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-[clamp(1rem,4vw,3rem)]">
          <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-6">
              <h2 className="text-balance text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl">
                Malo Services <span className="text-secondary">SARL</span>
              </h2>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-base-content/70 sm:text-base">
                <p>
                  Malo Services est une entreprise spécialisée dans le nettoyage industriel
                  et la chaudronnerie industrielle, basée à Douala, au Cameroun. Elle est
                  reconnue pour son expertise et son professionnalisme, grâce à une équipe
                  de techniciens qualifiés et expérimentés.
                </p>
                <p>
                  Notre but est de minimiser tous les risques de perturbation de votre
                  production pendant nos travaux de nettoyage et d'entretien. Nous tenons
                  compte des particularités de votre activité et de l'organisation de votre
                  entreprise, et nous agissons en amont et en complément d'une approche de
                  maintenance productive totale.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-base-300 shadow-sm sm:aspect-[16/10] sm:rounded-3xl">
                <Image
                  src="/images.jpeg"
                  alt="Équipe Malo Services en intervention"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* Chiffres clés */}
          <Reveal className="mt-10 grid grid-cols-3 divide-x divide-base-300 rounded-2xl border border-base-300 bg-base-200/60 sm:mt-14">
            {[
              { value: "1990", label: "Depuis" },
              { value: "2", label: "Pôles d'expertise" },
              { value: String(agencies.length), label: agencies.length > 1 ? "Agences" : "Agence" },
            ].map((s) => (
              <div key={s.label} className="px-2 py-5 text-center sm:py-7">
                <div className="text-2xl font-extrabold text-secondary sm:text-4xl">{s.value}</div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-base-content/60 sm:text-xs">
                  {s.label}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Vidéo */}
      {VIDEO_ID && (
        <section className="bg-base-200/60 py-12 sm:py-16 lg:py-20">
          <Reveal className="mx-auto max-w-4xl px-[clamp(1rem,4vw,3rem)]">
            <VideoPlayer videoId={VIDEO_ID} title="Présentation de Malo Services" />
          </Reveal>
        </section>
      )}

      {/* Que faisons-nous */}
      <section className="bg-base-100 py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-[clamp(1rem,4vw,3rem)]">
          <Reveal className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Notre métier
            </span>
            <h2 className="mt-3 text-balance text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl lg:text-4xl">
              Que faisons-nous ?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-base-content/70 sm:text-base">
              Nous proposons une gamme complète de services de nettoyage industriel, du
              nettoyage de machines et de lignes de production au décapage de pièces
              métalliques, en passant par la rénovation de chaudières et de réservoirs.
              Nous répondons à tous vos besoins en nettoyage et en chaudronnerie
              industrielle, avec des solutions sur mesure adaptées à votre secteur d'activité.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={i * 0.08}>
                  <Link
                    href={p.href}
                    className="group flex h-full flex-col rounded-2xl border border-base-300 bg-base-200/60 p-6 transition-colors sm:p-8"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-content">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-lg font-extrabold text-base-content sm:text-xl">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-base-content/70">{p.text}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-base-content transition-colors group-hover:text-primary">
                      Découvrir le pôle
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Organigramme */}
      <section className="border-y border-base-300 bg-base-200/60 py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-[clamp(1rem,4vw,3rem)]">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              L'équipe dirigeante
            </span>
            <h2 className="mt-3 text-balance text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl lg:text-4xl">
              Organigramme de l'entreprise
            </h2>
          </Reveal>

          <ul className="mt-10 flex flex-wrap justify-center gap-x-4 gap-y-8 sm:mt-14 sm:gap-x-8 sm:gap-y-10">
            {team.map((m, i) => (
              <li key={m.name} className="w-[calc(50%-0.5rem)] sm:w-52 lg:w-56">
                <Reveal delay={(i % 3) * 0.06} className="text-center">
                  <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-base-300 bg-base-100 sm:h-32 sm:w-32">
                    {m.photo ? (
                      <Image
                        src={m.photo}
                        alt={m.name}
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="flex h-full w-full items-center justify-center text-xl font-extrabold text-secondary sm:text-3xl"
                      >
                        {initials(m.name)}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-primary sm:text-xs">
                    {m.role}
                  </p>
                  <p className="mt-1 text-balance text-sm font-semibold leading-snug text-base-content">
                    {m.name}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Implantation */}
      <section className="bg-base-100 py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-[clamp(1rem,4vw,3rem)]">
          <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Notre implantation
              </span>
              <h2 className="mt-3 text-balance text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl lg:text-4xl">
                Présents au <span className="text-secondary">Cameroun</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-base-content/70 sm:text-base">
                Depuis nos agences, nos équipes interviennent sur les sites industriels
                du pays avec la même exigence de qualité et de sécurité.
              </p>
              <Link href="/contact" className="btn btn-primary mt-6 w-full gap-2 sm:w-auto">
                Nous contacter
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-7">
              <ul className="grid gap-4 sm:grid-cols-2">
                {agencies.map((a) => (
                  <li
                    key={a.name}
                    className="rounded-2xl border border-base-300 bg-base-200/60 p-5 sm:p-6"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary text-primary-content">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-bold text-base-content">{a.name}</h3>
                    <p className="mt-1 break-words text-sm text-base-content/70">{a.address}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="border-t border-base-300 bg-base-200/60 py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-[clamp(1rem,4vw,3rem)]">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Ce qui nous guide
            </span>
            <h2 className="mt-3 text-balance text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl lg:text-4xl">
              Nos valeurs professionnelles et humaines
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.title} delay={(i % 3) * 0.06}>
                  <div className="h-full rounded-md border border-base-300 bg-base-100 p-6 transition-colors">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-bold uppercase tracking-wide text-base-content">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-base-content/70">{v.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}