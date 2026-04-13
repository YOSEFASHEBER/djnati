"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditCarPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "Sedan",
    price: "",
    year: "",
    fuelType: "Petrol",
    transmission: "Manual",
    mileage: "",
    status: "Available",
    description: "",
    images: [],
  });

  /* ================= FETCH CAR ================= */
  const fetchCar = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/cars/${id}`, {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {
        setForm({
          ...data.data,
          images: data.data.images || [],
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCar();
  }, [id]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (form.images.length + files.length > 10) {
      alert("Maximum 10 images allowed");
      return;
    }

    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const removeImage = (index) => {
    const updated = [...form.images];
    updated.splice(index, 1);
    setForm({ ...form, images: updated });
  };

  /* ================= SAVE (UI ONLY) ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    console.log("UPDATED DATA:", form);

    setTimeout(() => {
      setSaving(false);
      alert("Car updated (UI only)");
      router.push("/admin/cars");
    }, 700);
  };

  if (loading) return <div className="p-6">Loading car data…</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-6">Edit Car</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* NAME + BRAND */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Car Name"
            className="border p-3 rounded"
          />

          <input
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="border p-3 rounded"
          />
        </div>

        {/* CATEGORY + YEAR */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border p-3 rounded"
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
            type="number"
            placeholder="Year"
            className="border p-3 rounded"
          />
        </div>

        {/* PRICE + MILEAGE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
            placeholder="Price"
            className="border p-3 rounded"
          />

          <input
            name="mileage"
            value={form.mileage}
            onChange={handleChange}
            type="number"
            placeholder="Mileage"
            className="border p-3 rounded"
          />
        </div>

        {/* FUEL + TRANSMISSION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="fuelType"
            value={form.fuelType}
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Electric</option>
            <option>Hybrid</option>
          </select>

          <select
            name="transmission"
            value={form.transmission}
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option>Manual</option>
            <option>Automatic</option>
          </select>
        </div>

        {/* STATUS */}
        <div>
          <label className="block font-semibold mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          >
            <option>Available</option>
            <option>Sold</option>
            <option>Reserved</option>
          </select>
        </div>

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-3 rounded w-full min-h-[120px]"
        />

        {/* IMAGES */}
        <div>
          <label className="font-semibold">Images (Max 10)</label>

          <input
            type="file"
            multiple
            accept="image/*"
            className="border p-3 rounded w-full mt-2"
            onChange={handleImageChange}
          />

          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mt-3">
            {form.images.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={typeof img === "string" ? img : URL.createObjectURL(img)}
                  className="h-20 w-full object-cover rounded"
                />

                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 rounded"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SAVE */}
        <button
          type="submit"
          disabled={saving}
          className="bg-black text-white px-6 py-3 rounded w-full md:w-auto"
        >
          {saving ? "Saving..." : "Update Car"}
        </button>
      </form>
    </div>
  );
}
