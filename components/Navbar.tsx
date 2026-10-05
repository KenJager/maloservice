"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";
import Logo from "./Logo";

const links = [
  { href: "/a-propos", label: "À propos" },
  { href: "/services", label: "Services" },
  { href: "#realisations", label: "Réalisations" },
  { href: "/contact", label: "Contact" },
];

const panel = {
  hidden: { opacity: 0, y: -8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: "easeOut", staggerChildren: 0.05 },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15, ease: "easeIn" } },
} as const;

const item = {
  hidden: { opacity: 0, y: -4 },
  show: { opacity: 1, y: 0 },
} as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Fermer le menu à chaque changement de page
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Échap pour fermer + blocage du scroll quand le menu est ouvert
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isActive = (href: string) => pathname?.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-[clamp(1rem,4vw,3rem)]">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center transition-opacity hover:opacity-90"
            onClick={() => setOpen(false)}
          >
            <Logo theme="light" />
          </Link>

          {/* Liens desktop */}
          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`rounded-lg px-4 py-2 font-medium transition-colors hover:bg-primary/5 hover:text-primary ${
                  isActive(l.href) ? "text-primary" : "text-base-content/80"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA desktop + burger mobile */}
          <div className="flex items-center gap-2">
            <Link
              href="/devis"
              className="btn btn-primary btn-sm hidden gap-2 lg:inline-flex lg:btn-md"
            >
              <FileText className="h-4 w-4" />
              Demander un devis
            </Link>

            <button
              type="button"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="btn btn-ghost btn-square lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            variants={panel}
            initial="hidden"
            animate="show"
            exit="exit"
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-base-300 bg-base-100 px-[clamp(1rem,4vw,3rem)] py-4 shadow-sm lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <motion.li key={l.href} variants={item}>
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className={`block rounded-lg px-4 py-3 font-semibold transition-colors hover:bg-primary/5 hover:text-primary ${
                      isActive(l.href) ? "text-primary" : "text-base-content/80"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}

              <motion.li
                variants={item}
                className="mt-2 border-t border-base-300 pt-3"
              >
                <Link href="/devis" className="btn btn-primary w-full gap-2">
                  <FileText className="h-4 w-4" />
                  Demander un devis
                </Link>
              </motion.li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}