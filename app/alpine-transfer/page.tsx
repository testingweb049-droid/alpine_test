import BenefitsSection from "@/component/sections/BenefitsSection";
import FleetSection from "@/component/sections/FleetSection-2";
import HeroSection from "@/component/sections/HeroSection-2";
import PopularRoutesSection from "@/component/sections/PopularRoutesSection";
import ServiceSection from "@/component/sections/ServiceSection-2";
import TransfersSection from "@/component/sections/TransfersSection";

export default function Home() {
  return (
   <>
   <HeroSection/>
   <ServiceSection/>
   <BenefitsSection/>
   <FleetSection/>
   <PopularRoutesSection/>
   <TransfersSection/>
   </>
  );
}
