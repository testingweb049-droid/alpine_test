"use client";

import Image from "next/image";

export default function SkiTransfer() {
  const whatsappHref = "https://wa.me/41763180882?text=" + encodeURIComponent("Hello! I would like to get a quote for Ski & Resort Transfer");

  return (
    <>
      <section className="w-full relative">
        <Image
          src="/backs.png"
          width={2000}
          height={900}
          alt="Luxury Ski & Resort Transfers"
          className="w-full h-[70vh] object-cover"
          priority
          quality={100}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-center px-6 md:px-20">
          <h1 className="text-white text-4xl md:text-5xl font-bold max-w-3xl">
            Luxury Ski & Resort Transfers by Alpine Prestige Rides
          </h1>
          <p className="text-white/90 mt-4 max-w-2xl text-lg">
            Premium luxury transfers to Switzerland’s most sought-after ski and mountain destinations with our V-Class and limousines—comfort, safety, and privacy.
          </p>
          
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-0 py-16 space-y-16">
        <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="md:w-1/2 p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Gateway to the Alps</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              St. Moritz, Zermatt, Verbier, Gstaad, Crans-Montana, Davos, Andermatt, Flims, Arosa, Engelberg, Grindelwald and more.
            </p>
          </div>
          <div className="md:w-1/2 relative h-96">
            <Image src="/Picture2.png" alt="Alpine Destinations" fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="md:w-1/2 p-10 order-2 md:order-1 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Equipped for Alpine Conditions</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Our fleet is equipped with winter 4MATIC all-wheel drive and cabin climate control to ensure safety and comfort in any mountain weather.
            </p>
          </div>
          <div className="md:w-1/2 relative h-96 order-1 md:order-2">
            <Image src="/Picture3.png" alt="Alpine Conditions" fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="md:w-1/2 p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Seamless Door-to-Door Comfort</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Complimentary refreshments, Wi‑Fi, and personalized cabin comfort upon arrival. Your journey is a private oasis.
            </p>
          </div>
          <div className="md:w-1/2 relative h-96">
            <Image src="/Picture111.jpg" alt="Door-to-Door Comfort" fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </div>

        <div className="flex justify-center">
          <a
            href="/contact"
            className="bg-[#C6A054] hover:bg-[#B08F45] text-white font-bold py-4 px-12 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            REQUEST A QUOTE
          </a>
        </div>
      </div>
    </>
  );
}
