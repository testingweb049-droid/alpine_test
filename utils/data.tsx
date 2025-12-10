import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

export const navItems = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About", href: "/about" },
  { id: "fleet", label: "Our Fleet", href: "/fleet" },
  { id: "davos", label: "DAVOs", href: "/davos" },
  { id: "contact", label: "Contact", href: "/contact" },
 { 
    id: "phone", 
    label: "+41 76 318 08 82", 
    href: "tel:+41763180882"   // This opens dialer on mobile/desktop
  },
  // { id: "blog", label: "Our Fleet", href: "/fleet" },
  // { id: "faqs", label: "FAQs", href: "/faqs" },
];


export const phoneInfo = {
  number: "+41 76 318 08 82",
  label: "Call us"
};

export const socialLinks = [
  {
    href: "https://facebook.com",
    icon: <FaFacebookF size={18} />,
    label: "Visit our Facebook"
  },
  {
    href: "https://twitter.com",
    icon: <FaTwitter size={18} />,
    label: "Visit our Twitter"
  },
  {
    href: "https://instagram.com",
    icon: <FaInstagram size={18} />,
    label: "Visit our Instagram"
  },
  {
    href: "https://linkedin.com",
    icon: <FaLinkedinIn size={18} />,
    label: "Visit our LinkedIn"
  }
];


export const quickLinks = [
  { label: "About Us", href: "#" },
  { label: "Our Fleet", href: "#" },
  { label: "Blog", href: "#" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "#" }
];

export const contactInfo = [
  { text: "Spitalstrasse 31, Schlieren, 8952, Switzerland", icon: <FaLocationDot size={18} /> },
  {
    text: "+41 76 318 08 82", icon: <FaPhoneAlt size={18} />
  },
  {
    text: "info@alpine-prestige-rides.ch", icon: <IoMdMail size={18} />
  },
];
