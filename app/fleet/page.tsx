import FleetCard from "@/component/cards/FleetCard";
import HeroSection2 from "@/component/sections/HeroSection2";

export default function Fleet(){
  const fleetData = [
    {
      image: "/car111.png",
      title: "Mercedes Benz E Class",
      description: "Business Class sedan with leather interior, reclining rear seats, and discreet chauffeur service ideal for executives.",
      seats: [3, 3],
      perHourRate: 85,
      perKmRate: 3.3,
      currency: "CHF",
      carId: "mercedes-e-class"
    },
    {
      image: "/car2.png",
      title: "Mercedes Benz V Class",
      description: "Van Class MPV delivering lounge-style seating, conference layout options, and generous luggage capacity for up to six guests.",
      seats: [3, 3],
      perHourRate: 100,
      perKmRate: 4,
      currency: "CHF",
      carId: "mercedes-v-class"
    },
    {
      image: "/car3.png",
      title: "Mercedes Benz S Class",
      description: "First Class limousine with executive rear package, ambient lighting, and on-board refreshments for VIP itineraries.",
      seats: [3, 3],
      perHourRate: 130,
      perKmRate: 5,
      currency: "CHF",
      carId: "mercedes-s-class"
    },
    {
      image: "/car4.png",
      title: "Genesis G80 Electrified",
      description: "Business Class all-electric sedan pairing silent zero-emission drives with cutting-edge comfort tech and USB-C suites.",
      seats: [6, 6],
      perHourRate: 85,
      perKmRate: 3.3,
      currency: "CHF",
      carId: "genesis-g80-electrified"
    }
  ];

  return(
    <>
      <HeroSection2
        title="Fleets"
        subtitle="Home // Fleets"
        bgImage="/hero.jpg"
      />
      <div className="px-4 py-12 md:py-16 bg-black">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <p
              className="text-sm md:text-base uppercase text-center mb-3"
              style={{
                color: '#C6A054',
                letterSpacing: '0.5em',
                fontWeight: 500,
              }}
            >
              Our Premium Fleet
            </p>
            <h2 className="text-3xl md:text-4xl text-white font-light tracking-wide">
              Choose Your Luxury Vehicle
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C6A054] to-transparent mx-auto mt-6"></div>
          </div>

          {/* Fleet Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fleetData.map((fleet, index) => (
              <FleetCard
                key={index}
                image={fleet.image}
                title={fleet.title}
                description={fleet.description}
                seats={fleet.seats}
                perHourRate={fleet.perHourRate}
                perKmRate={fleet.perKmRate}
                currency={fleet.currency}
                carId={fleet.carId}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}