"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminCarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/cars", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {
        setCars(data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Cars</h1>

        <Link
          href="/admin/cars/new"
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add Car
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Name</th>
              <th className="p-2">Brand</th>
              <th className="p-2">Price</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td className="p-4" colSpan="5">
                  Loading...
                </td>
              </tr>
            ) : cars.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No cars yet.
                </td>
              </tr>
            ) : (
              cars.map((car) => (
                <tr key={car._id} className="border-b">
                  <td className="p-2">{car.name}</td>
                  <td className="p-2">{car.brand}</td>
                  <td className="p-2">{car.price}</td>
                  <td className="p-2">{car.status}</td>

                  {/* ACTIONS */}
                  <td className="p-2 flex gap-2">
                    <Link
                      href={`/admin/cars/${car._id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </Link>

                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => console.log("delete", car._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
