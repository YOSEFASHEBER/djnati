"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
    isAvailable: true,
  });

  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState([]);

  // ================= LOAD CAR =================
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetch(`/api/admin/cars/${params.id}`);
        const data = await res.json();

        const car = data.data;

        if (car) {
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
            images: [],
            isAvailable: car.isAvailable ?? true,
          });

          if (car.images) {
            setPreview(car.images);
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [params.id]);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= IMAGES =================
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setForm((prev) => ({
      ...prev,
      images: files,
    }));

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreview(previews);
  };

  // ================= UPDATE =================
  const updateCar = async () => {
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

    await fetch(`/api/cars/${params.id}`, {
      method: "PUT",
      body: formData,
    });

    alert("Car updated successfully!");
    router.push("/admin/cars");
  };

  if (loading) return <p className="p-6">Loading car...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow border p-6 space-y-6">
      <h1 className="text-3xl font-black">Edit Car</h1>

      {/* GRID 1 */}
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

      {/* GRID 2 */}
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

      {/* GRID 3 */}
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

      {/* DESCRIPTION */}
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        className="input min-h-[140px]"
        placeholder="Description"
      />

      {/* STATUS */}
      <select
        name="isAvailable"
        value={form.status ? "true" : "false"}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            isAvailable: e.target.value === "true",
          }))
        }
        className="input"
      >
        <option value="true">Available</option>
        <option value="false">Sold</option>
      </select>

      {/* IMAGES */}
      <div className="space-y-3">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="input"
        />

        {/* PREVIEW */}
        {preview.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {preview.map((img, i) => (
              <img
                key={i}
                src={img}
                className="h-24 w-full object-cover rounded-lg border"
              />
            ))}
          </div>
        )}
      </div>

      {/* UPDATE BUTTON */}
      <button
        onClick={updateCar}
        className="w-full bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600"
      >
        Update Car
      </button>

      {/* INPUT STYLE */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          outline: none;
        }

        .input:focus {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
        }
      `}</style>
    </div>
  );
}
