'use client';

import React from 'react';
import Image from 'next/image';

const AlpineToursSection: React.FC = () => {
  return (
    <section className="w-full relative">
      {/* Background Image */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh]">
        <Image
          src="/Picture111.jpg"
          alt="Alpine Landscape"
          fill
          className="object-cover"
          priority
          quality={100}
          sizes="100vw"
        />
        
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 md:bg-black/30"></div>
        
        {/* Content Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl">
            {/* Heading */}
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 md:mb-6 text-white uppercase tracking-wide"
              style={{ letterSpacing: '0.1em' }}
            >
              ALPINE TOURS
            </h2>
            
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
    </section>
  );
};

export default AlpineToursSection;

