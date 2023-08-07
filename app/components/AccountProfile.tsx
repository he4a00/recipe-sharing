"use client";

import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/app/components/ui/form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Image from "next/image";
import { Textarea } from "./ui/textarea";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/validations/uploadthing";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";

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
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");
  const pathname = usePathname();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image || "",
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    const blob = values.profile_photo;

    const hasImageChanged = isBase64Image(blob);

    if (hasImageChanged) {
      const imgRes = await startUpload(files);
      if (imgRes && imgRes[0].fileUrl) {
        values.profile_photo = imgRes[0].fileUrl;
      }
    }

    await updateUser({
      name: values.name,
      path: pathname,
      username: values.username,
      userId: user.id,
      bio: values.bio,
      image: values.profile_photo,
    });

    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));
      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";

        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
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
