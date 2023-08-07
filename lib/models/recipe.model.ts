const mongoose = require("mongoose");

// Define the recipe schema
const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: String, // You can use Number if you prefer numeric quantities
        required: true,
      },
    },
  ],
  instructions: [
    {
      step: {
        type: String,
        required: true,
      },
    },
  ],
  preparationTime: {
    type: Number,
    required: true,
  },
  cookingTime: {
    type: Number,
    required: true,
  },
  servings: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Recipe model using the schema
const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
