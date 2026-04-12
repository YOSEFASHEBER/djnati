import { connectDB } from "@/app/lib/mongodb";
import Car from "@/app/lib/Car.model";

export async function PUT(req, { params }) {
  await connectDB();

  const body = await req.json();

  const car = await Car.findByIdAndUpdate(params.id, body, {
    new: true,
  });

  return Response.json({ success: true, data: car });
}

export async function DELETE(req, { params }) {
  await connectDB();

  await Car.findByIdAndDelete(params.id);

  return Response.json({ success: true });
}
