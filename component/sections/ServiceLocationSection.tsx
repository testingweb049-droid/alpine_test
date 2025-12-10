"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const services = [
  {
    image: "/airporttransfer.png",
    title: "Airport Transfers",
    alt: "Professional chauffeur with luxury vehicle",
    description: "Seamless, punctual, and comfortable transfers to and from all major Swiss airports."
  },  {
    image: "/unnamed (2).png",
    title: "WEF Davos transportation",
    alt: "Luxury event transport",
    description: "Sophisticated transportation for weddings, anniversaries, and exclusive celebrations."
  },
    {
    image: "/ski.png",
    title: "Luxury Ski Resort Transfers",
    alt: "Luxury chauffeur service",
    description: "Stylish and comfortable rides to Switzerland's top ski resorts for smooth alpine getaways."
  },
  // {
  //   image: "/service2.png",
  //   title: "Intercity Transfers",
  //   alt: "Business professionals in luxury car",
  //   description: "Elegant and reliable travel between Swiss cities, combining comfort with efficiency."
  // },

  {
    image: "/Rectangle 44 (3).png",
    title: "Corporate & VIP Travel",
    alt: "Discreet chauffeur vehicle",
    description: "Discreet, professional journeys for business travellers and VIP guests with bespoke care."
  },

];

const locations = [
  "Zürich",
  "Geneva",
  "Basel",
  "Bern",
  "Lucerne",
  "Interlaken",
  "Munich",
  "Swiss Alps",
  "Zermatt",
  "Verbier",
  "Davos",
  "Gstaad",
];

const CARD_GAP = 24; // tailwind gap-6

const ServiceLocationSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scrollByOffset = (direction: "next" | "prev") => {
    const container = scrollRef.current;
    if (!container || isAnimating) return;

    const cardWidth = container.firstElementChild?.clientWidth || container.clientWidth;
    const scrollAmount = cardWidth + CARD_GAP;
    const offset = direction === "next" ? scrollAmount : -scrollAmount;

    setIsAnimating(true);
    container.scrollBy({ left: offset, behavior: "smooth" });
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onScroll = () => {
      const cardWidth = container.firstElementChild?.clientWidth || container.clientWidth;
      const scrollAmount = cardWidth + CARD_GAP;
      const index = Math.round(container.scrollLeft / scrollAmount);
      setActiveIndex(index);
    };

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  const handleDotClick = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = container.firstElementChild?.clientWidth || container.clientWidth;
    const scrollAmount = cardWidth + CARD_GAP;
    container.scrollTo({ left: scrollAmount * index, behavior: "smooth" });
    setActiveIndex(index);
  };
 const handleCardClick = (service: any) => {
    if (service.title === "Airport Transfers") {
      router.push("/airport-transfer");
      return;
    }
    if (service.title === "Luxury Ski Resort Transfers") {
      router.push("/ski-transfer");
      return;
    }
    if (service.title === "WEF Davos transportation") {
      router.push("/davos");
      return;
    }
    if (service.title === "Corporate & VIP Travel") {
      router.push("/contact");
      return;
    }
  };

  return (
    <section id="service-location-section" className="bg-[#090512] text-white py-16 md:py-24">
      {/* Header */}
      <div className="container mx-auto px-4 text-center mb-12 md:mb-16">
        <p
          className="text-sm md:text-base uppercase text-center mb-2"
          style={{
            color: "#C6A054",
            letterSpacing: "0.5em",
            fontWeight: 500,
          }}
        >
          Our Services
        </p>

        <h2 className="text-xl md:text-4xl font-light tracking-wide leading-snug">
          Experience Luxury and Convenience with Our{" "}
          <span className="md:block inline">
            Luxury Rides and the Areas We Cover
          </span>
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-600 to-transparent mx-auto mt-6"></div>
      </div>

      {/* Service Cards */}
      <div className="container mx-auto px-4 mb-16">
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation */}
          <div className="hidden md:flex items-center justify-between absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 z-20 pointer-events-none">
            <button
              onClick={() => scrollByOffset("prev")}
              disabled={isAnimating}
              className="flex items-center justify-center h-10 w-10 bg-white/90 hover:bg-[#C6A054] text-black hover:text-white rounded-full transition-all duration-300 shadow-lg disabled:opacity-50 pointer-events-auto"
            >
              <svg width="10" height="16" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.13395 1.06021L6.07295 0.00021553L0.29395 5.77722C0.200796 5.86978 0.126867 5.97986 0.0764193 6.10111C0.0259713 6.22236 0 6.35239 0 6.48372C0 6.61504 0.0259713 6.74507 0.0764193 6.86632C0.126867 6.98757 0.200796 7.09765 0.29395 7.19021L6.07295 12.9702L7.13295 11.9102L1.70895 6.48521L7.13395 1.06021Z" fill="currentColor" />
              </svg>
            </button>
            <button
              onClick={() => scrollByOffset("next")}
              disabled={isAnimating}
              className="flex items-center justify-center h-10 w-10 bg-white/90 hover:bg-[#C6A054] text-black hover:text-white rounded-full transition-all duration-300 shadow-lg disabled:opacity-50 pointer-events-auto"
            >
              <svg width="10" height="16" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.45199 7.06021L3.51299 6.00022L9.29199 11.7772C9.38514 11.8698 9.45907 11.9799 9.50952 12.1011C9.55997 12.2224 9.58594 12.3524 9.58594 12.4837C9.58594 12.615 9.55997 12.7451 9.50952 12.8663C9.45907 12.9876 9.38514 13.0976 9.29199 13.1902L3.51299 18.9702L2.45299 17.9102L7.87699 12.4852L2.45199 7.06021Z" fill="currentColor" />
              </svg>
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto md:overflow-x-hidden px-2 md:px-0 scrollbar-none scroll-smooth snap-x snap-mandatory"
          >
            {services.map((service, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={service.title}
                  onClick={() => handleCardClick(service)}
                  className={`flex-shrink-0 w-72 sm:w-80 md:w-[26rem] relative rounded-[2px] group cursor-pointer bg-black snap-start overflow-hidden ${
                    service.title === "WEF Davos transportation" ? "cursor-pointer" : ""
                  }`}
                >
                  <div className="aspect-[4/5] relative w-full h-full">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 80vw, 33vw"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
                  </div>

                  <div
                    className="absolute bottom-0 left-0 right-0 px-6 py-4"
                    style={{ backgroundColor: "#C6A054" }}
                  >
                    <h3 className="text-base md:text-lg font-medium text-white">
                      {service.title}
                    </h3>
                    <p
                      className={`text-xs md:text-sm text-white/90 leading-relaxed mt-2 transition-all duration-300 overflow-hidden ${
                        isActive ? "opacity-100 max-h-32" : "opacity-0 max-h-0"
                      } group-hover:opacity-100 group-hover:max-h-32`}
                    >
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index ? "bg-[#C6A054]" : "bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Location Buttons */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-12 max-w-7xl mx-auto">
          {locations.map((location, index) => (
            <button
              key={location}
              className="py-2 md:py-3 text-sm md:text-base bg-[#130E1E] hover:bg-[#1B1529] rounded-md text-gray-200 transition-all duration-300 w-full"
            >
              {location}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default ServiceLocationSection;
