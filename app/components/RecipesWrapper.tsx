"use client";

import React from "react";
import RecipeCard from "./RecipeCard";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";

interface Recipe {
  id: string;
  title: string;
  description: string;
  preparationTime: string;
  ingredients: string[];
  cookingTime: number;
  createdBy: string;
  imageUrl: string;
}

const RecipesWrapper = () => {
  const { data: recipes, isLoading } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const { data } = await axios.get("/api/recipe/");
      return data;
    },
  });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/user/`);
      return data;
    },
  });

  return (
    <div>
      {recipes?.map((recipe: any) => {
        const user = users?.find((user: any) => user._id === recipe.createdBy);
        return (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            creatorId={recipe.createdBy}
            userImage={user?.image}
            username={user.username}
          />
        );
      })}
    </div>
  );
};

export default RecipesWrapper;
