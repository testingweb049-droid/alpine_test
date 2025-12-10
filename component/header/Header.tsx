"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { HiMenu, HiOutlineX } from "react-icons/hi";
import { navItems } from "@/utils/data";
import { usePathname } from "next/navigation";
// import TopBar from "./TopBar";

// ✅ Framer Motion Variants (fixed typing issue)
const sidebarVariants: Variants = {
  initial: { x: "100vw" },
  animate: { x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { x: "100vw", transition: { duration: 0.3, ease: "easeIn" } },
};

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname() ?? "/";

  // Normalize path
  const normalize = (p?: string | null) => {
    if (!p) return "/";
    const cleaned = p.replace(/\/+$/, "");
    return cleaned === "" ? "/" : cleaned;
  };

  const isActive = (href?: string | null) => normalize(pathname) === normalize(href);
  const toggleMobileMenu = () => setIsMobileMenuOpen((s) => !s);

  // Scroll background effect
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHomePage = normalize(pathname) === "/";
  const bgClass = isHomePage
    ? isScrolled
      ? "bg-black/20 backdrop-blur-[4px]"
      : "md:bg-black/20 bg-none backdrop-blur-[4px]"
    : "bg-foreground backdrop-blur-sm";

  return (
    <header className={`${isHomePage ? " fixed left-0 right-0 top-0 z-50" : "relative"}`}>
      {/* Top bar (desktop only) */}
      {/* <div className="hidden md:block">
        <TopBar />
      </div> */}

      {/* Main header */}
      <div className={`${bgClass} transition-colors duration-300`}>
        <div className=" md:px-24 px-4 py-2 flex items-center justify-between">
          {/* Left: Logo */}
          <a href="/" aria-label="Home" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Company Logo"
              width={140}
              height={60}
              className="h-20 w-auto object-contain"
              priority
            />
          </a>

          {/* Right: Navigation (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item: any) => {
              const linkActive = isActive(item.href);
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={` font-semibold${
                    linkActive ? " text-white" : " text-white"
                  } hover:text-primary transition-colors px-2 py-2 text-md`}
                  aria-current={linkActive ? "page" : undefined}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile: Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <HiOutlineX size={26} /> : <HiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-y-0 right-0 z-40 w-3/4 max-w-sm bg-primary/95 shadow-lg md:hidden overflow-y-auto p-6"
            variants={sidebarVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <span className="text-white/80 text-sm">Menu</span>
                <button
                  onClick={toggleMobileMenu}
                  className="text-white p-2"
                  aria-label="Close menu"
                >
                  <HiOutlineX size={24} />
                </button>
              </div>

              <nav className="flex-1">
                {navItems.map((item: any) => {
                  const linkActive = isActive(item.href);
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      className={`block py-2 text-lg font-medium ${
                        linkActive ? "text-yellow-400 font-semibold" : "text-white"
                      } hover:text-yellow-300 transition-colors`}
                      onClick={toggleMobileMenu}
                      aria-current={linkActive ? "page" : undefined}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay background */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMobileMenu}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
