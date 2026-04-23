import { connectDB } from "@/app/(user)/lib/mongodb";
import Car from "@/app/(user)/lib/Car.model";

const STATUS_ENUM = ["Available", "Sold", "Reserved"];

const sanitize = (v) => (typeof v === "string" ? v.trim() : v);

// ================= GET ALL CARS (ADMIN) =================
export async function GET(req) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const [cars, total, available, sold, reserved] = await Promise.all([
      Car.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),

      Car.countDocuments(),
      Car.countDocuments({ status: "Available" }),
      Car.countDocuments({ status: "Sold" }),
      Car.countDocuments({ status: "Reserved" }),
    ]);

    return Response.json({
      success: true,
      data: cars,
      stats: { total, available, sold, reserved },
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    return Response.json({ error: "Failed to fetch cars" }, { status: 500 });
  }
}
// ================= CREATE CAR (ADMIN) =================
export async function POST(req) {
  const auth = verifyAdmin(req);
  if (auth.error) {
    return Response.json({ error: auth.error }, { status: auth.status });
  }

  try {
    await connectDB();

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

    if (isNaN(newCar.year))
      return Response.json({ error: "Valid year required" }, { status: 400 });

    if (isNaN(newCar.price))
      return Response.json({ error: "Valid price required" }, { status: 400 });

    if (!newCar.fuelType)
      return Response.json({ error: "Fuel type required" }, { status: 400 });

    if (!STATUS_ENUM.includes(newCar.status)) {
      return Response.json({ error: "Invalid status" }, { status: 400 });
    }

    if (
      !Array.isArray(newCar.images) ||
      newCar.images.length === 0 ||
      !newCar.images.every((img) => img?.url && img?.public_id)
    ) {
      return Response.json(
        { error: "Images must include url and public_id" },
        { status: 400 },
      );
    }

    const car = await Car.create(newCar);

    return Response.json({
      success: true,
      data: car,
    });
  } catch (error) {
    console.error("POST /admin/cars error:", error);
    return Response.json({ error: "Failed to create car" }, { status: 500 });
  }
}
