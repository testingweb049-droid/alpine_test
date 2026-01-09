'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

interface ServiceCard {
  title: string;
  image: string;
  link: string;
}

const services: ServiceCard[] = [
  {
    title: 'SKI RESORT TRANSFERS',
    image: '/ski-resort-transfer.png',
    link: '/ski-transfer',
  },
  {
    title: 'AIRPORT TRANSFERS',
    image: '/air-port-transfer.png',
    link: '/airport-transfer',
  },
  {
    title: 'HOURLY SERVICE',
    image: '/hourly-transfer.png',
    link: '/book-ride',
  },
];

const ServiceSection: React.FC = () => {
  return (
    <section className="bg-secondary text-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wider"
            style={{ color: '#C6A054' }}
          >
            OUR SERVICES
          </h2>

          <p className="mt-4 text-sm md:text-base text-white/90">
            Our comprehensive services and areas we cover
          </p>
        </div>

        {/* ================= MOBILE SLIDER ================= */}
        <div className="lg:hidden">
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            spaceBetween={16}
            pagination={{ clickable: true }}
          >
            {services.map((service, index) => (
              <SwiperSlide key={index}>
                <ServiceCardItem service={service} priority={index === 0} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ================= DESKTOP GRID ================= */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCardItem
              key={index}
              service={service}
              priority={index === 0}
            />
          ))}
        </div>
      </div>

      {/* Swiper pagination styling */}
      <style jsx global>{`
        .swiper-pagination {
          margin-top: 20px;
        }
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.4);
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #c6a054;
        }
      `}</style>
    </section>
  );
};

export default ServiceSection;

/* ================= SERVICE CARD COMPONENT ================= */

const ServiceCardItem = ({
  service,
  priority,
}: {
  service: ServiceCard;
  priority?: boolean;
}) => {
  return (
    <Link
      href={service.link}
      className="group block overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* 🔑 Aspect ratio FIX */}
      <div className="relative w-full aspect-[3/4]">
        <Image
          src={service.image}
          alt={service.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center transition-transform duration-500 scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-white text-lg lg:text-xl font-semibold uppercase tracking-wide">
            {service.title}
          </h3>
        </div>
      </div>
    </Link>
  );
};
