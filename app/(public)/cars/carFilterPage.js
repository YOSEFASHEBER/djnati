"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CarFilter({ searchParams }) {
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.search || "");
  const [brand, setBrand] = useState(searchParams.brand || "");
  const [minPrice, setMinPrice] = useState(searchParams.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.maxPrice || "");

  const brands = ["Toyota", "Suzuki", "Hyundai", "Kia", "Nissan"];

  const applyFilter = () => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (brand) params.set("brand", brand);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    router.push(`/cars?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearch("");
    setBrand("");
    setMinPrice("");
    setMaxPrice("");

    router.push("/cars");
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 mb-6 border">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search car..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        {/* Brand */}
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">All Brands</option>
          {brands.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>

        {/* Min Price */}
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        {/* Max Price */}
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={applyFilter}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 font-semibold"
          >
            Apply
          </button>

          <button
            onClick={clearFilters}
            className="flex-1 bg-gray-200 hover:bg-gray-300 rounded-lg px-4 py-2"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
