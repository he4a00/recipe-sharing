import PostRecipe from "@/app/components/PostRecipe";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user?.id);

  console.log(userInfo);

  return (
    <div className="flex mx-auto flex-col items-center justify-center max-w-3xl px-10 py-20">
      <div className="pt-10 pb-10">
        <h1 className="text-3xl font-bold">Add Your Favorite Recipe.</h1>
        <p className="mt-3">It is time to share your recipes with others!</p>
      </div>
      <PostRecipe userId={userInfo?._id} />
    </div>
  );
};

export default Page;
