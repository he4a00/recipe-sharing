import mongoose from "mongoose";
const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    preparationTime: {
      type: String,
      required: true,
    },
    ingredients: [String],
    cookingTime: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Create the Recipe model using the schema
const Recipe = mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);

export default Recipe;
