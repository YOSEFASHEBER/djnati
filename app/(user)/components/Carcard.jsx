import Image from "next/image";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";

export default function CarCard({ car }) {
  console.log(car);
  const {
    images = [],
    status = "Unavailable",
    name = "Unknown Car",
    price,
    _id,
  } = car || {};

  const isAvailable = status === "Available";

  return (
    <div className="w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white group">
      {/* Image */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <Image
          src={images[0]?.url || "/placeholder.png"}
          alt={name}
          fill
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Name + Status */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <h2 className="text-white text-lg font-bold truncate">{name}</h2>

          <span
            className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${
              status == "Available"
                ? "bg-green-500 text-white"
                : status == "Reserved"
                  ? "bg-gray-500 text-white"
                  : "bg-red-500 text-white"
            }`}
          >
            <BadgeCheck className="w-3 h-3" />
            {status}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-3">
        {/* Price */}
        <p className="text-red-500 text-xl font-extrabold">
          {price
            ? `${car?.price?.toLocaleString()} ETB`
            : "Price not available"}
        </p>

        {/* Button */}
        <Link
          href={`/cars/${_id || ""}`}
          className="w-full text-center py-2 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
