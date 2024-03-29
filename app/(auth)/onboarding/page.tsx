import AccountProfile from "@/app/components/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const user = await currentUser();

  if (!user) return null; // to avoid typescript warnings

  const userInfo = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio,
    image: userInfo?.image || user?.imageUrl,
  };
  return (
    <main className="flex mx-auto flex-col justify-start max-w-3xl px-10 py-20 ">
      <h1 className="text-3xl font-bold">Onboarding</h1>
      <p className="mt-3">Complete Your Profile to use Recipe Sharing!</p>
      <section className="bg-[#121417] mt-9 p-10">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
};

export default Page;
