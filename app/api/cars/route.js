import { NextResponse } from "next/server";

export const GET = () => {
  return new NextResponse("this is list of all cars!");
};
