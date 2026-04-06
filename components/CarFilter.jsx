"use client";

import { useState } from "react";

export default function CarFilter({ onFilter }) {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const brands = ["Toyota", "Suzuki", "Hyundai", "Kia", "Nissan"];

  const handleFilter = () => {
    onFilter({
      search,
      brand,
      minPrice,
      maxPrice,
    });
  };

  const clearFilters = () => {
    setSearch("");
    setBrand("");
    setMinPrice("");
    setMaxPrice("");
    onFilter({});
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search car..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full"
        />

        {/* Brand */}
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full"
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
          className="border rounded-lg px-3 py-2 w-full"
        />

        {/* Max Price */}
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full"
        />

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleFilter}
            className="flex-1 bg-red-500 text-white rounded-lg px-4 py-2 font-semibold"
          >
            Apply
          </button>

          <button
            onClick={clearFilters}
            className="flex-1 bg-gray-200 rounded-lg px-4 py-2"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
