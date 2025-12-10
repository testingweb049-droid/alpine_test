"use client";

import { useEffect, useState } from "react";
import { useBookingStore } from "@/store/bookingStore";
import { buildPricing } from "@/utils/pricingUtils";
import { Users, Luggage, Check } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const VEHICLES = [
  {
    id: "mercedes-e-class",
    name: "Mercedes Benz E Class",
    image: "/car111.png",
    maxPassengers: 3,
    maxLuggage: 2,
  },
  
  {
    id: "mercedes-s-class",
    name: "Mercedes Benz S Class",
    image: "/car3.png",
    maxPassengers: 3,
    maxLuggage: 3,
  },
  {
    id: "genesis-g80-electrified",
    name: "Genesis G80 Electrified",
    image: "/car4.png",
    maxPassengers: 3,
    maxLuggage: 2,
  },
  {
    id: "mercedes-v-class",
    name: "Mercedes Benz V Class",
    image: "/car2.png",
    maxPassengers: 6,
    maxLuggage: 6,
  },
];

export default function FleetSelection() {
  const router = useRouter();
  const { bookingData, updateBookingData } = useBookingStore();
  const [prices, setPrices] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    const pricing = buildPricing(
      bookingData.rateType,
      bookingData.distanceKm || null,
      bookingData.duration || "1"
    );
    setPrices(pricing.prices || null);
  }, [bookingData]);

  const handleVehicleSelect = (vehicle: typeof VEHICLES[0]) => {
    const price = prices?.[vehicle.name] || 0;
    updateBookingData({
      selectedVehicle: vehicle.id,
      selectedVehicleName: vehicle.name,
      selectedVehiclePrice: price,
      totalPrice: price,
    });
    router.push(`/book-ride/passenger`);
  };

  return (
    <div className="lg:col-span-2">
      <div className="space-y-4">
        {VEHICLES.map((vehicle) => {
          const price = prices?.[vehicle.name] || 0;

          return (
            <div
              key={vehicle.id}
              className="bg-white relative rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all"
            >
              <div className="absolute top-0 left-0">
                <span className="inline-block bg-[#D4F8D4] text-[#1BCC1E] text-xs font-medium px-4 py-2 rounded-br-lg rounded-tr-lg">
                  Free Cancellation
                </span>
              </div>

              <div className="hidden lg:flex flex-row gap-6 mt-0">
                <div className="w-56 h-36 rounded-lg border border-[#E9E9E9] flex items-center justify-center bg-gray-50">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    width={240}
                    height={150}
                    className="object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-0">
                    {vehicle.name}
                  </h3>

                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <Users size={20} className="text-[#C7A151]" />
                      <span className="text-sm text-gray-700 font-medium">
                        Max {vehicle.maxPassengers}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Luggage size={20} className="text-[#C7A151]" />
                      <span className="text-sm text-gray-700 font-medium">
                        Max {vehicle.maxLuggage}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>1 hour free waiting time</li>
                    <li>Includes Meet & Greet</li>
                    <li>Flight Tracking</li>
                    <li>Door to door Transfer</li>
                  </ul>
                </div>

                <div className="flex flex-col justify-end items-end min-w-[200px]">
                  <div className="text-right">
                    <div className="flex items-baseline gap-2 justify-end">
                      <span className="text-base font-semibold text-gray-600">CHF</span>
                      <span className="text-4xl font-bold text-gray-900">
                        {price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleVehicleSelect(vehicle)}
                    className="bg-[#C7A151] hover:bg-[#b08d45] text-white font-normal px-12 py-3 rounded-sm transition-all w-auto mt-2 text-sm"
                  >
                    SELECT
                  </button>
                </div>
              </div>

              <div className="lg:hidden flex flex-col mt-8">
                <div className="w-full h-48 flex items-center justify-center bg-white mb-4">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    width={280}
                    height={200}
                    className="object-contain"
                  />
                </div>

                <div className="w-full">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{vehicle.name}</h3>

                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <Users size={18} className="text-[#C7A151]" />
                      <span className="text-sm text-gray-700 font-medium">
                        Max {vehicle.maxPassengers}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Luggage size={18} className="text-[#C7A151]" />
                      <span className="text-sm text-gray-700 font-medium">
                        Max {vehicle.maxLuggage}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2 text-gray-700 text-sm mb-6">
                    <li className="flex items-center gap-2">
                      <Check size={16} className="text-gray-400 flex-shrink-0" />
                      <span>1 hour free waiting time</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={16} className="text-gray-400 flex-shrink-0" />
                      <span>Includes Meet & Greet</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={16} className="text-gray-400 flex-shrink-0" />
                      <span>Flight Tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={16} className="text-gray-400 flex-shrink-0" />
                      <span>Door to door Transfer</span>
                    </li>
                  </ul>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-medium text-gray-600">CHF</span>
                      <span className="text-3xl font-bold text-gray-900">
                        {price.toFixed(2)}
                      </span>
                    </div>
                    <p className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <Check size={14} className="text-gray-500" />
                      Includes VAT & fees
                    </p>
                  </div>

                  <button
                    onClick={() => handleVehicleSelect(vehicle)}
                    className="bg-[#C7A151] hover:bg-[#b08d45] text-white font-semibold py-3 rounded-lg transition-all w-full"
                  >
                    SELECT
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

