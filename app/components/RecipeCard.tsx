"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { categories } from "@/constants";
import Image from "next/image";

interface RecipeProps {
  creatorId: string;
  userImage: string;
  username: string;
  recipe: {
    id: string;
    title: string;
    description: string;
    preparationTime: string;
    ingredients: string[];
    cookingTime: number;
    imageUrl: string;
  };
}

const RecipeCard = ({
  creatorId,
  userImage,
  username,
  recipe: {
    id,
    title,
    description,
    preparationTime,
    ingredients,
    cookingTime,
    imageUrl,
  },
}: RecipeProps) => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div className="mx-auto px-4 md:px-12 mt-10 overflow-hidden pb-32">
      <div className="flex flex-row justify-between">
        <div>
          <Select>
            <SelectTrigger className="w-[160px] bg-black">
              <SelectValue placeholder="Select Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="popular">Popular</SelectItem>
                <SelectItem value="new">New</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select>
            <SelectTrigger className="w-[160px] bg-black">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((cat) => {
                  return (
                    <SelectItem key={cat.name} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-wrap -mx-2 lg:-mx-4">
        {" "}
        {/* Adjusted negative margin */}
        <div
          className="my-2 px-2 w-full md:w-1/2 lg:w-1/4 mt-10 overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="flex flex-col">
            {isHovering && <div className="absolute">title</div>}
            <Image
              alt="card"
              src={imageUrl}
              width={500}
              height={700}
              className="rounded-lg hover:opacity-60 transition-all"
            />
            <div className="flex flex-row justify-between">
              <div className="flex gap-3 items-center p-3">
                <Image
                  className="rounded-full"
                  alt="user"
                  src={userImage}
                  width={30}
                  height={30}
                />
                <h1>{username}</h1>
              </div>
              <h1>14</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
