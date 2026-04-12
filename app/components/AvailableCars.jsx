"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, CarFront } from "lucide-react";
import CarCard from "./Carcard";

export default function CarsPage() {
  // Temporary fake data (replace with backend API later)
  const cars = Array.from({ length: 95 }, (_, i) => ({
    id: i + 1,
    name: `Premium Car ${i + 1}`,
    price: 1000000 + i * 50000,
    year: 2020 + (i % 5),
    status: "Available",
    transmission: "Automatic",
    fuelType: i % 2 === 0 ? "Petrol" : "Diesel",
    image: [
      "http://res.cloudinary.com/demo/image/upload/c_scale,w_500/v1610123456/car2.jpg",
    ],
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 20;

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;

  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(cars.length / carsPerPage);

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-red-50 to-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1 text-sm font-medium text-red-600 mb-5">
            <CarFront className="w-4 h-4" />
            Available Inventory
          </span>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            Explore Our Premium Cars
          </h1>

          <p className="text-slate-600 text-lg leading-relaxed">
            Browse trusted used vehicles and premium new arrivals carefully
            selected for quality, style, and performance.
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-16">
          <div className="flex items-center gap-3 flex-wrap bg-white border border-slate-200 shadow-xl rounded-3xl p-4 sm:p-5">
            {/* Prev Button */}
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              Prev
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`w-12 h-12 rounded-2xl font-bold transition-all ${
                  currentPage === num
                    ? "bg-red-600 text-white shadow-lg shadow-red-200"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {num}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
