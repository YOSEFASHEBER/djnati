//
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import CarCard from "./components/Carcard";
import CarSkeleton from "./components/CarSkeleton";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLatestCars = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/cars?limit=6&page=1", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {
        setCars(data.data);
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
      <section className="relative h-[90vh] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2025&auto=format&fit=crop"
            alt="Cars"
            fill
            priority
            className="object-cover scale-105"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
          <div className="max-w-2xl space-y-6">
            <span className="inline-flex items-center rounded-full border border-red-300 bg-red-50 px-4 py-1 text-sm font-medium text-red-600">
              Reliable & Affordable Cars
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
              Find Your Next <span className="text-red-500">Car Easily</span>
            </h1>

            <p className="text-gray-200 text-base sm:text-lg">
              Quality new and used cars you can trust in Addis Ababa with
              transparent pricing and verified condition.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/cars"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-bold rounded-2xl transition text-center"
              >
                Browse Cars
              </Link>

              <Link
                href="/contact"
                className="bg-white/90 hover:bg-white text-black px-8 py-3 font-bold rounded-2xl transition text-center"
              >
                Contact Seller
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-md border-t">
          <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 text-center">
            {[
              { label: "Cars Sold", value: "200+" },
              { label: "Happy Clients", value: "100+" },
              { label: "Years Experience", value: "5+" },
              { label: "Available Cars", value: "20+" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-xl font-bold text-slate-900">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-red-500 uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LATEST CARS ================= */}
      <section className="py-16 bg-gradient-to-br from-white via-red-50 to-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-4 py-1 text-sm font-medium text-red-600 mb-3">
                Latest Inventory
              </span>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
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

          {/* Grid */}
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
    </main>
  );
}
