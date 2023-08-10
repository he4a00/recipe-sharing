"use server";

import Recipe from "../models/recipe.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
  title: string;
  description: string;
  preparationTime: string;
  ingredients: string[];
  cookingTime: string;
  imageUrl: string;
  createdBy: string;
}

export async function createRecipe({
  title,
  description,
  preparationTime,
  ingredients,
  cookingTime,
  imageUrl,
  createdBy,
}: Params): Promise<void> {
  try {
    connectToDB();
    const existedRecipe = await Recipe.findOne({ title });
    if (existedRecipe) {
      throw new Error("This recipe already exists!");
    }

    const recipe = await Recipe.create({
      title,
      description,
      preparationTime,
      ingredients,
      cookingTime,
      imageUrl,
      createdBy,
    });

    // Update User model
    await User.findByIdAndUpdate(createdBy, {
      $push: { recipes: recipe._id },
    });
  } catch (error: any) {
    throw new Error(`Failed to create recipe: ${error.message}`);
  }
}
