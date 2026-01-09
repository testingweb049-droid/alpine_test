'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface Fleet {
  name: string;
  category: string;
  price: string;
  image: string;
}

export default function FleetSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const fleets: Fleet[] = [
    {
      name: "Mercedes Benz E Class",
      category: "Business Class",
      price: "From CHF 85 per hour",
      image: "/car111.png"
    },
    {
      name: "Mercedes Benz S Class",
      category: "First Class",
      price: "From CHF 100 per hour",
      image: "/car3.png"
    },
    {
      name: "Genesis G80 Electrified",
      category: "Business Class",
      price: "From CHF 85 per hour",
      image: "/car4.png"
    },
    {
      name: "Mercedes Benz V Class",
      category: "Van Class",
      price: "From CHF 100 per hour",
      image: "/car2.png"
    },
  ];

  // Detect desktop
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track scroll for dots on mobile
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || isDesktop) return;

    const handleScroll = () => {
      const cardWidth = container.scrollWidth / fleets.length;
      const index = Math.round(container.scrollLeft / cardWidth);
      setCurrentIndex(index);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [fleets.length, isDesktop]);

  // LEFT / RIGHT buttons — works on desktop & mobile
  const scrollToNext = () => {
    const container = scrollRef.current;
    if (!container) return;

    const card = container.querySelector(".fleet-card") as HTMLElement;
    if (!card) return;

    const cardWidth = card.offsetWidth + 32; // includes gap
    container.scrollBy({ left: cardWidth, behavior: 'smooth' });
  };

  const scrollToPrev = () => {
    const container = scrollRef.current;
    if (!container) return;

    const card = container.querySelector(".fleet-card") as HTMLElement;
    if (!card) return;

    const cardWidth = card.offsetWidth + 32;
    container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  };

  return (
    <section className="relative bg-black text-white py-16 md:py-20 overflow-hidden">
      {/* Header */}
      <div className="container mx-auto px-4 text-center mb-12 md:mb-16">
        <p
          className="text-sm md:text-base uppercase text-center mb-2"
          style={{ color: '#C6A054', letterSpacing: '0.5em', fontWeight: 500 }}
        >
          Our Fleets
        </p>

        <h2 className="text-xl md:text-4xl font-light tracking-wide">
          Travel in Style with Our Premium Collection{' '}
          <span className="md:block inline">of Luxury Vehicles</span>
        </h2>

        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-600 to-transparent mx-auto mt-6"></div>
      </div>

      {/* Desktop Arrows */}
      <div className="hidden md:flex items-center justify-between absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 z-20">
        <button
          onClick={scrollToPrev}
          className="flex items-center justify-center h-12 w-12 bg-white hover:bg-[#C6A054] text-black hover:text-white rounded transition duration-300 shadow-lg"
        >
          <svg width="10" height="16" viewBox="0 0 8 13" fill="none">
            <path d="M7.13395 1.06021L6.07295 0.00021553L0.29395 5.77722C0.200796 5.86978 0.126867 5.97986 0.0764193 6.10111C0.0259713 6.22236 0 6.35239 0 6.48372C0 6.61504 0.0259713 6.74507 0.0764193 6.86632C0.126867 6.98757 0.200796 7.09765 0.29395 7.19021L6.07295 12.9702L7.13295 11.9102L1.70895 6.48521L7.13395 1.06021Z" fill="currentColor" />
          </svg>
        </button>

        <button
          onClick={scrollToNext}
          className="flex items-center justify-center h-12 w-12 bg-white hover:bg-[#C6A054] text-black hover:text-white rounded transition duration-300 shadow-lg"
        >
          <svg width="10" height="16" viewBox="0 0 12 24" fill="none">
            <path d="M2.45199 7.06021L3.51299 6.00022L9.29199 11.7772C9.38514 11.8698 9.45907 11.9799 9.50952 12.1011C9.55997 12.2224 9.58594 12.3524 9.58594 12.4837C9.58594 12.615 9.55997 12.7451 9.50952 12.8663C9.45907 12.9876 9.38514 13.0976 9.29199 13.1902L3.51299 18.9702L2.45299 17.9102L7.87699 12.4852L2.45199 7.06021Z" fill="currentColor" />
          </svg>
        </button>
      </div>

      {/* CARDS */}
      <div
        ref={scrollRef}
        className="flex gap-6 md:gap-8 overflow-x-auto md:overflow-x-auto px-4 md:px-8 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
      >
        {fleets.map((fleet, index) => (
          <div
            key={index}
            className="fleet-card flex-shrink-0 snap-start w-80 md:w-[30rem] bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden hover:border-yellow-600/50 transition-all duration-300 group"
          >
            <div className="relative h-64 bg-[#130E1E] overflow-hidden border-b">
              <Image
                src={fleet.image}
                alt={fleet.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="px-4 pt-2 flex items-start bg-[#130E1E] justify-between">
              <div>
                <h3 className="text-xl md:text-lg font-normal mb-2">{fleet.name}</h3>
                <p className="text-[12px] font-light mb-4">{fleet.category}</p>
              </div>
              <p className="text-[12px] font-light">{fleet.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MOBILE DOTS */}
      {!isDesktop && (
        <div className="flex justify-center space-x-3 mt-8 md:hidden">
          {fleets.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (scrollRef.current) {
                  const cardWidth = scrollRef.current.scrollWidth / fleets.length;
                  scrollRef.current.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
                  setCurrentIndex(index);
                }
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-[#C6A054] scale-125' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
