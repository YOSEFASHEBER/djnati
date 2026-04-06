// import CarCard from "./CarCard";
// import Link from "next/link";

// export default function AvailableCars() {
//   const cars = [
//     {
//       id: 1,
//       name: "Mercedes-Benz G-Wagon",
//       price: 150000,
//       year: 2024,
//       transmission: "Auto",
//       fuelType: "Petrol",
//       image: [
//         "https://res.cloudinary.com/demo/image/upload/c_scale,w_500/v1610123456/car2.jpg",
//       ],
//     },
//     {
//       id: 2,
//       name: "Range Rover Sport",
//       price: 95000,
//       year: 2023,
//       transmission: "Auto",
//       fuelType: "Diesel",
//       image: [
//         "https://res.cloudinary.com/demo/image/upload/c_scale,w_500/v1610123456/car1.jpg",
//       ],
//     },
//     {
//       id: 3,
//       name: "Toyota Land Cruiser",
//       price: 85000,
//       year: 2022,
//       transmission: "Auto",
//       fuelType: "Petrol",
//       image: [
//         "https://res.cloudinary.com/demo/image/upload/c_scale,w_500/v1610123456/car3.jpg",
//       ],
//     },
//     {
//       id: 4,
//       name: "BMW X5",
//       price: 120000,
//       year: 2023,
//       transmission: "Auto",
//       fuelType: "Petrol",
//       image: [
//         "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=500",
//       ],
//     },
//     {
//       id: 5,
//       name: "Audi Q7",
//       price: 110000,
//       year: 2022,
//       transmission: "Auto",
//       fuelType: "Diesel",
//       image: [
//         "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?q=80&w=500",
//       ],
//     },
//   ];
// const [currentPage, setCurrentPage] = useState(1);

// const carsPerPage = 20;

// const indexOfLastCar = currentPage * carsPerPage;
// const indexOfFirstCar = indexOfLastCar - carsPerPage;

// const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

// const totalPages = Math.ceil(cars.length / carsPerPage);

//   return (
//     <section className="py-20 bg-black px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-end mb-12">
//           <div>
//             <p className="text-3xl md:text-4xl font-black text-green-500 uppercase">
//               Available
//             </p>
//           </div>
//         </div>

//         {/* Car Grid */}
//         <div className="flex justify-center min-w-full">
//           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
//             {cars.map((car) => (
//               <CarCard key={car.id} car={car} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useState } from "react";
import CarCard from "@/components/CarCard";

export default function CarsPage() {
  // 🔹 Fake data (replace with API later)
  const cars = Array.from({ length: 95 }, (_, i) => ({
    id: i + 1,
    name: `Car ${i + 1}`,
    price: 1000000 + i * 50000,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 20;

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;

  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(cars.length / carsPerPage);

  return (
    <div className="p-6">
      {/* Cars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-2 flex-wrap">
        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                currentPage === num
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
              }`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
