import React from 'react';
import Image from 'next/image';
import Button from '../button/PrimaryButton';

const largeChauffeurImage = '/Desktop image (1).png';
const smallChauffeurImage = '/ser2.png';

const ServiceSection: React.FC = () => {
  return (
    <section
      className="bg-secondary text-white py-16 md:py-24"
      style={{ fontFamily: 'sans-serif' }}
    >
      {/* ========================================
        Top Heading Section
      ======================================== */}
      <div className="container mx-auto px-4 text-center mb-12 md:mb-16">
       <p
  className="text-sm md:text-base uppercase text-center mb-2"
  style={{
    color: '#C6A054',           // elegant gold tone
    letterSpacing: '0.5em',     // wide spacing between letters
    wordSpacing: '',         // extra spacing between words
    fontWeight: 500,            // slightly bold for luxury look
  }}
>
  LUXURY CHAUFFEUR SERVICES
</p>

        <h2 className="text-xl md:text-4xl font-light tracking-wide">
  Step into a world of comfort and class, your trusted{' '}
  <span className="md:block inline">
    destination for exclusive chauffeur rides.
  </span>
</h2>

                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-600 to-transparent mx-auto mt-6"></div>

      </div>

      {/* ========================================
        Image & Content Layout
      ======================================== */}
      <div className="container mx-auto px-4">
        {/* Responsive Image Section */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/11]  overflow-hidden shadow-2xl">
          <Image
            src="/backs.png"
            alt="Businessman reading newspaper in back of luxury chauffeur car"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* ========================================
          Text Block Section
        ======================================== */}
     <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-16 pt-10 md:pt-16 items-start">
  {/* Left Text and Button */}
  <div>
    <h3 className="text-3xl md:text-4xl font-light leading-snug md:mb-6">
      Premier Chauffeur Solutions for a Refined Travel Experience
    </h3>
    <div className='hidden md:block'>

    {/* <Button label="Learn More" className="text-white font-normal px-6 py-1" /> */}
    </div>
  </div>

  {/* Elegant Vertical Gradient Divider */}
  <div
    className="hidden md:block w-px h-40 mx-auto"
    style={{
      background:
        'linear-gradient(to bottom, rgba(184,134,11,0), #b8860b, rgba(184,134,11,0))',
    }}
  ></div>

  {/* Right Description */}
  <div>
    <p className="text-gray-300 leading-relaxed text-base">
      Step into a world of comfort and class with Sky X, your trusted destination for exclusive chauffeur-driven rides. 
      Our luxury fleet, managed by trained professional drivers, ensures you travel with ease, safety, and style. 
      Whether it’s a business meeting, airport transfer, or a special occasion, Sky X delivers the ultimate first-class experience.
    </p>
  </div>
  <div className='block md:hidden'>

    <Button label="Learn More" className="text-white font-normal px-6 py-1" />
    </div>
</div>


      </div>
    </section>
  );
};

export default ServiceSection;
