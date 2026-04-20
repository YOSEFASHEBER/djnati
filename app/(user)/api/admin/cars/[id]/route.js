import { connectDB } from "@/app/(user)/lib/mongodb";
import Car from "@/app/(user)/lib/Car.model";

// ✅ Allowed enum
const STATUS_ENUM = ["Available", "Sold", "Reserved"];

// ✅ Basic sanitize
const sanitize = (value) => {
  if (typeof value !== "string") return value;
  return value.trim();
};

// ================= UPDATE CAR =================
export async function PUT(req, { params }) {
  await connectDB();

  try {
    const body = await req.json();

    // ✅ Extract only allowed fields (IMPORTANT)
    const updateData = {
      name: sanitize(body.name),
      brand: sanitize(body.brand),
      year: Number(body.year),
      price: Number(body.price),
      fuelType: sanitize(body.fuelType),
      description: sanitize(body.description),
      status: sanitize(body.status),
      images: body.images,
    };

    // ================= VALIDATION =================

    if (!updateData.name) {
      return Response.json({ error: "Name is required" }, { status: 400 });
    }

    if (!updateData.brand) {
      return Response.json({ error: "Brand is required" }, { status: 400 });
    }

    if (!updateData.year || isNaN(updateData.year)) {
      return Response.json({ error: "Valid year required" }, { status: 400 });
    }

    if (!updateData.price || isNaN(updateData.price)) {
      return Response.json({ error: "Valid price required" }, { status: 400 });
    }

    if (!updateData.fuelType) {
      return Response.json({ error: "Fuel type required" }, { status: 400 });
    }

    if (!updateData.description) {
      return Response.json(
        { error: "Description is required" },
        { status: 400 },
      );
    }

    if (!Array.isArray(updateData.images) || updateData.images.length === 0) {
      return Response.json(
        { error: "At least one image is required" },
        { status: 400 },
      );
    }

    // ✅ Validate status enum
    if (!STATUS_ENUM.includes(updateData.status)) {
      return Response.json({ error: "Invalid status value" }, { status: 400 });
    }

    // ================= UPDATE =================
    const car = await Car.findByIdAndUpdate(params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!car) {
      return Response.json({ error: "Car not found" }, { status: 404 });
    }

    return Response.json({
      success: true,
      data: car,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// ---- Delete cars ----
export async function DELETE(req, { params }) {
  await connectDB();

  try {
    const car = await Car.findByIdAndDelete(params.id);

    if (!car) {
      return Response.json({ error: "Car not found" }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
