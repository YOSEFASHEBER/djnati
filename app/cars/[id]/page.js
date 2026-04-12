// import React from "react";

// async function page() {
//   const car = await getCar(params.id);
//   if (!car) return notFound();

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-white via-red-50 to-white pt-24">
//       <div className="max-w-6xl mx-auto px-4">
//         {/* ================= TOP SECTION ================= */}
//         <div className="grid md:grid-cols-2 gap-10">
//           {/* IMAGE */}
//           <div className="rounded-3xl overflow-hidden shadow-xl border bg-white">
//             <Image
//               src={car.image?.[0] || "/placeholder.png"}
//               alt={car.name}
//               width={800}
//               height={600}
//               className="w-full h-[400px] object-cover"
//               priority
//             />
//           </div>

//           {/* INFO */}
//           <div className="space-y-5">
//             <h1 className="text-3xl font-black text-slate-900">{car.name}</h1>

//             <p className="text-slate-600">
//               {car.description || "No description available"}
//             </p>

//             {/* PRICE */}
//             <div className="text-2xl font-bold text-red-600">
//               {car.price?.toLocaleString()} ETB
//             </div>

//             {/* BADGES */}
//             <div className="flex flex-wrap gap-2 text-sm">
//               <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
//                 {car.status}
//               </span>
//               <span className="px-3 py-1 bg-slate-100 rounded-full">
//                 {car.category}
//               </span>
//               <span className="px-3 py-1 bg-slate-100 rounded-full">
//                 {car.fuelType}
//               </span>
//               <span className="px-3 py-1 bg-slate-100 rounded-full">
//                 {car.transmission}
//               </span>
//             </div>

//             {/* CTA BUTTONS */}
//             <div className="flex flex-col gap-3 pt-4">
//               <a
//                 href="https://wa.me/2519XXXXXXX"
//                 className="bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-2xl font-bold transition"
//               >
//                 Contact via WhatsApp
//               </a>

//               <a
//                 href="/cars"
//                 className="bg-black hover:bg-gray-800 text-white text-center py-3 rounded-2xl font-bold transition"
//               >
//                 Back to Listings
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* ================= DETAILS SECTION ================= */}
//         <div className="mt-16 bg-white border rounded-3xl p-6 shadow-lg">
//           <h2 className="text-2xl font-bold mb-4">Vehicle Details</h2>

//           <div className="grid sm:grid-cols-2 gap-4 text-slate-700">
//             <p>
//               <strong>Brand:</strong> {car.brand || "N/A"}
//             </p>
//             <p>
//               <strong>Model:</strong> {car.model || "N/A"}
//             </p>
//             <p>
//               <strong>Year:</strong> {car.year || "N/A"}
//             </p>
//             <p>
//               <strong>Category:</strong> {car.category || "N/A"}
//             </p>
//             <p>
//               <strong>Fuel Type:</strong> {car.fuelType || "N/A"}
//             </p>
//             <p>
//               <strong>Transmission:</strong> {car.transmission || "N/A"}
//             </p>
//           </div>
//         </div>

//         {/* ================= SEO CONTENT SECTION ================= */}
//         <div className="mt-12 text-slate-600 text-sm leading-relaxed">
//           <h2 className="text-xl font-bold text-slate-900 mb-2">
//             About this car
//           </h2>

//           <p>
//             This {car.name} is available in Ethiopia with verified condition,
//             competitive pricing, and full inspection history. It is suitable for
//             daily driving, family use, and long-distance travel.
//           </p>
//         </div>
//       </div>
//     </main>
//   );
// }
// export default page;

import Image from "next/image";
import { notFound } from "next/navigation";
import { connectDB } from "@/app/lib/mongodb";
import Car from "@/app/lib/Car.model";

export const dynamic = "force-dynamic";

// ✅ THIS FUNCTION MUST EXIST BEFORE USING IT
async function getCar(id) {
  await connectDB();

  const car = await Car.findById(id).lean();

  if (!car) return null;

  return JSON.parse(JSON.stringify(car));
}

// SEO metadata
export async function generateMetadata({ params }) {
  const car = await getCar(params.id);

  if (!car) {
    return {
      title: "Car Not Found",
    };
  }

  return {
    title: `${car.name} | Car For Sale`,
    description: car.description?.slice(0, 160) || "Buy this car in Ethiopia",
    openGraph: {
      title: car.name,
      images: car.image?.[0] ? [car.image[0]] : [],
    },
  };
}

export default async function CarDetailPage({ params }) {
  const car = await getCar(params.id);

  if (!car) return notFound();

  return (
    <main className="min-h-screen pt-24 bg-gradient-to-br from-white via-red-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10">
          {/* IMAGE */}
          <div className="rounded-3xl overflow-hidden border shadow-lg bg-white">
            <Image
              src={car.image?.[0] || "/placeholder.png"}
              alt={car.name}
              width={800}
              height={600}
              className="w-full h-[400px] object-cover"
              priority
            />
          </div>

          {/* INFO */}
          <div className="space-y-4">
            <h1 className="text-3xl font-black">{car.name}</h1>

            <p className="text-slate-600">{car.description}</p>

            <div className="text-2xl font-bold text-red-600">
              {car.price?.toLocaleString()} ETB
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
