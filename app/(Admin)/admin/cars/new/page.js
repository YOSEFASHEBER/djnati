"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCarPage() {
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
    status: "Available",
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});

  // ================= SAFE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value ?? "",
    }));
  };

  // ================= VALIDATION =================
  const validate = () => {
    let err = {};

    if (!form.name.trim()) err.name = "Name required";
    if (!form.brand.trim()) err.brand = "Brand required";

    if (!form.category) err.category = "Category required";
    if (!form.transmission) err.transmission = "Transmission required";
    if (!form.fuelType) err.fuelType = "Fuel type required";

    if (!form.price || isNaN(Number(form.price)))
      err.price = "Valid price required";

    if (!form.year || isNaN(Number(form.year)))
      err.year = "Valid year required";

    if (!form.description.trim()) err.description = "Description required";

    if (!Array.isArray(form.images) || form.images.length === 0)
      err.images = "At least one image required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // ================= UPLOAD =================
  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 10) {
      alert("Max 10 images allowed");
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
        alert(data.error || "Upload failed");
        return;
      }

      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...data.urls],
      }));

      e.target.value = "";
    } catch (err) {
      console.error(err);
      alert("Upload error");
    } finally {
      setUploading(false);
    }
  };

  // ================= REMOVE IMAGE =================
  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🚀 ===== FORM SUBMIT START =====");
    console.log("📦 RAW FORM STATE:", form);

    if (!validate()) {
      console.log("❌ VALIDATION FAILED:", errors);
      return;
    }

    setLoading(true);

    // ================= BUILD PAYLOAD =================
    const payload = {
      name: form.name?.trim(),
      brand: form.brand?.trim(),
      category: form.category || "Sedan",
      price: Number(form.price),
      year: Number(form.year),
      fuelType: form.fuelType || "Petrol",
      transmission: form.transmission || "Manual",
      mileage: form.mileage ? Number(form.mileage) : 0,
      description: form.description?.trim(),
      status: form.status || "Available",
      images: form.images,
    };

    console.log("📤 FINAL PAYLOAD SENT:", payload);

    try {
      console.log("🌐 Sending request to /api/admin/cars...");

      const res = await fetch("/api/admin/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("📡 RESPONSE STATUS:", res.status);
      console.log("📡 RESPONSE OK?:", res.ok);

      const data = await res.json().catch((err) => {
        console.error("❌ JSON PARSE ERROR:", err);
        return null;
      });

      console.log("📥 RESPONSE DATA:", data);

      // ================= ERROR HANDLING =================
      if (!res.ok) {
        console.error("🔥 SERVER ERROR FULL:", {
          status: res.status,
          data,
          payloadSent: payload,
        });

        alert(data?.error || "Request failed");
        return;
      }

      console.log("✅ SUCCESS: Car created");
      alert("Car created successfully");

      router.push("/admin/cars");
    } catch (err) {
      console.error("💥 NETWORK / UNEXPECTED ERROR:", err);
      alert("Something went wrong (check console)");
    } finally {
      console.log("🏁 FORM SUBMIT END");
      setLoading(false);
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Car</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Car Name"
          onChange={handleChange}
          className="input"
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <input
          name="brand"
          placeholder="Brand"
          onChange={handleChange}
          className="input"
        />
        {errors.brand && <p className="error">{errors.brand}</p>}

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="input"
        >
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Hatchback">Hatchback</option>
          <option value="Truck">Truck</option>
        </select>

        <select
          name="fuelType"
          value={form.fuelType}
          onChange={handleChange}
          className="input"
        >
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <select
          name="transmission"
          value={form.transmission}
          onChange={handleChange}
          className="input"
        >
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
        </select>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="input"
        >
          <option value="Available">Available</option>
          <option value="Sold">Sold</option>
          <option value="Reserved">Reserved</option>
        </select>

        <input
          name="year"
          placeholder="Year"
          onChange={handleChange}
          className="input"
        />
        <input
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="input"
        />
        <input
          name="mileage"
          placeholder="Mileage"
          onChange={handleChange}
          className="input"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="input"
        />

        {/* UPLOAD */}
        <input type="file" multiple accept="image/*" onChange={handleUpload} />
        {uploading && <p className="text-blue-500">Uploading...</p>}

        {/* PREVIEW */}
        <div className="flex gap-2 flex-wrap">
          {form.images.map((img, i) => (
            <div key={i} className="relative">
              <img src={img} className="w-24 h-24 object-cover rounded" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-0 right-0 bg-red-500 text-white px-1"
              >
                X
              </button>
            </div>
          ))}
        </div>

        <button className="bg-black text-white px-4 py-2 rounded">
          {loading ? "Saving..." : "Create Car"}
        </button>
      </form>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 8px;
        }
        .error {
          color: red;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}
