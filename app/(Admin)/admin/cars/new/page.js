"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, X, CheckCircle } from "lucide-react";

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
  const [toast, setToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let err = {};

    if (!form.name.trim()) err.name = "Required";
    if (!form.brand.trim()) err.brand = "Required";
    if (!form.price || isNaN(Number(form.price))) err.price = "Invalid";
    if (!form.year || isNaN(Number(form.year))) err.year = "Invalid";
    if (!form.description.trim()) err.description = "Required";
    if (form.images.length === 0) err.images = "Add image";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const isFormValid = () => {
    return (
      form.name &&
      form.brand &&
      form.price &&
      form.year &&
      form.description &&
      form.images.length > 0 &&
      !uploading
    );
  };

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);

    const formData = new FormData();
    files.forEach((f) => formData.append("files", f));

    setUploading(true);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...data.urls],
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (i) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== i),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      await fetch("/api/admin/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          year: Number(form.year),
          mileage: Number(form.mileage || 0),
        }),
      });

      setToast(true);

      setTimeout(() => {
        router.push("/admin/cars");
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-black mb-6">Add New Car</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              name="name"
              placeholder="Car Name"
              onChange={handleChange}
              error={errors.name}
            />
            <Input
              name="brand"
              placeholder="Brand"
              onChange={handleChange}
              error={errors.brand}
            />
            <Input
              name="price"
              placeholder="Price"
              onChange={handleChange}
              error={errors.price}
            />
            <Input
              name="year"
              placeholder="Year"
              onChange={handleChange}
              error={errors.year}
            />
            <Input
              name="mileage"
              placeholder="Mileage"
              onChange={handleChange}
            />

            <Select
              name="category"
              value={form.category}
              onChange={handleChange}
              options={["Sedan", "SUV", "Truck", "Van"]}
            />
            <Select
              name="fuelType"
              value={form.fuelType}
              onChange={handleChange}
              options={["Petrol", "Diesel", "Electric"]}
            />
            <Select
              name="transmission"
              value={form.transmission}
              onChange={handleChange}
              options={["Manual", "Automatic"]}
            />
            <Select
              name="status"
              value={form.status}
              onChange={handleChange}
              options={["Available", "Reserved", "Sold"]}
            />
          </div>

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />

          <label className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
            <UploadCloud className="mb-2" />
            <span className="text-sm">Upload images</span>
            <input type="file" multiple hidden onChange={handleUpload} />
          </label>

          {uploading && <p className="text-blue-500">Uploading...</p>}

          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {form.images.map((img, i) => (
              <div key={i} className="relative group">
                <img
                  src={img.url}
                  className="w-full h-24 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>

          <button
            disabled={!isFormValid() || loading}
            className={`w-full py-3 rounded-xl font-bold transition ${
              !isFormValid() || loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {loading ? "Saving..." : "Create Car"}
          </button>
        </form>
      </div>

      {/* TOAST */}
      {toast && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
          <CheckCircle size={20} />
          Car listed successfully 🚗
        </div>
      )}
    </div>
  );
}

function Input({ name, placeholder, onChange, error }) {
  return (
    <div>
      <input
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full p-3 border rounded-xl"
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}

function Select({ name, value, onChange, options }) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 border rounded-xl"
    >
      {options.map((opt) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
  );
}
