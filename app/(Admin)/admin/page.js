"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function AdminCarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const limit = 25;
  const [totalPages, setTotalPages] = useState(1);

  // ================= FETCH CARS =================
  const fetchCars = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const res = await fetch(`/api/cars?limit=${limit}&page=${pageNumber}`);

      const data = await res.json();

      setCars(data.data || []);
      setTotalPages(data.totalPages || 1);
      setPage(pageNumber);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars(1);
  }, []);

  // ================= DELETE =================
  const deleteCar = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this car?");
    if (!confirmDelete) return;

    await fetch(`/api/cars/${id}`, {
      method: "DELETE",
    });

    setCars((prev) => prev.filter((car) => car._id !== id));
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black">Manage Cars</h1>

        <Link
          href="/admin/cars/new"
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
        >
          <Plus size={18} />
          Add Car
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow border overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="p-4">Car</th>
              <th>Brand</th>
              <th>Year</th>
              <th>Price</th>
              <th>Status</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td className="p-4" colSpan="6">
                  Loading...
                </td>
              </tr>
            ) : (
              cars.map((car) => (
                <tr key={car._id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-semibold">{car.name}</td>
                  <td>{car.brand}</td>
                  <td>{car.year}</td>
                  <td>{car.price} ETB</td>

                  <td>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        car.isAvailable
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {car.isAvailable ? "Available" : "Sold"}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/cars/${car._id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={18} />
                      </Link>

                      <button
                        onClick={() => deleteCar(car._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => fetchCars(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-40"
        >
          Previous
        </button>

        <div className="text-sm font-semibold">
          Page {page} of {totalPages}
        </div>

        <button
          onClick={() => fetchCars(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
