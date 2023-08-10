import Recipe from "@/lib/models/recipe.model";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    connectToDB();

    const recipes = await Recipe.find({});
    return new NextResponse(JSON.stringify(recipes), { status: 200 });
  } catch (error) {
    return new Response("Could not find any recipe", { status: 404 });
  }
}
