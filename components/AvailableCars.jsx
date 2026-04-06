import CarCard from "./CarCard";
import Link from "next/link";

export default function AvailableCars() {
  const cars = [
    {
      id: 1,
      name: "Mercedes-Benz G-Wagon",
      price: 150000,
      year: 2024,
      transmission: "Auto",
      fuelType: "Petrol",
      image: [
        "https://res.cloudinary.com/demo/image/upload/c_scale,w_500/v1610123456/car2.jpg",
      ],
    },
    {
      id: 2,
      name: "Range Rover Sport",
      price: 95000,
      year: 2023,
      transmission: "Auto",
      fuelType: "Diesel",
      image: [
        "https://res.cloudinary.com/demo/image/upload/c_scale,w_500/v1610123456/car1.jpg",
      ],
    },
    {
      id: 3,
      name: "Toyota Land Cruiser",
      price: 85000,
      year: 2022,
      transmission: "Auto",
      fuelType: "Petrol",
      image: [
        "https://res.cloudinary.com/demo/image/upload/c_scale,w_500/v1610123456/car3.jpg",
      ],
    },
    {
      id: 4,
      name: "BMW X5",
      price: 120000,
      year: 2023,
      transmission: "Auto",
      fuelType: "Petrol",
      image: [
        "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=500",
      ],
    },
    {
      id: 5,
      name: "Audi Q7",
      price: 110000,
      year: 2022,
      transmission: "Auto",
      fuelType: "Diesel",
      image: [
        "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?q=80&w=500",
      ],
    },
  ];

  return (
    <section className="py-20 bg-black px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-3xl md:text-4xl font-black text-green-500 uppercase">
              Available
            </p>
          </div>
        </div>

        {/* Car Grid */}
        <div className="flex justify-center min-w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
