import type { Metadata } from "next";
import QuoteGenerator from "@/components/QuoteGenerator";

export const metadata: Metadata = {
  title: "Demander un devis",
  description: "Obtenez un devis industriel en 1 minute.",
};

export default function DevisPage() {
  return <QuoteGenerator />;
}