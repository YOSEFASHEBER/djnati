"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// ================= TOAST =================
function Toast({ message, type }) {
  return (
    <div
      className={`fixed top-5 right-5 px-5 py-3 rounded-xl shadow-lg text-white font-semibold z-50 animate-slide ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  );
}

export default function EditCarPage({ params }) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "Sedan",
    price: "",
    year: "",
    fuelType: "Petrol",
    transmission: "Manual",
    mileage: "",
    description: "",
    images: [],
    status: "Available",
  });

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // ================= VALIDATION =================
  const isValid =
    form.name.trim() &&
    form.brand.trim() &&
    form.price &&
    !isNaN(Number(form.price)) &&
    form.year &&
    !isNaN(Number(form.year)) &&
    form.description.trim() &&
    form.images.length > 0;

  // ================= TOAST FUNCTION =================
  const showToast = (msg, type = "success") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ================= LOAD CAR =================
  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/admin/check", {
        credentials: "include",
      });

      if (!res.ok) {
        window.location.href = "/login";
      }
    };

    checkAuth();

    const fetchCar = async () => {
      try {
        const res = await fetch(`/api/admin/cars/${params.id}`);
        const data = await res.json();

        const car = data.data;

        setForm({
          name: car.name || "",
          brand: car.brand || "",
          category: car.category || "Sedan",
          price: car.price || "",
          year: car.year || "",
          fuelType: car.fuelType || "Petrol",
          transmission: car.transmission || "Manual",
          mileage: car.mileage || "",
          description: car.description || "",
          images: car.images || [],
          status: car.status || "Available",
        });
      } catch (err) {
        showToast("Failed to load car", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [params.id]);

  // ================= INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= REMOVE IMAGE =================
  const handleRemoveImage = async (img) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((image) => image.public_id !== img.public_id),
    }));

    await fetch("/api/admin/delete-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_id: img.public_id }),
    });
  };

  // ================= UPLOAD =================
  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 10) {
      showToast("Max 10 images allowed", "error");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    setUploading(true);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        showToast("Upload failed", "error");
        return;
      }

      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...data.urls],
      }));

      showToast("Images uploaded");
    } catch (err) {
      showToast("Upload error", "error");
    } finally {
      setUploading(false);
    }
  };

  // ================= UPDATE =================
  const updateCar = async () => {
    if (!isValid || uploading) return;

    setSaving(true);

    try {
      const res = await fetch(`/api/admin/cars/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.error || "Update failed", "error");
        return;
      }

      showToast("Car updated successfully 🚀");

      setTimeout(() => {
        router.push("/admin/cars");
      }, 1200);
    } catch (err) {
      showToast("Something went wrong", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-6">Loading car...</p>;

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow border p-6 space-y-6">
      <h1 className="text-3xl font-black">Edit Car</h1>

      {/* BASIC INFO */}
      <div className="grid md:grid-cols-2 gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="input"
          placeholder="Car Name"
        />
        <input
          name="brand"
          value={form.brand}
          onChange={handleChange}
          className="input"
          placeholder="Brand"
        />
      </div>

      {/* DETAILS */}
      <div className="grid md:grid-cols-3 gap-4">
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="input"
        >
          <option>Sedan</option>
          <option>SUV</option>
          <option>Hatchback</option>
          <option>Truck</option>
        </select>

        <input
          name="year"
          value={form.year}
          onChange={handleChange}
          className="input"
          placeholder="Year"
        />
        <input
          name="mileage"
          value={form.mileage}
          onChange={handleChange}
          className="input"
          placeholder="Mileage"
        />
      </div>

      {/* PRICE + FUEL */}
      <div className="grid md:grid-cols-2 gap-4">
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          className="input"
          placeholder="Price"
        />

        <select
          name="fuelType"
          value={form.fuelType}
          onChange={handleChange}
          className="input"
        >
          <option>Petrol</option>
          <option>Diesel</option>
          <option>Electric</option>
          <option>Hybrid</option>
        </select>
      </div>

      {/* TRANSMISSION */}
      <select
        name="transmission"
        value={form.transmission}
        onChange={handleChange}
        className="input"
      >
        <option>Manual</option>
        <option>Automatic</option>
      </select>

      {/* STATUS */}
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="input"
      >
        <option>Available</option>
        <option>Reserved</option>
        <option>Sold</option>
      </select>

      {/* DESCRIPTION */}
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        className="input min-h-[140px]"
        placeholder="Description"
      />

      {/* UPLOAD */}
      <input type="file" multiple accept="image/*" onChange={handleUpload} />
      {uploading && <p className="text-blue-500">Uploading...</p>}

      {/* IMAGES */}
      {form.images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {form.images.map((img, i) => (
            <div key={i} className="relative">
              <img
                src={img.url}
                className="h-24 w-full object-cover rounded-lg border"
              />
              <button
                onClick={() => handleRemoveImage(img)}
                className="absolute top-1 right-1 bg-black text-white rounded-full px-2"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* BUTTON */}
      <button
        onClick={updateCar}
        disabled={!isValid || uploading || saving}
        className={`w-full py-3 rounded-xl font-bold transition ${
          !isValid || uploading
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-red-500 text-white hover:bg-red-600"
        }`}
      >
        {saving ? "Updating..." : "Update Car"}
      </button>

      {/* TOAST */}
      {toast && <Toast message={toast.message} type={toast.type} />}

      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
        }

        .input:focus {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
        }

        @keyframes slide {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide {
          animation: slide 0.3s ease;
        }
      `}</style>
    </div>
  );
}
