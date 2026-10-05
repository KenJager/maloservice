import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { agencies } from "@/lib/data";
import Logo from "./Logo";

const poles = [
  {
    title: "Nettoyage industriel",
    href: "/services#nettoyage-industriel",
    items: [
      "Peinture industrielle",
      "Sablage",
      "Revêtement sol (époxy)",
      "Marquage au sol",
      "Ramonage",
    ],
  },
  {
    title: "Chaudronnerie industrielle",
    href: "/services#chaudronnerie",
    items: ["Soudure", "Tertiaire", "Industriel", "Maître d'œuvre"],
  },
];

const quickLinks = [
  { href: "/services", label: "Services" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/carrieres", label: "Carrières" },
  { href: "/contact", label: "Contact" },
];

// Remplace par les vraies URLs de tes pages
const socials = [
  { name: "Facebook", href: "https://www.facebook.com/people/Malo-Services-SARL/100090541785753/", icon: FacebookIcon },
  { name: "Twitter (X)", href: "https://twitter.com/MaloServiceSARL", icon: XIcon },
];

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-neutral pt-12 pb-6 text-neutral-content sm:pt-16 sm:pb-8">
      <div className="mx-auto max-w-7xl px-[clamp(1rem,4vw,3rem)]">
        <div className="grid grid-cols-1 gap-10 border-b border-neutral-content/10 pb-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 sm:pb-12 lg:grid-cols-12 lg:gap-x-10">
          {/* Marque */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo theme="dark" className="mb-5" />
            <p className="max-w-md text-sm leading-relaxed text-neutral-content/70">
              Prestataire industriel de référence au Cameroun depuis 1990. Spécialiste du
              nettoyage technique, du traitement de surfaces et de la chaudronnerie
              industrielle pour les grands comptes, usines et multinationales.
            </p>

            <Link
              href="/devis"
              className="btn btn-outline mt-6 w-full gap-2 border-neutral-content/30 text-neutral-content hover:border-white hover:bg-white hover:text-neutral sm:w-auto"
            >
              Demander un devis
              <ArrowRight className="h-4 w-4" />
            </Link>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-sm text-neutral-content/70">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-block py-1.5 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pôles et prestations */}
          {poles.map((p) => (
            <div key={p.title} className="lg:col-span-2">
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider sm:mb-5">
                <Link href={p.href} className="transition-colors hover:text-white">
                  {p.title}
                </Link>
              </h4>
              <ul className="space-y-1 text-sm text-neutral-content/70">
                {p.items.map((item) => (
                  <li key={item}>
                    <Link
                      href={p.href}
                      className="inline-block py-1.5 transition-colors hover:text-white"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-4">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider sm:mb-5">
              Contact
            </h4>
            <ul className="grid grid-cols-1 gap-6 text-sm text-neutral-content/70 sm:grid-cols-2 lg:grid-cols-1">
              {agencies.map((a) => (
                <li key={a.name} className="min-w-0">
                  <div className="font-semibold text-neutral-content">{a.name}</div>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white" />
                      <span className="min-w-0 break-words">{a.address}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white" />
                      <a
                        href={`tel:${a.phone.replace(/\s/g, "")}`}
                        className="min-w-0 break-words transition-colors hover:text-white"
                      >
                        {a.phone}
                      </a>
                    </li>
                    <li className="flex items-start gap-2">
                      <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white" />
                      <a
                        href={`mailto:${a.email}`}
                        className="min-w-0 break-all transition-colors hover:text-white"
                      >
                        {a.email}
                      </a>
                    </li>
                  </ul>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-neutral-content transition-colors hover:text-white"
            >
              Formulaire de contact
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Barre du bas */}
        <div className="flex flex-col items-center justify-between gap-4 pt-6 text-center text-xs text-neutral-content/50 sm:flex-row sm:pt-8 sm:text-left">
          <p>© {new Date().getFullYear()} Malo Services SARL. Tous droits réservés.</p>

          <ul className="flex items-center gap-3">
            {socials.map(({ name, href, icon: Icon }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-content/20 text-neutral-content/80 transition-colors hover:border-white hover:bg-white hover:text-neutral"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}