"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FiltersClient() {
  const router = useRouter();
  const params = useSearchParams();

  const [search, setSearch] = useState("");

  const updateQuery = (key, value) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set(key, value);
    router.push(`/cars?${newParams.toString()}`);
  };

  return (
    <div className="flex gap-3 flex-wrap bg-white p-4 rounded-2xl shadow">
      <input
        placeholder="Search cars..."
        className="border p-2 rounded-xl"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          updateQuery("search", e.target.value);
        }}
      />

      <select
        className="border p-2 rounded-xl"
        onChange={(e) => updateQuery("category", e.target.value)}
      >
        <option value="">All</option>
        <option value="SUV">SUV</option>
        <option value="Sedan">Sedan</option>
      </select>
    </div>
  );
}
