"use client";

import Image from "next/image";
import { useState, useMemo, useRef, useEffect } from "react";
import axiosInstance from "@/lib/axios/axiosInstance";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Davos() {
  const router = useRouter();
  const heroImages = [
    "/responsive_large_gGXW4l9_vjpwbkYD_m73FSjE1_-VZyY13onnVZ1eBNk.jpg",
    "/cittyscape-pas-de-la-casa-encamp-andorra (1).jpg",
    "/ChatGPT Image Dec 7, 2025, 01_36_54 AM.png",
  ];
  const [currentHero, setCurrentHero] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroImages.length]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const minDate = useMemo(() => {
    const d = new Date();
    const iso = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString();
    return iso.split("T")[0];
  }, []);

  const formRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.service || !formData.date) {
      toast.error("Please fill all required fields");
      return;
    }

    const today = minDate;
    if (formData.date < today) {
      toast.error("Please choose a future date");
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        service: formData.service,
        date: formData.date,
        message: formData.message || "",
      };

      await axiosInstance.post("/davos-quote", payload);
      toast.success("Quote request submitted by email");
      setFormData({ name: "", email: "", phone: "", service: "", date: "", message: "" });
      router.push("/davos/submitted");
    } catch {
      toast.error("Failed to submit quote. Try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#060111]">
      {/* HERO SECTION */}
      <section className="w-full relative">
        <div className="relative h-[90vh]">
          {heroImages.map((src, idx) => (
            <Image
              key={src}
              src={src}
              alt="Davos VIP Vehicles"
              fill
              sizes="100vw"
              className={`object-cover transition-opacity duration-700 ${idx === currentHero ? "opacity-100" : "opacity-0"}`}
              priority={idx === 0}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-black/40 z-10 flex flex-col justify-center px-6 md:px-20">
          <h1 className="text-white text-4xl md:text-5xl font-bold max-w-2xl">
            Premium Chauffeur Service for the WEF in Davos
          </h1>
          <p className="text-white/90 mt-4 max-w-xl text-md">
            Exclusive, discreet and reliable chauffeur service for WEF participants – arrive safely and comfortably with Alpine Prestige.
          </p>

          {/* WhatsApp Quote Button */}
          <div className="mt-8 flex items-center gap-4">
           
            <button
              type="button"
              onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className=" inline-flex items-center gap-2 bg-[#C6A054] hover:bg-[#B08F45] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg"
            >
              Fulfill the form for Davos quotation
            </button>
             <a
              href="https://wa.me/41763180882?text=Hello! I would like to get a quote for Davos transportation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-transparnet border hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.189-1.248-6.189-3.515-8.447" />
              </svg>
              Get Instant Quote on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <div className="bg-[#060111] py-16 px-6 rounded-2xl " ref={formRef}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Fulfill the form for Davos quotation
            </h2>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Complete the form below and our team will contact you within 24 hours with a personalized quote for your WEF transportation needs.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-white">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full text-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A054] focus:border-transparent transition-all duration-300"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A054] focus:border-transparent transition-all duration-300"
                placeholder="Enter your email"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-white">
                Phone Number (optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A054] focus:border-transparent transition-all duration-300"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Service Type */}
            <div className="space-y-2">
              <label htmlFor="service" className="block text-sm font-medium text-white">
                Service Required *
              </label>
              <select
                id="service"
                name="service"
                required
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 border text-white border-gray-300 rounded-lg focus:ring-2 bg-black focus:ring-[#C6A054] focus:border-transparent transition-all duration-300"
              >
                <option value="">Select a service</option>
                <option value="airport-transfer">Airport Transfer</option>
                <option value="daily-transportation">Daily Transportation</option>
                <option value="event-transportation">Event Transportation</option>
                <option value="group-transportation">Group Transportation</option>
                <option value="executive-service">Executive Service</option>
              </select>
            </div>

            {/* Date */}
            <div className="space-y-2">
  <label
    htmlFor="date"
    className="block text-sm font-medium text-white"
  >
    Service Date *
  </label>

  <input
    type="date"
    id="date"
    name="date"
    required
    min={minDate}
    value={formData.date}
    onChange={handleChange}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg 
      text-white bg-transparent
      focus:ring-2 focus:ring-[#C6A054] focus:border-transparent 
      transition-all duration-300
      [&::-webkit-calendar-picker-indicator]:opacity-100 
      [&::-webkit-calendar-picker-indicator]:invert"
  />
</div>
 

            {/* Message - Full Width */}
            <div className="md:col-span-2 space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-white">
                Additional Requirements
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A054] focus:border-transparent transition-all duration-300"
                placeholder="Tell us about your specific requirements, number of passengers, special requests, etc."
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#C6A054] hover:bg-[#B08F45] text-white font-bold py-4 px-12 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit for quote (by e-mail)"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-0 py-16 space-y-16 ">

        {/* SECTION 1 */}
        <div className="flex flex-col md:flex-row bg-[#130E1E] shadow-2xl rounded-2xl overflow-hidden">
          <div className="md:w-1/2 p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Accredited WEF Access</h2>
            <p className="text-[#A1A1A1] leading-relaxed text-lg">
              We hold official WEF vehicle permits and driver security
              clearances, granting unrestricted access to Congress Centre
              zones, secured hotels, and restricted areas. Our chauffeurs follow
              updated security protocols to ensure your schedule runs smoothly.
            </p>
          </div>
          <div className="md:w-1/2 relative h-96 p-6">
            <Image
              src="/Davos S-class.png"
              alt="WEF Accredited Vehicle"
              fill
              className="object-cover rounded-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* SECTION 2 */}
        <div className="flex flex-col md:flex-row bg-[#130E1E] shadow-2xl rounded-2xl overflow-hidden">
          <div className="md:w-1/2 p-10 order-2 md:order-1 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Luxury Fleet for Alpine Conditions</h2>
            <p className="text-[#A1A1A1] leading-relaxed text-lg">
              Our fleet includes Mercedes-Benz S-Class, E-Class, and
              V-Class models, each equipped for alpine driving. Complimentary
              Wi-Fi, charging ports, refreshments, and privacy options ensure
              comfort for VIP delegations.
            </p>
          </div>
          <div className="md:w-1/2 relative h-96 order-1 md:order-2">
            <Image
              src="/Davos V-class with clients.png"
              alt="Luxury Van Davos"
              fill
              className="object-cover rounded-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* SECTION 3 */}
        <div className="flex flex-col md:flex-row bg-[#130E1E] shadow-2xl rounded-2xl overflow-hidden">
          <div className="md:w-1/2 p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Seamless Airport–Davos Transfers</h2>
            <p className="text-[#A1A1A1] leading-relaxed text-lg">
              We offer fast, direct transfers from Zurich, Geneva, Munich,
              St. Gallen, and Altenrhein airports. With priority access,
              real-time monitoring, and experienced drivers, we guarantee
              smooth travel to Davos during peak WEF traffic.
            </p>
          </div>
          <div className="md:w-1/2 relative h-96">
            <Image
              src="/Vclass Gstaad.png"
              alt="Airport Transfer Davos"
              fill
              className="object-cover rounded-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>


      </div>
    </div>
  );
}
