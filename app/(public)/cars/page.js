// import { connectDB } from "@/lib/mongodb";

import { connectDB } from "@/lib/mongodb";
import Car from "@/models/Car";
import CarsClient from "./components/CarsClient";

// import Car from "@/models/Car";
// import CarsClient from "./components/CarsClient";

// export const metadata = {
//   title: "Cars For Sale | Premium Car Marketplace",
//   description:
//     "Browse our curated collection of premium cars with transparent pricing and quality assurance.",
// };

// export default async function CarsPage({ searchParams }) {
//   await connectDB();

//   const page = Number(searchParams?.page) || 1;
//   const limit = 12;

//   const query = {};

//   if (searchParams.search) {
//     query.$or = [
//       { name: { $regex: searchParams?.search, $options: "i" } },
//       { brand: { $regex: searchParams?.search, $options: "i" } },
//     ];
//   }

//   if (searchParams.category) query.category = searchParams?.category;

//   if (searchParams?.minPrice || searchParams?.maxPrice) {
//     query.price = {};
//     if (searchParams?.minPrice)
//       query.price.$gte = Number(searchParams?.minPrice);
//     if (searchParams?.maxPrice)
//       query.price.$lte = Number(searchParams?.maxPrice);
//   }

//   const total = await Car.countDocuments(query);

//   const cars = await Car.find(query)
//     .sort({ createdAt: -1 })
//     .skip((page - 1) * limit)
//     .limit(limit)
//     .lean();

//   return (
//     <CarsClient
//       cars={JSON.parse(JSON.stringify(cars))}
//       totalPages={Math.ceil(total / limit)}
//       page={page}
//       searchParams={searchParams}
//     />
//   );
// }

// 🔥 CACHE CONFIG (Next.js App Router)
export const revalidate = 60; // cache for 60 seconds

export default async function CarsPage({ searchParams }) {
  // ✅ FIX: searchParams is async in new Next.js
  const params = await searchParams;

  const page = Number(params?.page) || 1;
  const limit = 12;

  const query = {};

  // ================= FILTERS =================
  if (params?.search) {
    query.$or = [
      { name: { $regex: params.search, $options: "i" } },
      { brand: { $regex: params.search, $options: "i" } },
    ];
  }

  if (params?.category) {
    query.category = params.category;
  }

  if (params?.brand) {
    query.brand = params.brand;
  }

  if (params?.minPrice || params?.maxPrice) {
    query.price = {};
    if (params.minPrice) query.price.$gte = Number(params.minPrice);
    if (params.maxPrice) query.price.$lte = Number(params.maxPrice);
  }

  await connectDB();

  // ================= OPTIMIZED QUERIES =================
  const [cars, total] = await Promise.all([
    Car.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(), // 🔥 faster (no mongoose overhead)

    Car.countDocuments(query),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <CarsClient
      initialData={{
        data: JSON.parse(JSON.stringify(cars)),
        pagination: { totalPages },
      }}
    />
  );
}
