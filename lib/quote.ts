export type Option = { id: string; label: string; detail?: string };

export const SERVICES: ReadonlyArray<
  Option & { desc: string; prestations: readonly string[] }
> = [
  {
    id: "nettoyage",
    label: "Nettoyage industriel",
    desc: "Sablage, peinture époxy, dégraissage",
    prestations: [
      "Peinture industrielle",
      "Sablage",
      "Revêtement de sol (époxy)",
      "Marquage au sol",
      "Ramonage",
    ],
  },
  {
    id: "chaudronnerie",
    label: "Chaudronnerie industrielle",
    desc: "Soudure, tuyauterie, structures",
    prestations: ["Soudure", "Tuyauterie", "Structures métalliques", "Maître d'œuvre"],
  },
];

export const VOLUMES: readonly Option[] = [
  { id: "small", label: "Petit", detail: "< 100 m² / 1 T" },
  { id: "medium", label: "Moyen", detail: "100–1000 m² / 1–5 T" },
  { id: "large", label: "Grand", detail: "> 1000 m² / > 5 T" },
];

export const URGENCES: readonly Option[] = [
  { id: "urgent", label: "Urgent", detail: "24–48 h" },
  { id: "week", label: "Sous 1 semaine", detail: "Intervention rapide" },
  { id: "planned", label: "Planifié", detail: "> 1 mois" },
];

export type QuoteInput = {
  service: string;
  prestations: string[];
  volume: string;
  urgence: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  ville: string;
  message: string;
  website: string; // honeypot : doit rester vide
};

export type QuoteErrors = Partial<Record<keyof QuoteInput, string>>;

export const emptyQuote: QuoteInput = {
  service: "",
  prestations: [],
  volume: "",
  urgence: "",
  name: "",
  company: "",
  email: "",
  phone: "",
  ville: "",
  message: "",
  website: "",
};

export const labelOf = (list: readonly Option[], id: string) =>
  list.find((o) => o.id === id)?.label ?? id;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateQuote(
  input: unknown
): { ok: true; data: QuoteInput } | { ok: false; errors: QuoteErrors } {
  const raw = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  const data: QuoteInput = {
    service: str(raw.service),
    prestations: Array.isArray(raw.prestations)
      ? raw.prestations.filter((p): p is string => typeof p === "string")
      : [],
    volume: str(raw.volume),
    urgence: str(raw.urgence),
    name: str(raw.name),
    company: str(raw.company),
    email: str(raw.email).toLowerCase(),
    phone: str(raw.phone),
    ville: str(raw.ville),
    message: str(raw.message),
    website: str(raw.website),
  };

  const errors: QuoteErrors = {};
  const service = SERVICES.find((s) => s.id === data.service);

  if (!service) errors.service = "Choisissez un service.";
  else if (data.prestations.some((p) => !service.prestations.includes(p)))
    errors.prestations = "Prestation invalide.";

  if (!VOLUMES.some((v) => v.id === data.volume)) errors.volume = "Choisissez un volume.";
  if (!URGENCES.some((u) => u.id === data.urgence)) errors.urgence = "Choisissez une urgence.";

  if (data.name.length < 2 || data.name.length > 100) errors.name = "Indiquez votre nom (2 à 100 caractères).";
  if (data.company.length < 2 || data.company.length > 100) errors.company = "Indiquez votre entreprise.";
  if (!EMAIL_RE.test(data.email) || data.email.length > 254) errors.email = "Adresse e-mail invalide.";

  const digits = data.phone.replace(/\D/g, "");
  if (!/^\+?[\d\s().-]{8,20}$/.test(data.phone) || digits.length < 8)
    errors.phone = "Numéro de téléphone invalide.";

  if (data.ville.length > 100) errors.ville = "100 caractères maximum.";
  if (data.message.length > 1000) errors.message = "1000 caractères maximum.";

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}