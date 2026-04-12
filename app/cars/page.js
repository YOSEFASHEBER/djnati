//
"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "@/app/hooks/useDebounce";
import { ArrowLeft, ArrowRight, CarFront, Search, Filter } from "lucide-react";

import CarCard from "../components/Carcard";
import CarSkeleton from "../components/CarSkeleton";

export default function CarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const limit = 12;

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const debouncedSearch = useDebounce(search, 600);
  const [totalPages, setTotalPages] = useState(1);

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const fetchCars = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        page,
        limit,
        search: debouncedSearch,
        category,
        minPrice,
        maxPrice,
      });

      const res = await fetch(`/api/cars?${params}`, {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {
        setCars(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [page, debouncedSearch, category, minPrice, maxPrice]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= HEADER ================= */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1 text-sm font-medium text-red-600 mb-4">
            <CarFront className="w-4 h-4" />
            Available Inventory
          </span>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            Explore Premium Cars
          </h1>

          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
            Browse carefully selected vehicles with transparent pricing and
            quality assurance.
          </p>
        </div>

        {/* ================= MOBILE TOP BAR ================= */}
        <div className="md:hidden flex items-center gap-2 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              placeholder="Search cars..."
              className="w-full pl-9 p-2 border rounded-xl bg-white shadow-sm"
            />
          </div>

          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="p-2 bg-black text-white rounded-xl shadow"
          >
            <Filter />
          </button>
        </div>

        {/* ================= MOBILE FILTER PANEL ================= */}
        {showMobileFilters && (
          <div className="md:hidden bg-white border rounded-2xl p-4 mb-6 shadow-lg space-y-3">
            <select
              className="w-full p-2 border rounded-xl"
              value={category}
              onChange={(e) => {
                setPage(1);
                setCategory(e.target.value);
              }}
            >
              <option value="">All Categories</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Truck">Truck</option>
            </select>

            <input
              type="number"
              placeholder="Min Price"
              className="w-full p-2 border rounded-xl"
              value={minPrice}
              onChange={(e) => {
                setPage(1);
                setMinPrice(e.target.value);
              }}
            />

            <input
              type="number"
              placeholder="Max Price"
              className="w-full p-2 border rounded-xl"
              value={maxPrice}
              onChange={(e) => {
                setPage(1);
                setMaxPrice(e.target.value);
              }}
            />
          </div>
        )}

        <div className="flex gap-8">
          {/* ================= SIDEBAR (DESKTOP) ================= */}
          <aside className="hidden md:block w-80">
            <div className="bg-white border rounded-3xl p-6 shadow-lg sticky top-28">
              <h2 className="text-xl font-bold mb-6 text-slate-900">Filters</h2>

              <input
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
                placeholder="Search cars..."
                className="w-full p-2 border rounded-xl mb-4"
              />

              <select
                className="w-full p-2 border rounded-xl mb-4"
                value={category}
                onChange={(e) => {
                  setPage(1);
                  setCategory(e.target.value);
                }}
              >
                <option value="">All Categories</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Truck">Truck</option>
              </select>

              <input
                type="number"
                placeholder="Min Price"
                className="w-full p-2 border rounded-xl mb-3"
                value={minPrice}
                onChange={(e) => {
                  setPage(1);
                  setMinPrice(e.target.value);
                }}
              />

              <input
                type="number"
                placeholder="Max Price"
                className="w-full p-2 border rounded-xl"
                value={maxPrice}
                onChange={(e) => {
                  setPage(1);
                  setMaxPrice(e.target.value);
                }}
              />
            </div>
          </aside>

          {/* ================= MAIN ================= */}
          <main className="flex-1">
            {/* GRID */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <CarSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                  <CarCard key={car._id} car={car} />
                ))}
              </div>
            )}

            {/* PAGINATION */}
            <div className="flex justify-center mt-12 gap-2 flex-wrap">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className="px-3 py-2 bg-white border rounded-xl shadow-sm"
              >
                <ArrowLeft />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (num) => (
                  <button
                    key={num}
                    onClick={() => setPage(num)}
                    className={`px-3 py-2 border rounded-xl ${
                      page === num ? "bg-red-600 text-white shadow" : "bg-white"
                    }`}
                  >
                    {num}
                  </button>
                ),
              )}

              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className="px-3 py-2 bg-white border rounded-xl shadow-sm"
              >
                <ArrowRight />
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// import CarCard from "../components/Carcard";
// import FiltersClient from "../components/FiltersClient";
// import { connectDB } from "@/app/lib/mongodb";
// import Car from "@/app/lib/Car.model";

// export const dynamic = "force-dynamic"; // always fresh

// async function getCars(searchParams) {
//   await connectDB();

//   const page = Number(searchParams.page || 1);
//   const limit = Number(searchParams.limit || 12);

//   const search = searchParams.search || "";
//   const category = searchParams.category || "";
//   const minPrice = searchParams.minPrice || 0;
//   const maxPrice = searchParams.maxPrice || 999999999;

//   const query = {
//     ...(search && {
//       $text: { $search: search },
//     }),
//     ...(category && { category }),
//     price: { $gte: minPrice, $lte: maxPrice },
//   };

//   const cars = await Car.find(query)
//     .sort({ createdAt: -1 }) // 🔥 latest first (SEO + UX)
//     .skip((page - 1) * limit)
//     .limit(limit);

//   const total = await Car.countDocuments(query);

//   return {
//     cars: JSON.parse(JSON.stringify(cars)),
//     totalPages: Math.ceil(total / limit),
//   };
// }

// export default async function CarsPage({ searchParams }) {
//   const { cars, totalPages } = await getCars(searchParams);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-white pt-24">
//       {/* SEO HEADER */}
//       <div className="max-w-7xl mx-auto px-4">
//         <h1 className="text-3xl font-black text-slate-900 mb-2">
//           Buy Used & New Cars in Ethiopia
//         </h1>
//         <p className="text-slate-600 mb-6">
//           Explore verified cars with transparent pricing and condition.
//         </p>

//         {/* CLIENT FILTERS */}
//         <FiltersClient />
//       </div>

//       {/* GRID (SEO CONTENT HERE) */}
//       <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
//         {cars.map((car) => (
//           <CarCard key={car._id} car={car} />
//         ))}
//       </div>
//     </div>
//   );
// }
