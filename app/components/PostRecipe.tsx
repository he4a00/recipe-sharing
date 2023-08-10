"use client";

import React, { ChangeEvent, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
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
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/validations/uploadthing";
import { useRouter } from "next/navigation";
import { RecipeValidation } from "@/lib/validations/recipe";
import { createRecipe } from "@/lib/actions/recipe.actions";

interface RecipeProps {
  title: string;
  description: string;
  ingredients: string[];
  preparationTime: number;
  cookingTime: number;
  imageUrl: string;
}

const PostRecipe = ({ userId }: { userId: string }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const { startUpload } = useUploadThing("media");
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(RecipeValidation),
    defaultValues: {
      title: "",
      imageUrl: "",
      description: "",
      preparationTime: "",
      ingredients: [],
      cookingTime: "",
      createdBy: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof RecipeValidation>) => {
    const blob = values.imageUrl;

    const hasImageChanged = isBase64Image(blob);

    if (hasImageChanged) {
      const imgRes = await startUpload(files);
      if (imgRes && imgRes[0].fileUrl) {
        values.imageUrl = imgRes[0].fileUrl;
      }
    }

    await createRecipe({
      title: values.title,
      description: values.description,
      preparationTime: values.preparationTime,
      ingredients: values.ingredients,
      cookingTime: values.cookingTime,
      imageUrl: values.imageUrl,
      createdBy: userId,
    });
    form.reset();
    router.push("/");

    setLoading(true);
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
        className="flex flex-col justify-center gap-10 mx-auto max-w-3xl px-10"
      >
        <FormField
          control={form.control}
          name="imageUrl"
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

        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter The Recipe Title"
                      className="border border-[#1F1F22] bg-[#1F1F22] text-light-1 !important focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preparationTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Preparation Time
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border border-[#1F1F22] bg-[#1F1F22] text-light-1 !important focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ingredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Ingredients</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <Input
                        placeholder="Flour, Egg, Wheat"
                        className="border border-[#1F1F22] bg-[#1F1F22] text-light-1 !important focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important"
                        {...field}
                        onChange={(e) => {
                          const ingredientsArray = e.target.value
                            .split(",")
                            .map((ingredient) => ingredient.trim());
                          field.onChange(ingredientsArray);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter The Recipe Description"
                    rows={5}
                    className="border border-[#1F1F22] bg-[#1F1F22] text-light-1 !important focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cookingTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Cooking Time</FormLabel>
                <FormControl>
                  <Input
                    className="border border-[#1F1F22] bg-[#1F1F22] text-light-1 !important focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important"
                    placeholder="Cooking Time"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={loading} variant="secondary" type="submit">
          Add Recipe
        </Button>
      </form>
    </Form>
  );
};

export default PostRecipe;
