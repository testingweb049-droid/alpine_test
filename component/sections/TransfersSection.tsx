'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

interface Transfer {
  destination: string;
}

const transfers: Transfer[] = [
  { destination: 'Arosa' },
  { destination: 'Verbier' },
  { destination: 'St. Moritz' },
  { destination: 'Adelboden - Lenk' },
  { destination: 'JungFrau Region' },
  { destination: 'Grindelwald' },
  { destination: 'Gstaad' },
  { destination: 'Flims-Laax' },
  { destination: 'Davos' },
  { destination: 'Engelberg - Titlis' },
  { destination: 'Crans Montana' },
  { destination: 'Couchevel' },
  { destination: 'Bad ragaz' },
  { destination: 'Andermatt' },
  { destination: 'Zermatt' },
  { destination: 'Lech Am Arlberg' }
];

const TransfersSection: React.FC = () => {
  return (
    <section className="relative bg-secondary text-white py-12 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <p
            className="text-sm md:text-base uppercase text-center mb-2 md:mb-4"
            style={{ color: '#C6A054', letterSpacing: '0.5em', fontWeight: 500 }}
          >
            TRANSFERS
          </p>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-wide text-white">
            Private Ski Transfers from Zurich
          </h2>
        </div>

        {/* Mobile Infinite Auto Slider */}
        <div className="lg:hidden">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView={2}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
            }}
            className="transfers-swiper"
          >
            {transfers.map((transfer, index) => (
              <SwiperSlide key={index}>
                <button className="w-full h-20 sm:h-24 bg-[#130E1E] hover:bg-[#1a1529] text-white px-3 sm:px-4 py-3 sm:py-4 rounded-lg transition-all duration-300 text-xs sm:text-sm text-center flex items-center justify-center">
                  <span className="line-clamp-2 leading-tight">
                    Transfer to {transfer.destination}
                  </span>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden lg:grid grid-cols-4 gap-4 lg:gap-6 max-w-7xl mx-auto">
          {transfers.map((transfer, index) => (
            <button
              key={index}
              className="bg-[#130E1E] hover:bg-[#1a1529] text-white px-6 py-4 rounded-lg transition-all duration-300 text-base lg:text-lg text-center"
            >
              Transfer to {transfer.destination}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransfersSection;

