import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import Portfolio from "@/components/Portfolio";
import StatsSection from "@/components/StatsSection";
import Localisation from "@/components/Localisation";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <ServicesGrid />
      <Portfolio />
      <Localisation />
    </>
  );
}