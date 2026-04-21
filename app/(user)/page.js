"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import CarCard from "./components/Carcard";
import CarSkeleton from "./components/CarSkeleton";

// ================= COUNT UP HOOK =================
function useCountUp(target, start, duration = 1400) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let current = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      current += increment;

      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, start, duration]);

  return count;
}

function Stat({ label, value, start }) {
  const count = useCountUp(value, start);

  return (
    <div className="transform transition hover:scale-105 duration-300">
      <div className="text-lg sm:text-xl font-bold text-slate-900">
        {count}+
      </div>
      <div className="text-[10px] sm:text-xs font-semibold text-red-500 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [availableCars, setAvailableCars] = useState(0);
  const [animateStats, setAnimateStats] = useState(false);

  const statsRef = useRef(null);

  // ================= OBSERVER (STATS ANIMATION) =================
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimateStats(true);
      },
      { threshold: 0.3 },
    );

    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  // ================= FETCH CARS =================
  const fetchLatestCars = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/cars?limit=6&page=1", {
        cache: "no-store",
      });
      const data = await res.json();

      if (data.success) {
        setCars(data.data);
        setAvailableCars(data.stats.available);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestCars();
  }, []);

  return (
    <main className="bg-white text-slate-900 overflow-x-hidden">
      {/* ================= HERO ================= */}
      <section className="relative min-h-[100svh] w-full overflow-hidden pt-[72px] sm:pt-[80px]">
        {/* BACKGROUND */}
        <div className="absolute inset-0 scale-105 animate-slowZoom">
          <Image
            src="https://res.cloudinary.com/dznmeumqb/image/upload/v1776802919/dj-nati-cars/bmrikyoquk5eebycuoio.png"
            alt="Cars hero"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        </div>

        {/* HERO CONTENT */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 flex items-center min-h-[calc(100svh-80px)]">
          <div className="max-w-2xl space-y-5 sm:space-y-6 pb-10">
            {/* Badge */}
            <div className="inline-flex rounded-full border border-red-300 bg-red-50 px-4 py-1 text-xs sm:text-sm font-medium text-red-600 animate-fadeUp">
              Reliable & Affordable Cars in Ethiopia
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight animate-fadeUp">
              Find Your Next <span className="text-red-500">Car Easily</span>
            </h1>

            {/* Description */}
            <p className="text-gray-200 text-sm sm:text-lg animate-fadeUp">
              Browse verified cars with transparent pricing, inspection-ready
              condition, and direct seller contact.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 animate-fadeUp">
              <Link
                href="/cars"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-bold rounded-2xl text-center transition transform hover:scale-105 active:scale-95"
              >
                Browse Cars
              </Link>

              <Link
                href="/contact"
                className="bg-white/90 hover:bg-white text-black px-6 py-3 font-bold rounded-2xl text-center transition transform hover:scale-105 active:scale-95"
              >
                Contact Seller
              </Link>
            </div>
          </div>
        </div>

        {/* SCROLL HINT (hidden small screens) */}
        <div className="hidden sm:flex absolute bottom-24 left-1/2 -translate-x-1/2 flex-col items-center text-white/70 animate-bounce">
          <span className="text-xs">Scroll</span>
          <div className="w-px h-6 bg-white/50 mt-1" />
        </div>

        {/* STATS */}
        <div
          ref={statsRef}
          className="absolute bottom-0 w-full bg-white/95 backdrop-blur-md border-t"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 md:grid-cols-4 text-center gap-4">
            <Stat label="Cars Sold" value={200} start={animateStats} />
            <Stat label="Happy Clients" value={100} start={animateStats} />
            <Stat label="Years Experience" value={5} start={animateStats} />
            <Stat
              label="Available Cars"
              value={availableCars}
              start={animateStats}
            />
          </div>
        </div>
      </section>

      {/* ================= LATEST CARS ================= */}
      <section className="py-14 sm:py-16 bg-gradient-to-br from-white via-red-50 to-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="flex justify-between items-end mb-8 sm:mb-10">
            <div className="space-y-2">
              <span className="inline-flex rounded-full border border-red-200 bg-red-50 px-4 py-1 text-xs sm:text-sm font-medium text-red-600">
                Latest Inventory
              </span>

              <h2 className="text-xl sm:text-3xl font-black text-slate-900">
                Recently Added Cars
              </h2>
            </div>

            <Link
              href="/cars"
              className="hidden md:block text-red-600 hover:text-red-700 font-semibold"
            >
              View All →
            </Link>
          </div>

          {/* GRID */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <CarSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= ANIMATIONS ================= */}
      <style jsx global>{`
        @keyframes slowZoom {
          0% {
            transform: scale(1.05);
          }
          50% {
            transform: scale(1.12);
          }
          100% {
            transform: scale(1.05);
          }
        }

        .animate-slowZoom {
          animation: slowZoom 18s ease-in-out infinite;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeUp {
          animation: fadeUp 0.8s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
