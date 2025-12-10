'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { TbArmchair } from "react-icons/tb";

interface FleetCardProps {
  image: string;
  title: string;
  description: string;
  seats: number[];
  perHourRate: number;
  perKmRate: number;
  currency?: string;
  carId?: string;
}

export default function FleetCard({
  image,
  title,
  description,
  seats,
  perHourRate,
  perKmRate,
  currency = 'CHF',
  carId = 'mercedes-e-class'
}: FleetCardProps) {
  const router = useRouter();

  const handleGetLimousine = () => {
    router.push(`/`);
    console.log('Booking initiated for:', title);
  };

  return (
    <div 
      className="relative rounded-lg p-8 bg-[#130E1E] max-w-lg mx-auto"
      style={{
        border: '2px dashed rgba(198, 160, 84, 0.5)',
      }}
    >
      {/* Car Image */}
      <div className="relative w-full h-56 mb-8 flex items-center justify-center">
        <Image
          src={image}
          alt={title}
          width={450}
          height={250}
          className="object-contain"
          priority
        />
      </div>

      {/* Title */}
      <h3 className="text-white text-2xl font-normal mb-3 tracking-wide">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-6 leading-relaxed font-light">
        {description}
      </p>

      {/* Seats Info */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1 border border-gray-700 rounded-md py-4 flex flex-col items-center justify-center bg-transparent hover:border-[#C6A054] transition-colors">
          <TbArmchair className=' text-primary' size={25}/>
          <span className="text-white text-sm font-normal">
            {seats[0]} seats
          </span>
        </div>
        <div className="flex-1 border border-gray-700 rounded-md py-4 flex flex-col items-center justify-center bg-transparent hover:border-[#C6A054] transition-colors">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#C6A054" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="mb-2"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span className="text-white text-sm font-normal">
            {seats[1]} persons
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="mb-6 space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-[#C6A054] text-4xl font-normal tracking-wide">
            {currency} {perHourRate}
          </span>
          <span className="text-white text-base font-light">/ hour</span>
        </div>
        {/* <p className="text-gray-400 text-sm">
          Point-to-point: {perKmRate.toFixed(1)} {currency} / km
        </p> */}
      </div>

      {/* CTA Button */}
      <button
        onClick={handleGetLimousine}
        className="w-full bg-[#C6A054] hover:bg-[#d4b06a] text-white font-medium py-4 rounded-lg transition-all flex items-center justify-center gap-2 group text-lg"
      >
        Get Limousine
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}