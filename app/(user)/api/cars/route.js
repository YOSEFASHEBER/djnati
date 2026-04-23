import { connectDB } from "@/app/(user)/lib/mongodb";
import Car from "@/app/(user)/lib/Car.model";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    // ================= PAGINATION =================
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 20;
    const skip = (page - 1) * limit;

    // ================= FILTERS =================
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const search = searchParams.get("search");

    let query = {};

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // ================= DATA + STATS (ONE REQUEST) =================
    const [cars, filteredTotal, totalCars, available, sold, reserved] =
      await Promise.all([
        Car.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),

        Car.countDocuments(query), // for pagination

        Car.countDocuments(), // ALL cars

        Car.countDocuments({ status: "Available" }),

        Car.countDocuments({ status: "Sold" }),

        Car.countDocuments({ status: "Reserved" }),
      ]);

    // ================= RESPONSE =================
    return Response.json({
      success: true,

      data: cars,

      stats: {
        total: totalCars,
        filteredTotal,
        available,
        sold,
        reserved,
      },

      pagination: {
        page,
        limit,
        total: filteredTotal,
        totalPages: Math.ceil(filteredTotal / limit),
      },
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}

// import { connectDB } from "@/app/(user)/lib/mongodb";
// import Car from "@/app/(user)/lib/Car.model";
// import { NextResponse } from "next/server";

// export async function GET(req) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);

//     const page = parseInt(searchParams.get("page")) || 1;
//     const limit = parseInt(searchParams.get("limit")) || 20;
//     const skip = (page - 1) * limit;

//     const category = searchParams.get("category");
//     const minPrice = searchParams.get("minPrice");
//     const maxPrice = searchParams.get("maxPrice");
//     const search = searchParams.get("search");

//     let query = {};

//     if (category) query.category = category;

//     if (minPrice || maxPrice) {
//       query.price = {};
//       if (minPrice) query.price.$gte = Number(minPrice);
//       if (maxPrice) query.price.$lte = Number(maxPrice);
//     }

//     if (search) {
//       query.name = { $regex: search, $options: "i" };
//     }

//     const [cars, filteredTotal, totalCars, available, sold, reserved] =
//       await Promise.all([
//         Car.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
//         Car.countDocuments(query),
//         Car.countDocuments(),
//         Car.countDocuments({ status: "Available" }),
//         Car.countDocuments({ status: "Sold" }),
//         Car.countDocuments({ status: "Reserved" }),
//       ]);

//     return NextResponse.json({
//       success: true,
//       data: cars,
//       stats: {
//         total: totalCars,
//         filteredTotal,
//         available,
//         sold,
//         reserved,
//       },
//       pagination: {
//         page,
//         limit,
//         total: filteredTotal,
//         totalPages: Math.ceil(filteredTotal / limit),
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 },
//     );
//   }
// }
// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Car from "@/lib/models/Car";

// export async function GET(req) {
//   try {
//     console.log("➡️ API HIT");

//     await connectDB();
//     console.log("✅ DB CONNECTED");

//     const cars = await Car.find().limit(5);

//     return NextResponse.json({
//       success: true,
//       data: cars,
//     });
//   } catch (error) {
//     console.error("❌ FULL ERROR:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         error: error.message,
//       },
//       { status: 500 },
//     );
//   }
// }
