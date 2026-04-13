"use client";

import { useState } from "react";

function AddCarPage() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setForm({ ...form, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting car:", form);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-6">Add New Car</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Car Name"
            className="border p-3 rounded w-full"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="brand"
            placeholder="Brand"
            className="border p-3 rounded w-full"
            value={form.brand}
            onChange={handleChange}
          />
        </div>

        {/* Category and Year */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="category"
            className="border p-3 rounded"
            value={form.category}
            onChange={handleChange}
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
            className="border p-3 rounded"
            value={form.year}
            onChange={handleChange}
          />
        </div>

        {/* Price and Mileage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="price"
            type="number"
            placeholder="Price (ETB)"
            className="border p-3 rounded"
            value={form.price}
            onChange={handleChange}
          />

          <input
            name="mileage"
            type="number"
            placeholder="Mileage (km)"
            className="border p-3 rounded"
            value={form.mileage}
            onChange={handleChange}
          />
        </div>

        {/* Fuel and Transmission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="fuelType"
            className="border p-3 rounded"
            value={form.fuelType}
            onChange={handleChange}
          >
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Electric</option>
            <option>Hybrid</option>
          </select>

          <select
            name="transmission"
            className="border p-3 rounded"
            value={form.transmission}
            onChange={handleChange}
          >
            <option>Manual</option>
            <option>Automatic</option>
          </select>
        </div>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          className="border p-3 rounded w-full min-h-[120px]"
          value={form.description}
          onChange={handleChange}
        />

        {/* Image Upload */}
        <div>
          <label className="block font-semibold mb-2">Upload Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            className="border p-3 rounded w-full"
            onChange={handleImageChange}
          />
          {form.images.length > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              {form.images.length} images selected
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full md:w-auto bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
        >
          Save Car
        </button>
      </form>
    </div>
  );
}

export default AddCarPage;
