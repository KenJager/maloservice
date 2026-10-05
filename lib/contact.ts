export const MOTIFS = [
  { id: "info", label: "Demande d'information" },
  { id: "devis", label: "Demande de devis" },
  { id: "candidature", label: "Candidature / Carrières" },
  { id: "partenariat", label: "Partenariat" },
  { id: "autre", label: "Autre" },
] as const;

export type ContactInput = {
  name: string;
  phone: string;
  email: string;
  motif: string;
  message: string;
  website: string; // honeypot : doit rester vide
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export const emptyContact: ContactInput = {
  name: "",
  phone: "",
  email: "",
  motif: "",
  message: "",
  website: "",
};

export const motifLabel = (id: string) => MOTIFS.find((m) => m.id === id)?.label ?? id;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(
  input: unknown
): { ok: true; data: ContactInput } | { ok: false; errors: ContactErrors } {
  const raw = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  const data: ContactInput = {
    name: str(raw.name),
    phone: str(raw.phone),
    email: str(raw.email).toLowerCase(),
    motif: str(raw.motif),
    message: str(raw.message),
    website: str(raw.website),
  };

  const errors: ContactErrors = {};
  if (data.name.length < 2 || data.name.length > 100) errors.name = "Indiquez votre nom (2 à 100 caractères).";
  if (!EMAIL_RE.test(data.email) || data.email.length > 254) errors.email = "Adresse e-mail invalide.";

  const digits = data.phone.replace(/\D/g, "");
  if (!/^\+?[\d\s().-]{8,20}$/.test(data.phone) || digits.length < 8)
    errors.phone = "Numéro de téléphone invalide.";

  if (!MOTIFS.some((m) => m.id === data.motif)) errors.motif = "Choisissez un motif.";
  if (data.message.length < 10) errors.message = "Décrivez votre projet en quelques mots (10 caractères minimum).";
  if (data.message.length > 2000) errors.message = "2000 caractères maximum.";

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}