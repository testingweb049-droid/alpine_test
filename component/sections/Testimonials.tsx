'use client';

import React, { useState, useEffect } from 'react';

// Define the type for a single testimonial object
interface Testimonial {
    quote: string;
    name: string;
}

// Data for the testimonials
const testimonialsData: Testimonial[] = [
    {
        quote: "Alpine Prestige Rides exceeded my expectations with their flawless service and elegant vehicles. From booking to drop-off, everything was smooth and professional. Highly recommended for anyone seeking a luxury ride and beautiful world of luxury — from sleek interiors and premium seating to polished exteriors and cutting-edge comfort.",
        name: "Jane Williams"
    },
    {
        quote: "The chauffeur was punctual, courteous, and drove impeccably. The vehicle was spotless and incredibly comfortable. It truly elevates the travel experience. A top-tier service that I will definitely use again for my business travel needs.",
        name: "Michael Chen"
    },
    {
        quote: "An exceptional service! Booking was easy, communication was clear, and the ride itself was luxurious and relaxing. It's clear they prioritize the client's experience above all else. Five stars well deserved.",
        name: "Sarah Kim"
    }
];

const Testimonials: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const totalTestimonials = testimonialsData.length;

    // Auto-slide functionality
    useEffect(() => {
        const interval = setInterval(() => {
            nextTestimonial();
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [currentIndex]);

    // Function to navigate to the next testimonial
    const nextTestimonial = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % totalTestimonials);
                setIsAnimating(false);
            }, 300);
        }
    };

    // Function to navigate to the previous testimonial
    const prevTestimonial = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex - 1 + totalTestimonials) % totalTestimonials);
                setIsAnimating(false);
            }, 300);
        }
    };

    const currentTestimonial = testimonialsData[currentIndex];

    return (
        <section className="bg-gradient-to-b from-[#0a0a0f] to-[#050508] md:py-20 py-12 px-4 md:px-8 font-sans overflow-hidden">
            <div className="container mx-auto px-4 text-center  md:mb-16">
                <p
                    className="text-sm md:text-base uppercase text-center mb-3"
                    style={{
                        color: '#C6A054',
                        letterSpacing: '0.4em',
                        fontWeight: 500,
                    }}
                >
                    TESTIOMONIALS
                </p>

               <h2 className="text-xl md:text-4xl lg:text-5xl text-white font-light tracking-wide leading-tight">
  Client's Experiences With Our Premier{' '}
  <span className="md:block inline">
    Chauffeur Services
  </span>
</h2>

                <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#C6A054] to-transparent mx-auto mt-6"></div>
            </div>

            <div className="relative max-w-7xl mx-auto min-h-[400px] flex items-center justify-center px-4">
                {/* Background decorative cards */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* Back card 1 */}
                    <div
                        className="absolute w-[85%] lg:w-[75%] h-48 bg-gradient-to-br from-[#1a1520] to-[#120d18] rounded-2xl border border-[#2a2432] opacity-40"
                        style={{
                            transform: "scale(0.88)",
                        }}
                    />
                    {/* Back card 2 */}
                    <div
                        className="absolute w-[90%] lg:w-[82%] h-56 bg-gradient-to-br from-[#1e1926] to-[#15111c] rounded-2xl border border-[#2d2938] opacity-60"
                        style={{
                            transform: "scale(0.94)",
                        }}
                    />
                </div>

                {/* Main testimonial card */}
                <div
                    className={`relative w-full lg:w-[90%] max-w-4xl mx-auto bg-[#130E1E] border border-[#3a3545] rounded-2xl shadow-2xl p-8 md:p-12 transition-all duration-500 ease-in-out ${
                        isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                    }`}
                    style={{
                        zIndex: 10,
                        boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(198, 160, 84, 0.1)',
                    }}
                >
                    {/* Quote icon */}
                    <div className="mb-6">
                        <svg width="50" height="35" viewBox="0 0 43 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_2783_6092)">
                                <path d="M17.273 -8.01086e-05C17.273 0.55492 17.317 1.01992 17.253 1.46892C17.226 1.65992 17.003 1.86492 16.82 1.97992C15.933 2.54292 14.97 2.99292 14.143 3.63892C11.467 5.73092 9.88097 8.48492 9.79397 12.0629C9.76997 13.0779 10.144 13.3329 10.996 12.9359C13.459 11.7939 16.108 12.4639 17.521 14.5859C19.062 16.9019 18.845 19.9859 16.998 22.0079C14.64 24.5899 10.758 24.6679 8.08097 22.1999C6.47797 20.7219 5.71597 18.8139 5.52597 16.6429C4.88897 9.37192 8.53597 3.37792 15.175 0.744921C15.832 0.484921 16.505 0.27092 17.273 -8.01086e-05Z" fill="#C6A054" opacity="0.8" />
                            </g>
                            <g clipPath="url(#clip1_2783_6092)">
                                <path d="M36.273 -8.01086e-05C36.273 0.55492 36.317 1.01992 36.253 1.46892C36.226 1.65992 36.003 1.86492 35.82 1.97992C34.933 2.54292 33.97 2.99292 33.143 3.63892C30.467 5.73092 28.881 8.48492 28.794 12.0629C28.77 13.0779 29.144 13.3329 29.996 12.9359C32.459 11.7939 35.108 12.4639 36.521 14.5859C38.062 16.9019 37.845 19.9859 35.998 22.0079C33.64 24.5899 29.758 24.6679 27.081 22.1999C25.478 20.7219 24.716 18.8139 24.526 16.6429C23.889 9.37192 27.536 3.37792 34.175 0.744921C34.832 0.484921 35.505 0.27092 36.273 -8.01086e-05Z" fill="#C6A054" opacity="0.8" />
                            </g>
                            <defs>
                                <clipPath id="clip0_2783_6092">
                                    <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 -1 24 24)" />
                                </clipPath>
                                <clipPath id="clip1_2783_6092">
                                    <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 -1 43 24)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>

                    {/* Testimonial text */}
                    <p className="text-gray-200 leading-relaxed text-[10px] md:text-lg md:mb-8 mb-4 font-light">
                        {currentTestimonial.quote}
                    </p>

                    {/* Author name */}
                    <p className="text-[#C6A054] font-medium text-lg">
                        {currentTestimonial.name}
                    </p>
                </div>

                {/* Navigation arrows for desktop */}
                <div className="lg:flex hidden items-center justify-between absolute inset-x-0 px-4">
                    {/* LEFT ARROW */}
                    <button
                        onClick={prevTestimonial}
                        disabled={isAnimating}
                        className="flex items-center justify-center h-12 w-12 bg-white hover:bg-[#C6A054] text-black hover:text-white rounded transition-all duration-300 z-20 shadow-lg disabled:opacity-50"
                        style={{ transform: 'translateX(-50%)' }}
                    >
                        <svg width="10" height="16" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.13395 1.06021L6.07295 0.00021553L0.29395 5.77722C0.200796 5.86978 0.126867 5.97986 0.0764193 6.10111C0.0259713 6.22236 0 6.35239 0 6.48372C0 6.61504 0.0259713 6.74507 0.0764193 6.86632C0.126867 6.98757 0.200796 7.09765 0.29395 7.19021L6.07295 12.9702L7.13295 11.9102L1.70895 6.48521L7.13395 1.06021Z" fill="currentColor" />
                        </svg>
                    </button>

                    {/* RIGHT ARROW */}
                    <button
                        onClick={nextTestimonial}
                        disabled={isAnimating}
                        className="flex items-center justify-center h-12 w-12 bg-white hover:bg-[#C6A054] text-black hover:text-white rounded transition-all duration-300 z-20 shadow-lg disabled:opacity-50"
                        style={{ transform: 'translateX(50%)' }}
                    >
                        <svg width="10" height="16" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.45199 7.06021L3.51299 6.00022L9.29199 11.7772C9.38514 11.8698 9.45907 11.9799 9.50952 12.1011C9.55997 12.2224 9.58594 12.3524 9.58594 12.4837C9.58594 12.615 9.55997 12.7451 9.50952 12.8663C9.45907 12.9876 9.38514 13.0976 9.29199 13.1902L3.51299 18.9702L2.45299 17.9102L7.87699 12.4852L2.45199 7.06021Z" fill="currentColor" />
                        </svg>
                    </button>
                </div>

                {/* Dot indicators for mobile */}
                <div className="lg:hidden absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                    {testimonialsData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            disabled={isAnimating}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentIndex
                                    ? 'bg-[#C6A054] scale-125'
                                    : 'bg-white/30 hover:bg-white/50'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;