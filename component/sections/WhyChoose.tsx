import React from 'react';
import { DollarSign, Clock, MapPin, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function WhyChoose() {
  const features = [
    {
      icon: DollarSign,
      title: "Best Rate Guarantee",
      description: "Enjoy premium service at competitive rates — luxury that fits your budget."
    },
    {
      icon: Clock,
      title: "Always Available",
      description: "Our professional chauffeurs are ready to serve you 24/7 across the Switzerland."
    },
    {
      icon: MapPin,
      title: "Nationwide Coverage",
      description: "Whether it's a local trip or cross-city journey, we offers reliable service."
    },
    {
      icon: CheckCircle,
      title: "Punctual & Reliable Service",
      description: "We ensure every pickup and drop-off happens right on schedule."
    }
  ];

  return (
    <section className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/backs.png')" }}
        ></div>

        <div className="absolute inset-0 bg-black/50 z-10"></div>

        <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-black via-black/10 to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black via-black/80 to-transparent z-10"></div>
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black/50 via-black/20 to-transparent z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 h-full min-h-screen">
        <div className="max-w-7xl mx-auto h-full gap-12 flex items-center">
          
    <div className='hidden md:block'>  
<div className="w-1/2 flex flex-col h-screen justify-center ">
  {/* <div className="relative w-48 h-48 md:w-60 md:h-60 ">
    <Image
      src="/chooseLogo.png"
      alt="choose"
      fill
      className="object-contain transition-transform duration-500 hover:scale-110"
    />
  </div> */}
</div>
</div>

          {/* RIGHT SIDE PANEL */}
          <div className="absolute right-0 top-0 bottom-0 md:w-1/2 w-full bg-black/10 backdrop-blur-[4px]">
            <div className="h-full flex flex-col justify-center pl-12 pr-8 md:pl-16 md:pr-12 lg:pl-20 lg:pr-16 py-12 space-y-10">

              {/* Header */}
              <div>
                <p
                  className="text-xs md:text-sm uppercase mb-4 tracking-widest font-light"
                  style={{ color: '#C6A054', letterSpacing: '0.4em' }}
                >
                  WHY CHOOSE US
                </p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-tight">
                  Why Select Us For Your Journey
                </h2>
                        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-600 to-transparent mx-auto mt-6"></div>

              </div>

              {/* Features List */}
              <div className="space-y-0 w-full">
                {features.map((feature, index) => (
                  <div key={index} className="group">
                    <div className="flex items-start gap-4 md:gap-5 py-5 md:py-6 border-b border-gray-700/30 last:border-b-0">

                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div
                          className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                          style={{ borderColor: '#C6A054', backgroundColor: 'rgba(198, 160, 84, 0.15)' }}
                        >
                          <feature.icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: '#C6A054' }} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-0.5">
                        <h3 className="text-sm md:text-base lg:text-lg font-normal mb-1.5 md:mb-2 text-white">
                          {feature.title}
                        </h3>
                        <p className="text-gray-400 text-xs md:text-sm lg:text-base leading-relaxed font-light">
                          {feature.description}
                        </p>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
