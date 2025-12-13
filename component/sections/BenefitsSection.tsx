'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface BenefitCard {
  title: string;
  description: string;
}

const benefits: BenefitCard[] = [
  {
    title: 'Accredited WEF Access',
    description: 'We hold official WEF vehicle permits and driver security clearances, giving our clients unrestricted access to Congress Centre zones, secured hotels, and restricted areas. Our chauffeurs follow updated security procedures and optimized routing to keep your schedule on track.'
  },
  {
    title: 'Seamless Airport-Davos Transfers',
    description: 'We offer fast, direct transfers from Zurich, Geneva, Munich, St. Gallen-Altenrhein, and Friedrichshafen airports. With flight tracking, customs assistance, and real-time traffic management, we guarantee smooth and timely travel to Davos.'
  },
  {
    title: 'Luxury Fleet for Alpine Conditions',
    description: 'Our WEF fleet features Mercedes-Benz S-Class, E-Class, V-Class, and Sprinter vehicles, all equipped for winter Alpine driving. Guests enjoy premium amenities including Wi-Fi, charging ports, refreshments, and privacy options—ideal for executives and VIP delegations.'
  },
  {
    title: 'Dedicated Chauffeur Services',
    description: 'Our multilingual chauffeurs provide discreet, professional WEF chauffeur services, available hourly or for full multi-day assignments. Whether for meetings, events, or private travel, we ensure reliable transportation throughout the World Economic Forum.'
  }
];

const BenefitsSection: React.FC = () => {
  return (
    <section
      className="bg-secondary text-white py-12 md:py-20 lg:py-24 relative"
      style={{ fontFamily: 'sans-serif' }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* ========================================
          Heading Section
        ======================================== */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          {/* Small Heading */}
          <p
            className="text-sm md:text-base uppercase text-center mb-2 md:mb-4"
            style={{
              color: '#C6A054',
              letterSpacing: '0.5em',
              fontWeight: 500
            }}
          >
            BENEFITS
          </p>

          {/* Main Heading */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 md:mb-4 lg:mb-6 text-white">
            Our comprehensive{' '}
            <span className="relative inline-block">
              services and areas
              <span
                className="absolute bottom-0 left-0 right-0 h-[1px] md:h-0.5"
                style={{
                  background: 'linear-gradient(to right, transparent, #C6A054, transparent)',
                  transform: 'translateY(2px)'
                }}
              />
            </span>{' '}
            we covers
          </h2>
        </div>

        {/* ========================================
          Mobile Swiper Slider
        ======================================== */}
        <div className="lg:hidden max-w-4xl mx-auto">
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            className="benefits-swiper"
          >
            {benefits.map((benefit, index) => (
              <SwiperSlide key={index}>
                <div className="bg-[#130E1E] rounded-lg md:rounded-xl p-6 md:p-8 h-full shadow-lg">
                  <h3
                    className="text-lg md:text-xl font-semibold mb-4 md:mb-5"
                    style={{ color: '#C6A054' }}
                  >
                    {benefit.title}
                  </h3>
                  <p className="text-white text-sm md:text-base leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ========================================
          Desktop Grid Layout (2x2)
        ======================================== */}
        <div className="hidden lg:grid grid-cols-2 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-[#130E1E] rounded-lg md:rounded-xl p-6 md:p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h3
                className="text-xl md:text-2xl font-semibold mb-4 md:mb-5"
                style={{ color: '#C6A054' }}
              >
                {benefit.title}
              </h3>
              <p className="text-white text-sm md:text-base lg:text-lg leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Swiper Pagination Styles */}
      <style jsx global>{`
        .benefits-swiper .swiper-pagination {
          position: relative;
          margin-top: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
        }
        .benefits-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transition: all 0.3s ease;
          cursor: pointer;
          opacity: 1;
          margin: 0 !important;
        }
        .benefits-swiper .swiper-pagination-bullet:hover {
          background: rgba(255, 255, 255, 0.5);
        }
        .benefits-swiper .swiper-pagination-bullet-active {
          background: #C6A054 !important;
          transform: scale(1.25);
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .benefits-swiper .swiper-pagination-bullet-active:hover {
          background: #C6A054 !important;
        }
      `}</style>
    </section>
  );
};

export default BenefitsSection;

