// import Hero from "@/components/ui/Hero";
// import LatestCars from "@/components/ui/LatestCars";
// import StatsSection from "@/components/ui/StatsSection";

import HeroSection from "@/components/hero/HeroSection";
import LatestCars from "@/components/ui/LatestCars";
import { connectDB } from "@/lib/mongodb";
import Car from "@/models/Car";

// export default async function HomePage() {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
//   const res = await fetch(`${baseUrl}/api/cars?limit=6&page=1`, {
//     cache: "no-store",
//   });

//   const data = await res.json();

//   return (
//     <main className="bg-white text-slate-900 overflow-x-hidden">
//       <Hero />

//       <StatsSection availableCars={data.stats?.available || 0} />

//       <LatestCars cars={data.data || []} />
//     </main>
//   );
// }

export const metadata = {
  title: "DJ Nati Cars | Buy Cars in Ethiopia",
  description:
    "Browse verified cars in Ethiopia with transparent pricing and trusted sellers.",
};

async function getLatestCars() {
  await connectDB();

  const cars = await Car.find({}).sort({ createdAt: -1 }).limit(6).lean();

  const availableCars = await Car.countDocuments();

  return { cars, availableCars };
}

export default async function HomePage() {
  const { cars, availableCars } = await getLatestCars();

  return (
    <main className="bg-white text-slate-900 overflow-x-hidden">
      <HeroSection availableCars={availableCars} />
      <LatestCars cars={cars} />
    </main>
  );
}
