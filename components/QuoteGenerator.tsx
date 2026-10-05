"use client";

import { useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import {
  Sparkles, Hammer, Gauge, Layers, Truck, Clock, CalendarClock, CalendarDays,
  ChevronLeft, ChevronRight, ArrowRight, CheckCircle2, AlertCircle, Phone, Mail,
  type LucideIcon,
} from "lucide-react";
import {
  SERVICES, VOLUMES, URGENCES, emptyQuote, labelOf, validateQuote,
  type QuoteErrors, type QuoteInput,
} from "@/lib/quote";

const steps = [
  { id: 1, label: "Service" },
  { id: 2, label: "Volume" },
  { id: 3, label: "Urgence" },
  { id: 4, label: "Coordonnées" },
];

const serviceIcons: Record<string, LucideIcon> = { nettoyage: Sparkles, chaudronnerie: Hammer };
const volumeIcons: Record<string, LucideIcon> = { small: Gauge, medium: Layers, large: Truck };
const urgenceIcons: Record<string, LucideIcon> = {
  urgent: Clock, week: CalendarClock, planned: CalendarDays,
};

type Status = "idle" | "loading" | "success" | "error";

function OptionCard({
  selected, onClick, icon: Icon, title, desc,
}: {
  selected: boolean;
  onClick: () => void;
  icon: LucideIcon;
  title: string;
  desc?: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-colors sm:flex-col sm:items-start sm:gap-0 sm:p-5 ${
        selected
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-base-300 hover:border-base-content/30"
      }`}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors sm:mb-4 ${
          selected ? "bg-primary text-primary-content" : "bg-base-200 text-base-content/60"
        }`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block font-bold leading-snug">{title}</span>
        {desc && <span className="mt-1 block text-xs text-base-content/60">{desc}</span>}
      </span>
    </button>
  );
}

function Field({
  label, error, required, className = "", children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium">
        {label}
        {required && <span className="text-primary"> *</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-error">{error}</span>}
    </label>
  );
}

function StepHeader({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-extrabold">{title}</h3>
      <p className="mt-1 text-sm text-base-content/60">{hint}</p>
    </div>
  );
}

export default function QuoteGenerator() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<QuoteInput>(emptyQuote);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [reference, setReference] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  const service = SERVICES.find((s) => s.id === data.service);

  const update = <K extends keyof QuoteInput>(k: K, v: QuoteInput[K]) => {
    setData((p) => ({ ...p, [k]: v }));
    setErrors((p) => (p[k] ? { ...p, [k]: undefined } : p));
  };

  const selectService = (id: string) =>
    setData((p) => ({ ...p, service: id, prestations: p.service === id ? p.prestations : [] }));

  const togglePrestation = (name: string) =>
    setData((p) => ({
      ...p,
      prestations: p.prestations.includes(name)
        ? p.prestations.filter((x) => x !== name)
        : [...p.prestations, name],
    }));

  const canNext =
    (step === 1 && !!data.service) ||
    (step === 2 && !!data.volume) ||
    (step === 3 && !!data.urgence);

  const scrollToCard = () =>
    requestAnimationFrame(() =>
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
    );

  const go = (to: number) => {
    setDir(to > step ? 1 : -1);
    setStep(to);
    scrollToCard();
  };
  const next = () => step < 4 && canNext && go(step + 1);
  const prev = () => step > 1 && go(step - 1);

  const focusFirstError = () =>
    requestAnimationFrame(() =>
      cardRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus()
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    // Entrée sur les étapes 1 à 3 = "Suivant"
    if (step < 4) return next();

    const result = validateQuote(data);
    if (!result.ok) {
      setErrors(result.errors);
      focusFirstError();
      return;
    }

    setStatus("loading");
    setServerError("");
    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        if (json?.errors) setErrors(json.errors);
        throw new Error(json?.message ?? "Une erreur est survenue.");
      }
      setReference(json.reference);
      setStatus("success");
      scrollToCard();
    } catch (err) {
      setServerError(
        err instanceof TypeError
          ? "Impossible de joindre le serveur. Vérifiez votre connexion."
          : err instanceof Error
          ? err.message
          : "Une erreur est survenue."
      );
      setStatus("error");
    }
  };

  const reset = () => {
    setData(emptyQuote);
    setErrors({});
    setStatus("idle");
    setServerError("");
    setReference("");
    setDir(-1);
    setStep(1);
    scrollToCard();
  };

  const inputCls = (err?: string) => `input input-bordered w-full ${err ? "input-error" : ""}`;

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="devis"
        className="industrial-grid-wrap hero-light-bg relative overflow-hidden bg-base-300 py-12 sm:py-16 lg:py-24"
      >
        <div className="industrial-grid absolute inset-0 text-black opacity-[0.05]" />

        <div className="relative mx-auto max-w-5xl px-[clamp(1rem,4vw,3rem)]">
          <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-12">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Devis express
            </span>
            <h2 className="section-title mt-3 text-balance">
              Générez votre demande de devis en 1 minute.
            </h2>
            <p className="mt-4 text-base sm:text-lg">
              Un outil pensé pour les directeurs d'usine et responsables maintenance.
              Sélectionnez votre besoin, nous revenons vers vous sous 24h.
            </p>
          </div>

          <div
            ref={cardRef}
            className="card scroll-mt-24 overflow-hidden  border border-base-300 bg-base-100 shadow-sm"
          >
            {status !== "success" && (
              <div className="border-b border-base-300 bg-base-200 px-3 py-4 sm:px-6 sm:py-5 lg:px-10">
                <ul className="steps steps-horizontal w-full">
                  {steps.map((s) => (
                    <li
                      key={s.id}
                      aria-current={step === s.id ? "step" : undefined}
                      data-content={step > s.id ? "✓" : s.id}
                      className={`step text-xs font-semibold sm:text-sm ${
                        step >= s.id ? "step-secondary" : ""
                      }`}
                    >
                      {s.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="card-body p-5 sm:p-8 lg:p-10">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="py-6 text-center sm:py-10"
                >
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 sm:h-20 sm:w-20">
                    <CheckCircle2 className="h-8 w-8 text-primary sm:h-10 sm:w-10" />
                  </div>
                  <h3 className="text-xl font-extrabold sm:text-2xl">Demande envoyée avec succès !</h3>
                  <p className="mx-auto mt-3 max-w-md text-sm text-base-content/70 sm:text-base">
                    Merci <span className="font-semibold">{data.name}</span>. Notre équipe
                    commerciale vous contactera sous 24h ouvrées pour qualifier votre projet{" "}
                    <span className="font-semibold text-primary">
                      {labelOf(SERVICES, data.service)}
                    </span>
                    . Un accusé de réception a été envoyé à{" "}
                    <span className="break-all font-semibold">{data.email}</span>.
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-base-300 bg-base-200 px-4 py-2 text-sm">
                    <span className="text-base-content/60">Référence</span>
                    <span className="font-mono font-bold">{reference}</span>
                  </div>
                  <div className="mt-8">
                    <button onClick={reset} className="btn btn-ghost gap-2">
                      Faire une nouvelle demande <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: dir * 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: dir * -16 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                    >
                      {step === 1 && (
                        <div>
                          <StepHeader
                            title="Quel service vous intéresse ?"
                            hint="Sélectionnez le pôle d'expertise concerné."
                          />
                          <div
                            role="radiogroup"
                            aria-label="Service"
                            className="grid gap-3 sm:grid-cols-2 sm:gap-4"
                          >
                            {SERVICES.map((s) => (
                              <OptionCard
                                key={s.id}
                                selected={data.service === s.id}
                                onClick={() => selectService(s.id)}
                                icon={serviceIcons[s.id]}
                                title={s.label}
                                desc={s.desc}
                              />
                            ))}
                          </div>

                          <AnimatePresence initial={false}>
                            {service && (
                              <motion.div
                                key={service.id}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="pt-6">
                                  <p className="mb-3 text-sm font-medium">
                                    Prestations concernées{" "}
                                    <span className="font-normal text-base-content/50">(optionnel)</span>
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {service.prestations.map((p) => {
                                      const on = data.prestations.includes(p);
                                      return (
                                        <button
                                          key={p}
                                          type="button"
                                          aria-pressed={on}
                                          onClick={() => togglePrestation(p)}
                                          className={`btn btn-sm rounded-full ${
                                            on ? "btn-primary" : "btn-outline border-base-300"
                                          }`}
                                        >
                                          {p}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}

                      {step === 2 && (
                        <div>
                          <StepHeader
                            title="Quel est le volume estimé ?"
                            hint="Une estimation approximative nous suffit."
                          />
                          <div
                            role="radiogroup"
                            aria-label="Volume"
                            className="grid gap-3 sm:grid-cols-3 sm:gap-4"
                          >
                            {VOLUMES.map((v) => (
                              <OptionCard
                                key={v.id}
                                selected={data.volume === v.id}
                                onClick={() => update("volume", v.id)}
                                icon={volumeIcons[v.id]}
                                title={v.label}
                                desc={v.detail}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {step === 3 && (
                        <div>
                          <StepHeader
                            title="Quel est votre niveau d'urgence ?"
                            hint="Nous adaptons nos équipes à votre planning."
                          />
                          <div
                            role="radiogroup"
                            aria-label="Urgence"
                            className="grid gap-3 sm:grid-cols-3 sm:gap-4"
                          >
                            {URGENCES.map((u) => (
                              <OptionCard
                                key={u.id}
                                selected={data.urgence === u.id}
                                onClick={() => update("urgence", u.id)}
                                icon={urgenceIcons[u.id]}
                                title={u.label}
                                desc={u.detail}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {step === 4 && (
                        <div>
                          <StepHeader
                            title="Vos coordonnées"
                            hint="Nous vous recontactons sous 24h ouvrées."
                          />

                          <div className="mb-6 flex flex-wrap gap-2 text-xs">
                            <span className="badge badge-ghost h-auto py-1.5">
                              {labelOf(SERVICES, data.service)}
                            </span>
                            <span className="badge badge-ghost h-auto py-1.5">
                              Volume : {labelOf(VOLUMES, data.volume)}
                            </span>
                            <span className="badge badge-ghost h-auto py-1.5">
                              {labelOf(URGENCES, data.urgence)}
                            </span>
                            {data.prestations.length > 0 && (
                              <span className="badge badge-ghost h-auto whitespace-normal py-1.5 text-left">
                                {data.prestations.join(" · ")}
                              </span>
                            )}
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Nom & prénom" required error={errors.name}>
                              <input
                                type="text"
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => update("name", e.target.value)}
                                aria-invalid={!!errors.name}
                                className={inputCls(errors.name)}
                              />
                            </Field>
                            <Field label="Entreprise" required error={errors.company}>
                              <input
                                type="text"
                                autoComplete="organization"
                                value={data.company}
                                onChange={(e) => update("company", e.target.value)}
                                aria-invalid={!!errors.company}
                                className={inputCls(errors.company)}
                              />
                            </Field>
                            <Field label="E-mail professionnel" required error={errors.email}>
                              <input
                                type="email"
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => update("email", e.target.value)}
                                aria-invalid={!!errors.email}
                                className={inputCls(errors.email)}
                              />
                            </Field>
                            <Field label="Téléphone" required error={errors.phone}>
                              <input
                                type="tel"
                                inputMode="tel"
                                autoComplete="tel"
                                placeholder="+237 6XX XX XX XX"
                                value={data.phone}
                                onChange={(e) => update("phone", e.target.value)}
                                aria-invalid={!!errors.phone}
                                className={inputCls(errors.phone)}
                              />
                            </Field>
                            <Field
                              label="Ville / site d'intervention"
                              error={errors.ville}
                              className="sm:col-span-2"
                            >
                              <input
                                type="text"
                                placeholder="Ex. Douala, zone industrielle de Bonabéri"
                                value={data.ville}
                                onChange={(e) => update("ville", e.target.value)}
                                aria-invalid={!!errors.ville}
                                className={inputCls(errors.ville)}
                              />
                            </Field>
                            <Field
                              label="Précisions sur votre besoin"
                              error={errors.message}
                              className="sm:col-span-2"
                            >
                              <textarea
                                rows={3}
                                maxLength={1000}
                                value={data.message}
                                onChange={(e) => update("message", e.target.value)}
                                aria-invalid={!!errors.message}
                                className={`textarea textarea-bordered w-full ${
                                  errors.message ? "textarea-error" : ""
                                }`}
                              />
                            </Field>
                          </div>

                          {/* Honeypot anti-spam : invisible pour les humains */}
                          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                            <label>
                              Site web
                              <input
                                type="text"
                                name="website"
                                tabIndex={-1}
                                autoComplete="off"
                                value={data.website}
                                onChange={(e) => update("website", e.target.value)}
                              />
                            </label>
                          </div>

                          {status === "error" && (
                            <div
                              role="alert"
                              className="mt-6 flex items-start gap-3 rounded-xl border border-error/30 bg-error/5 p-4 text-sm"
                            >
                              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-error" />
                              <div className="min-w-0">
                                <p className="font-semibold">{serverError}</p>
                                <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-base-content/70">
                                  <a href="tel:+237696879990" className="inline-flex items-center gap-1.5 hover:text-primary">
                                    <Phone className="h-3.5 w-3.5" /> +237 696 87 99 90
                                  </a>
                                  <a
                                    href="mailto:maloservicescameroun@gmail.com"
                                    className="inline-flex items-center gap-1.5 break-all hover:text-primary"
                                  >
                                    <Mail className="h-3.5 w-3.5 shrink-0" /> maloservicescameroun@gmail.com
                                  </a>
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-8 flex items-center justify-between gap-3 border-t border-base-300 pt-6">
                    <button
                      type="button"
                      onClick={prev}
                      disabled={step === 1 || status === "loading"}
                      className="btn btn-ghost gap-2"
                    >
                      <ChevronLeft className="h-4 w-4" /> Précédent
                    </button>

                    {step < 4 ? (
                      <button
                        type="button"
                        onClick={next}
                        disabled={!canNext}
                        className="btn btn-neutral gap-2"
                      >
                        Suivant <ChevronRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button type="submit" disabled={status === "loading"} className="btn btn-primary gap-2">
                        {status === "loading" ? (
                          <>
                            <span className="loading loading-spinner loading-sm" />
                            Envoi…
                          </>
                        ) : (
                          <>
                            Envoyer ma demande <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}