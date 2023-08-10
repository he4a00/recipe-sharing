// components/Hero.js

"use client";

import { categories } from "@/constants";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { SearchBar } from "./SearchBar";

const Hero = () => {
  const [isActive, setIsActive] = useState("All");
  return (
    <div className="pt-[85px] w-full h-[90vh] relative overflow-hidden">
      <div className="h-full">
        <Image
          className="opacity-40"
          alt="hero"
          src="/assests/hero.jpg"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="flex flex-col gap-y-20 items-center justify-center z-10 p-4 md:p-10 absolute inset-0 bottom-50">
        <div className="flex overflow-x-auto gap-5">
          {categories.map((cat, idx) => {
            return (
              <div key={idx}>
                <Button
                  className={`p-6 md:p-7 rounded-full ${
                    isActive === cat.name
                      ? "bg-white text-black"
                      : "bg-black opacity-50 hover:bg-white hover:text-black"
                  } text-lg`}
                  onClick={() => setIsActive(cat.name)}
                >
                  {cat.name}
                </Button>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col items-center justify-center z-10">
          <h1 className="text-5xl font-bold flex flex-col text-center">
            Explore the world’s leading <span> design recipes</span>
          </h1>
          <p className="text-center pt-10  font-bold">
            Millions of chefs and cultures around the world showcase their
            <br />
            recipes work on Recipe Sharing - the home to the world’s best recipe
            <br />
            and creative professionals.
          </p>
        </div>
        <SearchBar />
      </div>
    </div>
  );
};

export default Hero;
