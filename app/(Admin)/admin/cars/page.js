"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Pencil, Trash2, Plus, LogOut } from "lucide-react";

// ================= DELETE MODAL =================
function DeleteModal({ open, onClose, onConfirm, loading }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl animate-scaleIn">
        <h2 className="text-xl font-bold mb-2 text-red-600">Delete Car 🚨</h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this car? This action cannot be
          undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-white ${
              loading ? "bg-red-300" : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminCarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const limit = 12;
  const [totalPages, setTotalPages] = useState(1);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include", // 🔥 important
      });

      window.location.href = "/login";
    } catch (err) {
      console.log(err);
    }
  };

  // ================= MODAL STATE =================
  const [selectedCar, setSelectedCar] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // ================= FETCH =================
  const fetchCars = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const res = await fetch(`/api/cars?limit=${limit}&page=${pageNumber}`);
      const data = await res.json();

      setCars(data.data || []);
      setTotalPages(Math.ceil(data.stats.total / limit) || 1);
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
  const confirmDelete = async () => {
    if (!selectedCar) return;

    setDeleteLoading(true);

    try {
      await fetch(`/api/admin/cars/${selectedCar._id}`, {
        method: "DELETE",
        credentials: "include", // 🔥 VERY IMPORTANT
      });

      // Optimistic UI
      setCars((prev) => prev.filter((car) => car._id !== selectedCar._id));

      setSelectedCar(null);
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  // ================= STATUS STYLE =================
  const getStatusStyle = (status) => {
    if (status === "Available") return "bg-green-100 text-green-600";
    if (status === "Reserved") return "bg-yellow-100 text-yellow-600";
    return "bg-red-100 text-red-600";
  };

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center">
          {/* <h1 className="text-2xl font-black">Manage Cars</h1> */}

          {/* <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-black transition"
          >
            <LogOut size={18} />
            Logout
          </button> */}
        </div>

        <Link
          href="/admin/cars/new"
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
        >
          <Plus size={18} />
          Add Car
        </Link>
      </div>

      {/* GRID */}
      {loading ? (
        <p>Loading...</p>
      ) : cars.length === 0 ? (
        <p>No cars found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => {
            const image = car.images?.[0]?.url || "/placeholder.png";

            return (
              <div
                key={car._id}
                className="bg-white rounded-2xl shadow border overflow-hidden hover:shadow-lg transition"
              >
                {/* IMAGE */}
                <div className="relative h-52 w-full">
                  <Image
                    src={image}
                    alt={car.name}
                    fill
                    className="object-cover"
                  />

                  <span
                    className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-full font-semibold ${getStatusStyle(
                      car.status,
                    )}`}
                  >
                    {car.status}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="p-4 space-y-2">
                  <h2 className="font-bold text-lg">{car.name}</h2>
                  <p className="text-sm text-gray-500">
                    {car.brand} • {car.year}
                  </p>
                  <p className="text-red-500 font-bold">
                    {car.price.toLocaleString()} ETB
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex border-t">
                  <Link
                    href={`/admin/cars/${car._id}`}
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-blue-600 hover:bg-blue-50"
                  >
                    <Pencil size={18} />
                    Update
                  </Link>

                  <button
                    onClick={() => setSelectedCar(car)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-red-600 hover:bg-red-50 border-l"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* PAGINATION */}
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

      {/* DELETE MODAL */}
      <DeleteModal
        open={!!selectedCar}
        onClose={() => setSelectedCar(null)}
        onConfirm={confirmDelete}
        loading={deleteLoading}
      />

      {/* ANIMATION */}
      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scaleIn {
          animation: scaleIn 0.2s ease;
        }
      `}</style>
    </div>
  );
}
