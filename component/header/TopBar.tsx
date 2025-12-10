"use client";

import { useEffect, useState } from "react";
import { phoneInfo } from "@/utils/data";
import { FaFacebookF, FaPhoneAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6"; // WhatsApp icon
import { usePathname } from "next/navigation";

export default function TopBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    if (isHomePage) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
    } else {
      setIsScrolled(true);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <div className="border-b border-[#898787]">
      <div
        className={`z-50 w-full text-white transition-colors duration-300 py-2 px-24 flex items-center justify-between ${
          isHomePage
            ? isScrolled
              ? "bg-black/20 backdrop-blur-[4px]"
              : "md:bg-black/20 bg-none backdrop-blur-[4px]"
            : "bg-foreground backdrop-blur-sm"
        }`}
      >
        {/* Left side - phone number */}
        <div className="flex items-center gap-2 text-sm">
          <FaPhoneAlt className="text-white" />
          <a
            href={`tel:${phoneInfo.number}`}
            className="hover:text-white/80 transition-colors"
            aria-label={phoneInfo.label}
          >
            {phoneInfo.number}
          </a>
        </div>

        {/* Right side - Social icons */}
        <div className="flex items-center gap-3">
          {/* WhatsApp */}
          <a
            href="https://wa.me/41763180882"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="bg-white text-black rounded-full p-1 hover:bg-gray-200 transition"
          >
            <FaWhatsapp className="h-4 w-4" />
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="bg-white text-black rounded-full p-1 hover:bg-gray-200 transition"
          >
            <FaFacebookF className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
