import mongoose from "mongoose";

const CarSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },

    category: {
      type: String,
      enum: ["Sedan", "SUV", "Hatchback", "Truck"],
      required: true,
    },

    price: { type: Number, required: true },
    year: { type: Number, required: true },

    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
      required: true,
    },

    transmission: {
      type: String,
      enum: ["Manual", "Automatic"],
      required: true,
    },

    mileage: Number,

    images: [String],

    description: String,

    status: {
      type: String,
      enum: ["Available", "Sold", "Reserved"],
      default: "Available",
    },
  },
  { timestamps: true },
);

// 🔥 ADD INDEXES HERE (IMPORTANT)
CarSchema.index({ name: "text", brand: "text" });
CarSchema.index({ price: 1 });
CarSchema.index({ category: 1 });
CarSchema.index({ status: 1 });
CarSchema.index({ createdAt: -1 }); // 🔥 IMPORTANT for latest cars
export default mongoose.models.Car || mongoose.model("Car", CarSchema);
