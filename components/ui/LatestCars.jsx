import Link from "next/link";
import CarCard from "./CarCard";

export default function LatestCars({ cars }) {
  return (
    <section className="py-16 bg-gradient-to-br from-white via-red-50 to-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div className="space-y-2">
            <span className="inline-flex rounded-full border border-red-200 bg-red-50 px-4 py-1 text-sm font-medium text-red-600">
              Latest Inventory
            </span>

            <h2 className="text-3xl font-black text-slate-900">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
