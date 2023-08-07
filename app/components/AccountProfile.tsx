"use client";

import React, { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Image from "next/image";
import { Textarea } from "./ui/textarea";

interface UserProps {
  user: {
    id: string;
    image: string;
    bio: string;
    username: string;
    objectId: string;
    name: string;
  };
  btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: UserProps) => {
  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image || "",
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
    },
  });

  function onSubmit(values: z.infer<typeof UserValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const handleImage = (
    e: ChangeEvent,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="flex h-24 w-24 items-center justify-center rounded-full bg-[#1F1F22] !important">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile photo"
                    width={96}
                    height={96}
                    priority
                    className="object-contain rounded-full"
                  />
                ) : (
                  <Image
                    src="/assests/logo.png"
                    alt="profile photo"
                    width={24}
                    height={24}
                    className="object-contain rounded-full"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 font-semibold text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload a Photo"
                  className=" cursor-pointer border-[#1F1F22] bg-transparent outline-none file:text-blue !important"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start gap-3 w-full">
              <FormLabel className="font-semibold">Name</FormLabel>
              <FormControl className="flex-1 font-semibold text-gray-200">
                <Input
                  className=" border border-[#1F1F22] bg-[#1F1F22] text-light-1  !important focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start gap-3 w-full">
              <FormLabel className="font-semibold">Username</FormLabel>
              <FormControl className="flex-1 font-semibold text-gray-200">
                <Input
                  className="border border-[#1F1F22] bg-[#1F1F22] text-light-1 !important focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start gap-3 w-full">
              <FormLabel className="font-semibold">Bio</FormLabel>
              <FormControl className="flex-1 font-semibold text-gray-200">
                <Textarea
                  rows={10}
                  className="border border-[#1F1F22] bg-[#1F1F22] text-light-1 !important focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button variant="secondary" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
