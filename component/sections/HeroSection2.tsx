"use client";

import Image from "next/image";
import React from "react";

interface HeroSection2Props {
  title: string;
  subtitle?: string;
  bgImage: string;
}

const HeroSection2: React.FC<HeroSection2Props> = ({ title, subtitle, bgImage }) => {
  return (
    <section
      className="relative w-full h-[50vh] flex items-center justify-center text-center overflow-hidden"
    >
      {/* Background Image */}
      <Image
        src={bgImage}
        alt={title}
        fill
        priority
        className="object-cover object-center absolute inset-0 -z-10 brightness-50"
      />

      {/* Overlay Content */}
      <div className="z-10 px-4 text-white">
        <h1 className="text-4xl md:text-6xl uppercase font-bold mb-3 drop-shadow-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-2xl font-medium drop-shadow-md">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default HeroSection2;
