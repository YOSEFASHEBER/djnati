import { connectDB } from "@/app/lib/mongodb";
import Car from "@/models/Car";

export async function POST(req) {
  await connectDB();

  const body = await req.json();

  const car = await Car.create(body);

  return Response.json({ success: true, data: car });
}
