import { connectDB } from "@/app/(user)/lib/mongodb";
import Car from "@/app/(user)/lib/Car.model";

const STATUS_ENUM = ["Available", "Sold", "Reserved"];

const sanitize = (v) => (typeof v === "string" ? v.trim() : v);

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();

    const newCar = {
      name: sanitize(body.name),
      brand: sanitize(body.brand),
      category: sanitize(body.category),
      price: Number(body.price),
      year: Number(body.year),
      fuelType: sanitize(body.fuelType),
      transmission: sanitize(body.transmission),
      mileage: body.mileage ? Number(body.mileage) : undefined,
      description: body.description ? sanitize(body.description) : "",
      status: sanitize(body.status || "Available"),
      images: Array.isArray(body.images) ? body.images : [],
    };

    // ================= VALIDATION =================
    if (!newCar.name)
      return Response.json({ error: "Name required" }, { status: 400 });

    if (!newCar.brand)
      return Response.json({ error: "Brand required" }, { status: 400 });

    if (!newCar.category)
      return Response.json({ error: "Category required" }, { status: 400 });

    if (!newCar.transmission)
      return Response.json({ error: "Transmission required" }, { status: 400 });

    if (!newCar.year || isNaN(newCar.year))
      return Response.json({ error: "Valid year required" }, { status: 400 });

    if (!newCar.price || isNaN(newCar.price))
      return Response.json({ error: "Valid price required" }, { status: 400 });

    if (!newCar.fuelType)
      return Response.json({ error: "Fuel type required" }, { status: 400 });

    if (!STATUS_ENUM.includes(newCar.status)) {
      return Response.json({ error: "Invalid status" }, { status: 400 });
    }

    if (!Array.isArray(newCar.images) || newCar.images.length === 0) {
      return Response.json(
        { error: "At least one image required" },
        { status: 400 },
      );
    }

    const car = await Car.create(newCar);

    return Response.json({
      success: true,
      data: car,
    });
  } catch (error) {
    console.log(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
