import * as z from "zod";

export const RecipeValidation = z.object({
  title: z.string().min(3).max(30).nonempty(),
  description: z.string().min(10).max(600),
  preparationTime: z.string(),
  ingredients: z.array(z.string()),
  cookingTime: z.string(),
  imageUrl: z.string().url(),
  createdBy: z.string(),
});
