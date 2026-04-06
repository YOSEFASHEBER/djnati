// import Image from "next/image";
// import Link from "next/link";

// export default function CarCard({ car }) {
//   let imageSrc = "/placeholder.png";
//   return (
//     <div className="relative w-64 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white dark:bg-gray-900">
//       {/* Image */}
//       <div className="relative h-40 overflow-hidden">
//         {imageSrc && (
//           <Image
//             src={imageSrc}
//             alt={car?.name || "Car Image"}
//             fill
//             className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
//           />
//         )}

//         {/* Gradient */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
//       </div>

//       {/* Info */}
//       <div className="p-4 flex flex-col justify-between h-40 bg-white dark:bg-gray-900">
//         <div>
//           <h2 className="text-lg font-bold text-gray-900 dark:text-white">
//             {car?.name || "Unknown Car"}
//           </h2>
//           <p className="text-red-500 font-extrabold mt-1">
//             {car?.price ? `${car.price} ETB` : "Price not available"}
//           </p>
//         </div>

//         <Link
//           href={`/cars/${car?.id || ""}`}
//           className="mt-4 text-center py-2 px-4 rounded-xl bg-white/20 backdrop-blur-md text-white font-semibold hover:bg-white/30 transition-colors duration-300"
//         >
//           View Details
//         </Link>
//       </div>
//     </div>
//   );
// }
import Image from "next/image";
import Link from "next/link";

export default function CarCard({ car }) {
  const imageSrc = "/placeholder.png";

  return (
    <div className="w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-900 group">
      {/* Image */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <Image
          src={imageSrc}
          alt={car?.name || "Car Image"}
          fill
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Car Name on Image */}
        <h2 className="absolute bottom-3 left-3 right-3 text-white text-lg font-bold">
          {car?.name || "Unknown Car"}
        </h2>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-3">
        {/* Price */}
        <p className="text-red-500 text-xl font-extrabold">
          {car?.price ? `${car.price} ETB` : "Price not available"}
        </p>

        {/* Button */}
        <Link
          href={`/cars/${car?.id || ""}`}
          className="w-full text-center py-2 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
