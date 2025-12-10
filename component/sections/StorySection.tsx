import Image from "next/image";

export default function StorySection() {
  return (
    <section className="w-full bg-black text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT — FULL IMAGE (Desktop Order) */}
        <div className="hidden md:block">
        <div className="w-full flex justify-center md:justify-start order-2 md:order-1">
          <div className="w-[90%] md:w-[85%]">
            <Image
              src="/storyleft.png"
              alt="Our Story"
              width={700}     
              height={600}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
</div>
        {/* RIGHT CONTENT (Mobile shows first with heading, then image below) */}
        <div className="space-y-6 order-1 md:order-2">
          {/* Heading Section */}
          <div className="text-left mb-8 md:mb-12">
            <p
              className="text-sm md:text-base uppercase mb-2"
              style={{
                color: "#C6A054",
                letterSpacing: "0.5em",
                fontWeight: 500,
              }}
            >
              Our Story
            </p>

            <h2 className="text-3xl md:text-4xl font-light tracking-wide">
              Our Mission & Values
            </h2>

            <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-yellow-600 to-transparent mt-6"></div>
          </div>

          {/* Image appears here on mobile only */}
          <div className="md:hidden w-full flex justify-center mb-6">
            <div className="w-[90%]">
              <Image
                src="/storyleft.png"
                alt="Our Story"
                width={700}     
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Content Text */}
          <p className="text-gray-300 leading-relaxed text-sm md:text-base font-light">
            At Alpine Prestige Rides, our mission is to redefine luxury travel across Switzerland. 
            With over seven years of experience, we provide premium chauffeur and private tour services 
            focused on comfort, elegance, and discretion. Guided by our core values of excellence, 
            integrity, and hospitality, we go beyond transportation — creating personalized, seamless 
            journeys that exceed expectations.
            <br />
            Swiss Precision & Hospitality
            <br />
            Every detail of our service embodies the spirit of Switzerland — renowned for its precision, 
            punctuality, and warmth. From meticulously maintained vehicles to perfectly timed arrivals, we 
            take pride in delivering flawless experiences with a personal touch.
          </p>
        </div>

      </div>
    </section>
  );
}