import { connectDB } from "@/app/(user)/lib/mongodb";
import Car from "@/app/(user)/lib/Car.model";

// ================= GET SINGLE CAR =================
export async function GET(req, { params }) {
  await connectDB();

  try {
    const car = await Car.findById(params.id);

    if (!car) {
      return Response.json(
        { success: false, message: "Car not found" },
        { status: 404 },
      );
    }

    return Response.json({
      success: true,
      data: car,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

// ================= UPDATE CAR =================
export async function PUT(req, { params }) {
  await connectDB();

  const body = await req.json();

  const car = await Car.findByIdAndUpdate(params.id, body, {
    new: true,
  });

  return Response.json({ success: true, data: car });
}

// ================= DELETE CAR =================
export async function DELETE(req, { params }) {
  await connectDB();

  await Car.findByIdAndDelete(params.id);

  return Response.json({ success: true });
}
