"use client";

import Image from "next/image";

export default function AirportTransfer() {
  const whatsappHref = "https://wa.me/41763180882?text=" + encodeURIComponent("Hello! I would like to get a quote for Airport Transfer");

  return (
    <>
      <section className="w-full relative">
        <Image
          src="/Picture1.png"
          width={2000}
          height={900}
          alt="Premium Airport Transfers"
          className="w-full h-[60vh] object-cover"
          priority
          quality={100}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/10 flex flex-col justify-center px-6 md:px-20">
          <h1 className="text-white text-4xl md:text-5xl font-bold max-w-3xl">
            Premium Airport Transfers Across Switzerland
          </h1>
          <p className="text-white/90 mt-4 max-w-2xl text-lg">
            Experience seamless, first-class travel between Switzerland’s major cities with our Luxury Intercity Transfer Service. We deliver refined, door-to-door journeys designed around comfort, punctuality, and personalized service.
          </p>
          
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-0 py-16 space-y-16">
        <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="md:w-1/2 p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Professional Meet & Greet Service</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Your chauffeur welcomes you at the airport, hotel lobby, or private residence, assists with luggage, and guides you directly to your luxury Mercedes-Benz vehicle. Every detail is managed to ensure a smooth, stress-free start.
            </p>
          </div>
          <div className="md:w-1/2 relative h-96">
            <Image src="/Pictur1.png" alt="Meet and Greet" fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="md:w-1/2 p-10 order-2 md:order-1 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Executive Transfers to All Major Cities</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Fast, comfortable transfers planned for efficiency, discretion, and reliability between Switzerland’s key destinations.
            </p>
            <ul className="list-disc pl-5 text-gray-600 leading-relaxed text-lg mt-4">
              <li>Zurich</li>
              <li>Geneva</li>
              <li>Bern</li>
              <li>Lausanne</li>
              <li>Basel</li>
              <li>Lucerne</li>
              <li>Montreux</li>
              <li>and more</li>
            </ul>
          </div>
          <div className="md:w-1/2 relative h-96 order-1 md:order-2">
            <Image src="/Vclass Gstaad.png" alt="City Transfers" fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </div>

        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden p-10">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Comfortable Travel in All Conditions</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Our fleet—Mercedes-Benz S-Class, E-Class, and V-Class—features advanced safety systems and all-weather capability for stable, comfortable travel.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">A Luxury Experience From Start to Finish</h3>
              <ul className="list-disc pl-5 text-gray-600 leading-relaxed text-lg">
                <li>Complimentary bottled water</li>
                <li>Fast WiFi</li>
                <li>Device charging</li>
                <li>Comfortable, spacious interiors</li>
                <li>Climate-controlled cabins</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Seamless Door-to-Door Service</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Tailored, punctual journeys managed end-to-end by your chauffeur—timing, navigation, and logistics for uninterrupted transfers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
