import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Malo Services SARL – Nettoyage & Chaudronnerie Industrielle à Douala",
    template: "%s | Malo Services SARL",
  },
  description:
    "Expert en nettoyage industriel, sablage, peinture époxy et chaudronnerie industrielle à Douala, Cameroun. Intervention sur sites industriels exigeants.",
  keywords: ["nettoyage industriel", "chaudronnerie", "sablage", "peinture époxy", "Douala", "Cameroun"],
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-theme="malo">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}