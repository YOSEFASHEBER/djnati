"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCarPage() {
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
  });

  const [preview, setPreview] = useState([]);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= HANDLE IMAGES =================
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setForm((prev) => ({
      ...prev,
      images: files,
    }));

    // preview images (frontend only)
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreview(previews);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (key === "images") {
          form.images.forEach((img) => {
            formData.append("images", img);
          });
        } else {
          formData.append(key, form[key]);
        }
      });

      await fetch("/api/cars", {
        method: "POST",
        body: formData,
      });

      alert("Car added successfully!");
      router.push("/admin/cars");
    } catch (err) {
      console.log(err);
      alert("Error adding car");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow border p-6 sm:p-8 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-black text-gray-900">Add New Car</h1>
        <p className="text-gray-500 mt-1">
          Fill in the details below to list a new car
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* GRID 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Car Name"
            value={form.name}
            onChange={handleChange}
            className="input"
          />

          <input
            name="brand"
            placeholder="Brand"
            value={form.brand}
            onChange={handleChange}
            className="input"
          />
        </div>

        {/* GRID 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            type="number"
            placeholder="Year"
            value={form.year}
            onChange={handleChange}
            className="input"
          />

          <input
            name="mileage"
            type="number"
            placeholder="Mileage (km)"
            value={form.mileage}
            onChange={handleChange}
            className="input"
          />
        </div>

        {/* GRID 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="price"
            type="number"
            placeholder="Price (ETB)"
            value={form.price}
            onChange={handleChange}
            className="input"
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

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Car Description"
          value={form.description}
          onChange={handleChange}
          className="input min-h-[140px]"
        />

        {/* IMAGE UPLOAD */}
        <div className="space-y-3">
          <label className="font-semibold text-gray-700">Upload Images</label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="input"
          />

          {/* PREVIEW */}
          {preview.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
              {preview.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  className="h-24 w-full object-cover rounded-lg border"
                />
              ))}
            </div>
          )}
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition"
        >
          Save Car
        </button>
      </form>

      {/* INPUT STYLE (GLOBAL CLASS IDEA) */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          outline: none;
          transition: 0.2s;
        }

        .input:focus {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
        }
      `}</style>
    </div>
  );
}
