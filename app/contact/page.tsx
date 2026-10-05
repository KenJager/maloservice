import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { agencies } from "@/lib/data";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact | Malo Services SARL",
  description:
    "Contactez Malo Services SARL à Douala et Bafoussam : nettoyage industriel et chaudronnerie industrielle.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="hero-light-bg border-b border-base-300">
        <div className="mx-auto max-w-7xl px-[clamp(1rem,4vw,3rem)] py-12 sm:py-16 lg:py-20">
          <Reveal className="max-w-3xl">
            <div className="badge badge-outline mb-4 gap-2 border-primary/40 bg-primary/10 px-3 py-3 text-primary">
              <span className="text-xs font-semibold uppercase tracking-wide">Contact</span>
            </div>
            <h1 className="text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-base-content sm:text-4xl lg:text-5xl">
              Contacter <span className="text-secondary">Malo Services</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-base-content/70 sm:text-lg">
              Une question, un projet, une candidature ? Écrivez-nous, nous vous répondons
              sous 24h ouvrées.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-base-100 py-10 sm:py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-[clamp(1rem,4vw,3rem)]">
          <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-7">
              <ContactForm />
            </Reveal>

            <Reveal delay={0.1} className="space-y-4 lg:col-span-5">
              <h2 className="text-lg font-extrabold sm:text-xl">Nos agences</h2>

              {agencies.map((a) => (
                <div
                  key={a.name}
                  className="rounded-2xl border border-base-300 bg-base-200/60 p-5"
                >
                  <h3 className="font-bold text-base-content">{a.name}</h3>
                  <ul className="mt-3 space-y-2.5 text-sm text-base-content/70">
                    <li className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="min-w-0 break-words">{a.address}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <a
                        href={`tel:${a.phone.replace(/\s/g, "")}`}
                        className="min-w-0 break-words transition-colors hover:text-primary"
                      >
                        {a.phone}
                      </a>
                    </li>
                    <li className="flex items-start gap-3">
                      <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <a
                        href={`mailto:${a.email}`}
                        className="min-w-0 break-all transition-colors hover:text-primary"
                      >
                        {a.email}
                      </a>
                    </li>
                  </ul>
                </div>
              ))}

              <div className="flex items-start gap-3 rounded-2xl border border-base-300 p-5 text-sm">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-base-content/70">
                  <span className="font-semibold text-base-content">Réponse sous 24h ouvrées.</span>{" "}
                  Pour une intervention urgente, appelez-nous directement.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}