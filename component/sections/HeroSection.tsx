"use client";

import { useEffect, useState, useMemo } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
  type TargetAndTransition,
} from "framer-motion";
import ContentSection from "./ContentSection";
import BookingSection from "./BookingSection";

function buildVariants(
  sideDesktop: "left" | "right",
  sideMobile: "up" | "down",
  isMdUp: boolean,
  prefersReducedMotion: boolean,
  delay: number
): Variants {
  const hidden: TargetAndTransition = prefersReducedMotion
    ? { opacity: 0 }
    : isMdUp
    ? sideDesktop === "left"
      ? { opacity: 0, x: -60 }
      : { opacity: 0, x: 60 }
    : sideMobile === "up"
    ? { opacity: 0, y: -40 }
    : { opacity: 0, y: 40 };

  const show: TargetAndTransition = prefersReducedMotion
    ? { opacity: 1, transition: { duration: 0.2 } }
    : {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { type: "spring", stiffness: 60, damping: 14, delay },
      };

  return { hidden, show };
}

export default function HeroSection() {
  const [isMdUp, setIsMdUp] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsMdUp(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const leftVariants = useMemo(
    () => buildVariants("left", "up", isMdUp, !!prefersReducedMotion, 0.05),
    [isMdUp, prefersReducedMotion]
  );

  return (
    <section className="relative md:flex md:min-h-[100vh] md:items-center bg-cover bg-center md:pt-24 pt-32 px-0 md:px-20">
      {/* Mobile Background */}
      <div
        className="absolute inset-0 bg-cover bg-center md:hidden"
        style={{ backgroundImage: "url('/aaa.png')" }}
        aria-hidden
      />

      {/* Desktop Background */}
      <div
        className="absolute inset-0 bg-cover bg-center hidden md:block"
        style={{ backgroundImage: "url('/aaa.png')" }}
        aria-hidden
      />

      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/40 bg-opacity-50" aria-hidden />

      {/* Content Wrapper */}
      <div className="relative z-10 w-full ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* LEFT SIDE → ContentSection */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={leftVariants}
            className="flex flex-col justify-center gap-6"
          >
            {/* Top = Content */} 
            <div className="w-full">
              {/* Mobile Title */}
              <h6 className="block text-2xl font-semibold uppercase tracking-tight text-white md:hidden px-4">
                Alpine Prestige Rides LuXury Chauffeur Services
              </h6>

              {/* Desktop Content */}
              <div className="hidden md:block">
                <ContentSection />
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE EMPTY */}
          <div />
        </div>

        {/* Full Width Booking Section */}
        <div className="w-full md:mt-40 mt:8 px-4 md:px-0">
          <BookingSection />
        </div>
      </div>
    </section>
  );
}
