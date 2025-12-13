'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface Fleet {
  name: string;
  category: string;
  price: string;
  image: string;
}

const fleets: Fleet[] = [
  {
    name: "Mercedes Benz E Class",
    category: "Business Class",
    price: "From CHF 85 per hour",
    image: "/car111.png"
  },
  {
    name: "Mercedes Benz S Class",
    category: "Business Class",
    price: "From CHF 100 per hour",
    image: "/car3.png"
  },
  {
    name: "Mercedes Benz V Class",
    category: "Business Class",
    price: "From CHF 100 per hour",
    image: "/car2.png"
  },
];

export default function FleetSection() {
  return (
    <section className="relative bg-secondary text-white overflow-hidden">
      {/* Header */}
      <div className="container mx-auto px-4 text-center py-12 md:py-20 lg:py-24 mb-8 md:mb-12 lg:mb-16">
        <p
          className="text-sm md:text-base uppercase text-center mb-2 md:mb-4"
          style={{ color: '#C6A054', letterSpacing: '0.5em', fontWeight: 500 }}
        >
          OUR FLEETS
        </p>

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-wide text-white">
          Travel in Style with Our Premium Collection{' '}
          <span className="md:block inline">of Luxury Vehicles</span>
        </h2>

        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-600 to-transparent mx-auto mt-6"></div>
      </div>

      {/* Mobile Swiper Slider */}
      <div className="lg:hidden max-w-7xl mx-auto px-4">
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          className="fleet-swiper"
        >
          {fleets.map((fleet, index) => (
            <SwiperSlide key={index}>
              <div className="fleet-card bg-[#130E1E] rounded-lg overflow-hidden transition-all duration-300 group shadow-lg">
                <div className="relative h-64 bg-[#130E1E] overflow-hidden">
                  <Image
                    src={fleet.image}
                    alt={fleet.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </div>

                <div className="px-4 pt-4 pb-4 flex items-start bg-[#130E1E] justify-between border-t border-white">
                  <div>
                    <h3 className="text-base sm:text-lg font-normal mb-1 text-white">{fleet.name}</h3>
                    <p className="text-xs font-light text-white">{fleet.category}</p>
                  </div>
                  <p className="text-xs font-light text-white ml-4">{fleet.price}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop Grid Layout */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {fleets.map((fleet, index) => (
              <div
                key={index}
                className="fleet-card bg-[#130E1E] rounded-lg overflow-hidden transition-all duration-300 group shadow-lg"
              >
                <div className="relative h-64 bg-[#130E1E] overflow-hidden">
                  <Image
                    src={fleet.image}
                    alt={fleet.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    priority={index === 0}
                  />
                </div>

                <div className="px-4 pt-4 pb-4 flex items-start bg-[#130E1E] justify-between border-t border-white">
                  <div>
                    <h3 className="text-lg font-normal mb-1 text-white">{fleet.name}</h3>
                    <p className="text-xs font-light text-white">{fleet.category}</p>
                  </div>
                  <p className="text-xs font-light text-white ml-4">{fleet.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alpine Tours Section */}
      <div className="w-full relative mt-12 md:mt-16 lg:mt-20">
        {/* Background Image */}
        <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
          <Image
            src="/Picture111.jpg"
            alt="Alpine Landscape"
            fill
            className="object-cover"
            priority={false}
            quality={100}
            sizes="100vw"
          />
          
          {/* Gradient Overlays - Top and Bottom fade to fleets section background */}
          <div className="absolute inset-0 z-0">
            {/* Top gradient fade - extended deeper */}
            <div 
              className="absolute top-0 left-0 right-0 h-2/5"
              style={{
                background: 'linear-gradient(to bottom, #060111, rgba(6, 1, 17, 0.7), transparent)'
              }}
            ></div>
            {/* Bottom gradient fade - extended deeper */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-2/5"
              style={{
                background: 'linear-gradient(to top, #060111, rgba(6, 1, 17, 0.7), transparent)'
              }}
            ></div>
            {/* Center overlay for text readability */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(6, 1, 17, 0.4) 0%, rgba(6, 1, 17, 0.6) 100%)'
              }}
            ></div>
          </div>
          
          {/* Content Overlay */}
          <div className="absolute inset-0 z-10 flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-20">
            <div className="max-w-4xl">
              {/* Description Text */}
              <div className="text-white space-y-3 md:space-y-4">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-light">
                  ALPINE TOURS PROVIDES PREMIUM VIP WEF DAVOS TRANSPORTATION OFFERING PRIORITY ROUTING, REAL-TIME FLIGHT MONITORING, AND FULL COORDINATION WITH SECURITY PROTOCOLS.
                </p>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-light">
                  OUR TEAM ENSURES FAST, PUNCTUAL TRANSFERS DURING THE BUSIEST WEEK IN DAVOS, WITH SEAMLESS AIRPORT MEET-AND-GREET, LUGGAGE ASSISTANCE, AND HOTEL COORDINATION WITH TOP DAVOS HOTELS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Swiper Pagination Styles for Mobile */}
      <style jsx global>{`
        .fleet-swiper .swiper-pagination {
          position: relative;
          margin-top: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
        }
        .fleet-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transition: all 0.3s ease;
          cursor: pointer;
          opacity: 1;
          margin: 0 !important;
        }
        .fleet-swiper .swiper-pagination-bullet:hover {
          background: rgba(255, 255, 255, 0.5);
        }
        .fleet-swiper .swiper-pagination-bullet-active {
          background: #C6A054 !important;
          transform: scale(1.25);
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .fleet-swiper .swiper-pagination-bullet-active:hover {
          background: #C6A054 !important;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
