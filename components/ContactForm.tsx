"use client";

import { useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Phone, Mail } from "lucide-react";
import {
  MOTIFS, emptyContact, validateContact,
  type ContactErrors, type ContactInput,
} from "@/lib/contact";

type Status = "idle" | "loading" | "success" | "error";

const MAX = 2000;

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

export default function ContactForm() {
  const [data, setData] = useState<ContactInput>(emptyContact);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [sentTo, setSentTo] = useState({ name: "", email: "" });
  const cardRef = useRef<HTMLDivElement>(null);

  const update = <K extends keyof ContactInput>(k: K, v: ContactInput[K]) => {
    setData((p) => ({ ...p, [k]: v }));
    setErrors((p) => (p[k] ? { ...p, [k]: undefined } : p));
  };

  const cls = (base: string, err?: string) =>
    `${base} w-full ${err ? `${base.split(" ")[0]}-error` : ""}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    const result = validateContact(data);
    if (!result.ok) {
      setErrors(result.errors);
      requestAnimationFrame(() =>
        cardRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus()
      );
      return;
    }

    setStatus("loading");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        if (json?.errors) setErrors(json.errors);
        throw new Error(json?.message ?? "Une erreur est survenue.");
      }
      setSentTo({ name: data.name, email: data.email });
      setStatus("success");
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
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
    setData(emptyContact);
    setErrors({});
    setStatus("idle");
    setServerError("");
  };

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={cardRef}
        className="scroll-mt-24 overflow-hidden rounded-md border border-base-300 bg-base-100 shadow-sm"
      >
        <AnimatePresence mode="wait" initial={false}>
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 py-12 text-center sm:p-10 sm:py-16"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-extrabold sm:text-2xl">Message envoyé !</h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-base-content/70 sm:text-base">
                Merci <span className="font-semibold">{sentTo.name}</span>. Nous vous répondons
                sous 24h ouvrées. Un accusé de réception a été envoyé à{" "}
                <span className="break-all font-semibold">{sentTo.email}</span>.
              </p>
              <button onClick={reset} className="btn btn-ghost mt-8">
                Envoyer un autre message
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              noValidate
              initial={false}
              exit={{ opacity: 0 }}
              className="p-5 sm:p-8 lg:p-10"
            >
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                <Field label="Nom & prénom" required error={errors.name}>
                  <input
                    type="text"
                    autoComplete="name"
                    value={data.name}
                    onChange={(e) => update("name", e.target.value)}
                    aria-invalid={!!errors.name}
                    className={cls("input input-bordered", errors.name)}
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
                    className={cls("input input-bordered", errors.phone)}
                  />
                </Field>

                <Field label="E-mail" required error={errors.email}>
                  <input
                    type="email"
                    autoComplete="email"
                    value={data.email}
                    onChange={(e) => update("email", e.target.value)}
                    aria-invalid={!!errors.email}
                    className={cls("input input-bordered", errors.email)}
                  />
                </Field>

                <Field label="Motif" required error={errors.motif}>
                  <select
                    value={data.motif}
                    onChange={(e) => update("motif", e.target.value)}
                    aria-invalid={!!errors.motif}
                    className={cls("select select-bordered", errors.motif)}
                  >
                    <option value="" disabled>
                      Choisir un motif
                    </option>
                    {MOTIFS.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  label="Parlez-nous de votre projet"
                  required
                  error={errors.message}
                  className="sm:col-span-2"
                >
                  <textarea
                    rows={6}
                    maxLength={MAX}
                    placeholder="Nature des travaux, site concerné, délais souhaités…"
                    value={data.message}
                    onChange={(e) => update("message", e.target.value)}
                    aria-invalid={!!errors.message}
                    className={cls("textarea textarea-bordered", errors.message)}
                  />
                  <span className="mt-1 block text-right text-xs text-base-content/50">
                    {data.message.length}/{MAX}
                  </span>
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
                  className="mt-5 flex items-start gap-3 rounded-xl border border-error/30 bg-error/5 p-4 text-sm"
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

              <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-base-content/50">
                  Les champs marqués d'un <span className="text-primary">*</span> sont obligatoires.
                </p>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn btn-secondary gap-2 sm:min-w-44"
                >
                  {status === "loading" ? (
                    <>
                      <span className="loading loading-spinner loading-sm" />
                      Envoi…
                    </>
                  ) : (
                    <>
                      Envoyer <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}