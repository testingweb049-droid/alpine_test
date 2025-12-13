import FaqsSection from "@/component/sections/FaqsSection";
import FleetSection from "@/component/sections/FleetSection";
import HeroSection from "@/component/sections/HeroSection";
import ServiceLocationSection from "@/component/sections/ServiceLocationSection";
import ServiceSection from "@/component/sections/ServiceSection";
import Testimonials from "@/component/sections/Testimonials";
import WhyChoose from "@/component/sections/WhyChoose";
import BenefitsSection from "@/component/sections/BenefitsSection";
import PopularRoutesSection from "@/component/sections/PopularRoutesSection";
import TransfersSection from "@/component/sections/TransfersSection";

export default function Home() {
  return (
   <>
   <HeroSection/>
   <ServiceSection/>
   {/* <ServiceLocationSection/> */}
   <BenefitsSection/>
   {/* <WhyChoose/> */}
   <FleetSection/>
   <PopularRoutesSection/>
   <TransfersSection/>
   {/* <Testimonials/> */}
   {/* <FaqsSection/> */}
   </>
  );
}
