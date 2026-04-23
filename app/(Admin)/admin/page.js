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
    available: 0,
    sold: 0,
    reserved: 0,
  });

  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);

  // ================= FETCH =================
  const fetchCars = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/cars", {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setCars(data.data || []);
      setStats(data.stats || {});
      setTotalPages(data.pagination?.totalPages || 1);
      setPage(pageNumber);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars(1);
  }, []);

  // ================= DELETE =================
  const deleteCar = async (id) => {
    const ok = confirm("Delete this car?");
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/cars/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Delete failed");

      // Optimistic UI
      setCars((prev) => prev.filter((c) => c._id !== id));

      // Optional: refresh stats after delete
      fetchCars(page);
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <Header />

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={<Car />} label="Total Cars" value={stats.total} />
        <StatCard
          icon={<CheckCircle />}
          label="Available"
          value={stats.available}
          color="green"
        />
        <StatCard
          icon={<XCircle />}
          label="Sold"
          value={stats.sold}
          color="red"
        />
        <StatCard
          icon={<Clock />}
          label="Reserved"
          value={stats.reserved}
          color="yellow"
        />
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
              <TableLoading />
            ) : cars.length === 0 ? (
              <TableEmpty />
            ) : (
              cars.map((car) => (
                <tr key={car._id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-semibold">{car.name}</td>
                  <td>{car.brand}</td>
                  <td>{car.year}</td>
                  <td>{car.price.toLocaleString()} ETB</td>

                  <td>
                    <StatusBadge status={car.status} />
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

      {/* PAGINATION */}
      <Pagination page={page} totalPages={totalPages} onChange={fetchCars} />
    </div>
  );
}

//
// ================= COMPONENTS =================
//

function Header() {
  return (
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
  );
}

function StatCard({ icon, label, value, color = "gray" }) {
  const styles = {
    gray: "bg-white",
    green: "bg-green-50 text-green-700",
    red: "bg-red-50 text-red-700",
    yellow: "bg-yellow-50 text-yellow-700",
  };

  return (
    <div className={`p-4 rounded-2xl border ${styles[color]}`}>
      <div className="flex items-center justify-between">
        {icon}
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <p className="text-sm mt-2">{label}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  if (status === "Available")
    return (
      <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">
        Available
      </span>
    );

  if (status === "Reserved")
    return (
      <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-xs">
        Reserved
      </span>
    );

  return (
    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">
      Sold
    </span>
  );
}

function TableLoading() {
  return (
    <tr>
      <td colSpan="6" className="p-6 text-center text-gray-500">
        Loading cars...
      </td>
    </tr>
  );
}

function TableEmpty() {
  return (
    <tr>
      <td colSpan="6" className="p-6 text-center text-gray-500">
        No cars found
      </td>
    </tr>
  );
}

function Pagination({ page, totalPages, onChange }) {
  return (
    <div className="flex items-center justify-between pt-4">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-40"
      >
        Previous
      </button>

      <div className="text-sm font-semibold">
        Page {page} of {totalPages}
      </div>

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
