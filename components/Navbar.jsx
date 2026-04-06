"use client"; // required for useState and useEffect

import { useState, useEffect } from "react";
import Link from "next/link";
// import Image from "next/image"; // uncomment if you use logo

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Inventory", href: "/cars" },
    // { name: "Sell Your Car", href: "/sell" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md py-3 shadow-[0_4px_20px_rgba(220,38,38,0.2)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Brand Logo */}
          <div className="flex items-center group cursor-pointer">
            <div className="flex flex-col leading-tight border-l-4 border-red-600 pl-3">
              {/* Uncomment for logo */}
              {/* <Image src={logo} alt="Logo" width={50} height={50} /> */}
              <span className="text-2xl font-black tracking-tighter text-white">
                DJ NATI
              </span>
              <span className="text-xs font-bold tracking-[0.4em] text-red-600 uppercase">
                CARS
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-10">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Red Action Button */}
          <div className="hidden md:block">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-2.5 rounded-sm font-black text-xs uppercase tracking-tighter transition-all hover:italic shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
              View Available cars
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-red-600 p-2"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-screen opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-4 bg-black border border-red-900/50 p-6 rounded-lg">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-lg font-black text-white border-b border-red-900/20 pb-2 hover:text-red-600"
              >
                {item.name}
              </Link>
            ))}
            <button className="w-full bg-red-600 text-white py-4 font-black uppercase tracking-widest">
              Call Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
