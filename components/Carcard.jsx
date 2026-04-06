import Image from "next/image";
import Link from "next/link";

export default function CarCard({ car }) {
  let imageSrc = "/placeholder.png";
  return (
    <div className="relative w-64 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white dark:bg-gray-900">
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={car?.name || "Car Image"}
            fill
            className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
          />
        )}

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col justify-between h-40">
        <div>
          <h2 className="text-lg font-bold text-white">
            {car?.name || "Unknown Car"}
          </h2>
          <p className="text-red-500 font-extrabold mt-1">
            {car?.price ? `${car.price} ETB` : "Price not available"}
          </p>
        </div>

        <Link
          href={`/cars/${car?.id || ""}`}
          className="mt-4 text-center py-2 px-4 rounded-xl bg-white/20 backdrop-blur-md text-white font-semibold hover:bg-white/30 transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
