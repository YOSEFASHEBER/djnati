"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Pencil,
  Trash2,
  Plus,
  Car,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

export default function AdminCarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    filteredTotal: 0,
    available: 0,
    sold: 0,
    reserved: 0,
  });
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);

  const fetchCars = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const res = await fetch(`/api/cars?limit=${limit}&page=${pageNumber}`);
      const data = await res.json();
      console.log(data.stats.total);

      setCars(data.data || []);
      setStats(data.stats || {});
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

  const deleteCar = async (id) => {
    if (!confirm("Delete this car?")) return;

    await fetch(`/api/admin/cars/${id}`, { method: "DELETE" });

    setCars((prev) => prev.filter((car) => car._id !== id));
  };

  // ================= DASHBOARD STATS =================
  // const totalCars = cars.length;
  // const available = cars.filter((c) => c.status === "Available").length;
  // const sold = cars.filter((c) => c.status === "Sold").length;
  // const reserved = cars.filter((c) => c.status === "Reserved").length;

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black">DJ Nati Dashboard</h1>
          <p className="text-gray-500 text-sm">Manage your car inventory</p>
        </div>

        <Link
          href="/admin/cars/new"
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800"
        >
          <Plus size={18} />
          Add Car
        </Link>
      </div>

      {/* ================= KPI CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow border">
          <div className="flex items-center justify-between">
            <Car className="text-gray-500" />
            <span className="text-2xl font-bold">{stats.total}</span>
          </div>
          <p className="text-gray-500 text-sm mt-2">Total Cars</p>
        </div>

        <div className="bg-green-50 p-4 rounded-2xl border">
          <div className="flex items-center justify-between">
            <CheckCircle className="text-green-600" />
            <span className="text-2xl font-bold text-green-700">
              {stats.available}
            </span>
          </div>
          <p className="text-green-600 text-sm mt-2">Available</p>
        </div>

        <div className="bg-red-50 p-4 rounded-2xl border">
          <div className="flex items-center justify-between">
            <XCircle className="text-red-600" />
            <span className="text-2xl font-bold text-red-700">
              {stats.sold}
            </span>
          </div>
          <p className="text-red-600 text-sm mt-2">Sold</p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-2xl border">
          <div className="flex items-center justify-between">
            <Clock className="text-yellow-600" />
            <span className="text-2xl font-bold text-yellow-700">
              {stats.reserved}
            </span>
          </div>
          <p className="text-yellow-600 text-sm mt-2">Reserved</p>
        </div>
      </div>

      {/* ================= TABLE ================= */}
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
                        car.status === "Available"
                          ? "bg-green-100 text-green-600"
                          : car.status === "Reserved"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                      }`}
                    >
                      {car.status}
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
