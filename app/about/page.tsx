import HeroSection2 from "@/component/sections/HeroSection2";
import StorySection from "@/component/sections/StorySection";
import Testimonials from "@/component/sections/Testimonials";
import WhyChoose from "@/component/sections/WhyChoose";

export default function AboutUs(){
    return(
        <>
         <HeroSection2
      title="About Us"
      subtitle="Home // About us"
      bgImage="/hero.jpg"
    />
    <StorySection/>
    <WhyChoose/>
    <Testimonials/>
        </>
    )
}