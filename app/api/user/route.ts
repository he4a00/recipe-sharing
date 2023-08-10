import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    connectToDB();
    const users = await User.find({});
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}
