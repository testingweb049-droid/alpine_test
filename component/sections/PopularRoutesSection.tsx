'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

interface Route {
  name: string;
  image: string;
}

const routes: Route[] = [
  { name: 'BASEL', image: '/basil.png' },
  { name: 'ZURICH', image: '/zurish.png' },
  { name: 'INTERLAKEN', image: '/interlaken.png' },
];

const PopularRoutesSection: React.FC = () => {
  return (
    <section className="bg-secondary text-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="text-sm uppercase mb-3 tracking-[0.5em]"
            style={{ color: '#C6A054' }}
          >
            POPULAR ROUTES
          </p>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">
            Where Most Travelers Go From Here
          </h2>

          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C6A054] to-transparent mx-auto" />
        </div>

        {/* ================= MOBILE SLIDER ================= */}
        <div className="lg:hidden">
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            spaceBetween={16}
            pagination={{ clickable: true }}
            className="routes-swiper"
          >
            {routes.map((route, index) => (
              <SwiperSlide key={index}>
                <RouteCard route={route} priority={index === 0} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ================= DESKTOP GRID ================= */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {routes.map((route, index) => (
            <RouteCard
              key={index}
              route={route}
              priority={index === 0}
            />
          ))}
        </div>
      </div>

      {/* Pagination styling */}
      <style jsx global>{`
        .routes-swiper .swiper-pagination {
          margin-top: 20px;
        }
        .routes-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.4);
          opacity: 1;
        }
        .routes-swiper .swiper-pagination-bullet-active {
          background: #c6a054;
        }
      `}</style>
    </section>
  );
};

export default PopularRoutesSection;

/* ================= ROUTE CARD ================= */

const RouteCard = ({
  route,
  priority,
}: {
  route: Route;
  priority?: boolean;
}) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer">
      {/* 🔑 SINGLE ASPECT RATIO */}
      <div className="relative w-full aspect-[3/4]">
        <Image
          src={route.image}
          alt={route.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center transition-transform duration-500 scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
          <h3 className="text-white text-xl lg:text-2xl font-semibold uppercase tracking-wide">
            {route.name}
          </h3>
        </div>
      </div>
    </div>
  );
};
