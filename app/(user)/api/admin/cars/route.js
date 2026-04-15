import { connectDB } from "@/app/(user)/lib/mongodb";
import Car from "@/app/(user)/lib/Car.model";

export async function POST(req) {
  await connectDB();

  try {
    const contentType = req.headers.get("content-type");

    let body;

    // ================= HANDLE JSON =================
    if (contentType?.includes("application/json")) {
      body = await req.json();
    }

    // ================= HANDLE FORM DATA =================
    else {
      const formData = await req.formData();

      body = {
        name: formData.get("name"),
        brand: formData.get("brand"),
        category: formData.get("category"),
        price: formData.get("price"),
        year: formData.get("year"),
        fuelType: formData.get("fuelType"),
        transmission: formData.get("transmission"),
        mileage: formData.get("mileage"),
        description: formData.get("description"),
        images: formData.getAll("images"),
      };
    }

    // ================= DEFAULT VALUES =================
    const car = await Car.create({
      ...body,
      isAvailable: true,
      createdAt: new Date(),
    });

    return Response.json({
      success: true,
      data: car,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
