"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Mail,
  Phone,
  Facebook,
  Instagram,
  Dribbble,
  X as XIcon,
} from "lucide-react";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Our Fleets", href: "/fleet" },
    // { name: "Services", href: "#services" },
    { name: "Contact", href: "/contact" },
    { name: "DAVOs", href: "/davos" },
    // { name: "FAQs", href: "/faqs" },
  ];

  const services = [
    { name: "Airport Transfers", href: "/airport-transfer" },
    { name: "Luxury Ski & Resort Transfers", href: "/ski-transfer" },
    { name: "Hourly Chauffeurs", href: "/contact" },
    { name: "Event Transportation", href: "/contact" },
    { name: "City Tours and Excursions", href: "/contact" },
    { name: "Business Chauffeur Services", href: "/contact" },
  ];

   const footerLinks = [
    // { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms-condition" },
    { name: "Impressum", href: "/impressum" },
    { name: "DAVOs", href: "/davos" },
  ];

  const handleServiceClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname === "/") {
      const serviceSection = document.getElementById("service-location-section");
      if (serviceSection) {
        serviceSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push("/");
      setTimeout(() => {
        const checkAndScroll = () => {
          const serviceSection = document.getElementById("service-location-section");
          if (serviceSection) {
            serviceSection.scrollIntoView({ behavior: "smooth" });
          } else {
            setTimeout(checkAndScroll, 50);
          }
        };
        checkAndScroll();
      }, 100);
    }
  };

  return (
    <footer className="bg-foreground text-white">
      {/* Main Section */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo + Info */}
          <div className="space-y-5">
            <Link href="/" aria-label="Home" className="inline-flex items-center">
              <Image
                src="/logo.png"
                alt="Company Logo"
                width={180}
                height={80}
                className="w-auto h-24 object-cover"
                priority
              />
            </Link>


            <div className="space-y-1 text-sm text-gray-300">
              <p className="text-[#d2dde0]">At Alpine Prestige Rides, we invite you to experience Switzerland in unparalleled comfort and style. </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-yellow-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  {service.href.startsWith("/") ? (
                    <Link
                      href={service.href}
                      className="text-sm text-gray-300 transition-colors hover:text-yellow-400"
                    >
                      {service.name}
                    </Link>
                  ) : (
                    <a
                      href={service.href}
                      onClick={handleServiceClick}
                      className="text-sm text-gray-300 transition-colors hover:text-yellow-400 cursor-pointer"
                    >
                      {service.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Payments + Contact + Social */}
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Payment Accepted</h3>
              <div className="flex flex-wrap items-center gap-2">
                <CardVisa />
                <CardMastercard />
                <CardAmex />
                <CardUnionPay />
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <a
                href="mailto:info@alpine-prestige-rides.ch"
                className="flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-yellow-400"
              >
                <Mail size={16} />
                <span>info@alpine-prestige-rides.ch</span>
              </a>
              <a
                href="tel:+41763180882"
                className="flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-yellow-400"
              >
                <Phone size={16} />
                <span>+41 76 318 08 82</span>
              </a>
            </div>

            {/* Social Media */}
            <div className="flex gap-3">
              <SocialSquare aria="Facebook" href="https://facebook.com">
                <Facebook size={18} />
              </SocialSquare>
              {/* <SocialSquare aria="X" href="https://twitter.com">
                <XIcon size={18} />
              </SocialSquare>
              <SocialSquare aria="Dribbble" href="https://dribbble.com">
                <Dribbble size={18} />
              </SocialSquare> */}
              <SocialSquare aria="Instagram" href="https://instagram.com">
                <Instagram size={18} />
              </SocialSquare>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-300 md:flex-row">
            <p>© 2025 Alpine Prestige Rides. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-6">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="transition-colors hover:text-yellow-400"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hidden link - not visible to users */}
      <div className="hidden">
        <a href="https://www.thedevsquare.com/" rel="noopener noreferrer">
          Website Development by DevSquare
        </a>
      </div>
    </footer>
  );
}

/* ---------------- Helpers ---------------- */

function SocialSquare({
  children,
  href,
  aria,
}: {
  children: React.ReactNode;
  href: string;
  aria: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={aria}
      className="
        inline-flex h-10 w-10 items-center justify-center
        rounded-lg bg-[#f2c15b] text-[#0a3d4f]
        transition-colors hover:bg-[#f7cf7c]
      "
    >
      {children}
    </a>
  );
}

/* Payment card brand chips (inline SVGs) */
function CardChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center justify-center rounded-md bg-white px-2 py-1 ring-1 ring-gray-200">
      {children}
    </span>
  );
}

function CardVisa() {
  return (
    <CardChip>
      <svg width="36" height="20" viewBox="0 0 36 20" aria-label="Visa" role="img">
        <rect width="36" height="20" rx="3" fill="#ffffff" />
        <text
          x="18"
          y="13"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, -apple-system"
          fontWeight="700"
          fontSize="10"
          fill="#1a1f71"
        >
          VISA
        </text>
      </svg>
    </CardChip>
  );
}

function CardMastercard() {
  return (
    <CardChip>
      <svg width="36" height="20" viewBox="0 0 36 20" aria-label="Mastercard" role="img">
        <rect width="36" height="20" rx="3" fill="#ffffff" />
        <circle cx="16" cy="10" r="6" fill="#ff5f00" />
        <circle cx="20" cy="10" r="6" fill="#eb001b" opacity="0.8" />
        <circle cx="12" cy="10" r="6" fill="#f79e1b" opacity="0.85" />
      </svg>
    </CardChip>
  );
}

function CardAmex() {
  return (
    <CardChip>
      <svg width="36" height="20" viewBox="0 0 36 20" aria-label="American Express" role="img">
        <rect width="36" height="20" rx="3" fill="#2e77bb" />
        <text
          x="18"
          y="13"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, -apple-system"
          fontWeight="800"
          fontSize="7.5"
          fill="#ffffff"
        >
          AMEX
        </text>
      </svg>
    </CardChip>
  );
}

function CardUnionPay() {
  return (
    <CardChip>
      <svg width="36" height="20" viewBox="0 0 36 20" aria-label="UnionPay" role="img">
        <rect width="36" height="20" rx="3" fill="#ffffff" />
        <rect x="4" y="4" width="8" height="12" rx="2" fill="#0073b4" />
        <rect x="12" y="4" width="8" height="12" rx="2" fill="#d41a1f" />
        <rect x="20" y="4" width="12" height="12" rx="2" fill="#1c938a" />
      </svg>
    </CardChip>
  );
}
