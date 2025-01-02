/* eslint-disable @next/next/no-async-client-component */
"use client";

import { CreatePostAction } from "@/app/actions";
import TailwindEditor from "@/app/components/dashboard/EditorWrapper";
import { UploadDropzone } from "@/app/utils/UploadthingComponents";
import { PostSchema } from "@/app/utils/zodSchema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ArrowLeft, Atom } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSONContent } from "novel";
// import { usePathname, useSearchParams } from "next/navigation";
import React, { useActionState, useState } from "react";
import { toast } from "sonner";
import slugify from "react-slugify";
import { SubmitButton } from "@/app/components/dashboard/SubmitButtons";
// import { set } from "zod";
// import path from "path";

export default function ArticleCreationRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [value, setValue] = useState<JSONContent | undefined>(undefined);

  const [title, setTitle] = useState<string | undefined>(undefined);
  const [slug, setSlug] = useState<string | undefined>(undefined);
  const [lastResult, action] = useActionState(CreatePostAction, undefined);
  const { siteId } = React.use(params);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: PostSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  function handleSlugGeneration() {
    const titleInput = title;
    if (titleInput?.length === 0 || titleInput === undefined) {
      toast.error("Please enter a title first");
    }
    setSlug(slugify(titleInput));

    return toast.success("Slug generated successfully");
  }
  return (
    <>
      <div className="flex items-center">
        <Button asChild variant="outline" className="mr-3" size="icon">
          <Link href={`/dashboard/sites/${siteId}`}>
            <ArrowLeft className=" size-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Create Article</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Article details</CardTitle>
          <CardDescription>Fill in the details of your article</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-6"
            action={action}
            id={form.id}
            onSubmit={form.onSubmit}
          >
            <input type="hidden" name="siteId" value={siteId} />
            <div className="grid gap-2">
              <Label>Title</Label>

              <Input
                placeholder="Next js blog"
                name={fields.title.name}
                key={fields.title.key}
                defaultValue={fields.title.initialValue}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <p className="text-red-500 text-sm">{fields.title.errors}</p>
            </div>

            <div className="grid gap-2">
              <Label>Slug</Label>
              <Input
                placeholder="Article Slug"
                name={fields.slug.name}
                key={fields.slug.key}
                defaultValue={fields.slug.initialValue}
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                // onChange={(e) => setSlug(e.target.value)}
              />
              <p className="text-red-500 text-sm">{fields.slug.errors}</p>
              <Button
                className="w-fit"
                variant="secondary"
                type="button"
                onClick={handleSlugGeneration}
              >
                <Atom className="size-4" />
                Generate Slug
              </Button>
            </div>

            <div className="grid gap-2">
              <Label>Small description</Label>
              <Textarea
                placeholder="A small description of the article"
                className="h-32"
                name={fields.smallDescription.name}
                key={fields.smallDescription.key}
                defaultValue={fields.smallDescription.initialValue}
              />
              <p className="text-red-500 text-sm">
                {fields.smallDescription.errors}
              </p>
            </div>

            <div className="grid gap-2">
              <Label>Cover Image</Label>
              <Input
                type="hidden"
                name={fields.image.name}
                key={fields.image.name}
                defaultValue={fields.image.initialValue}
                value={imageUrl ?? ""}
              />
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="cover image"
                  className="object-cover"
                  width={200}
                  height={200}
                />
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  onUploadError={() => {
                    toast.error("Image upload failed");
                  }}
                  onClientUploadComplete={(res) => {
                    setImageUrl(res[0].url);
                    toast.success("Image uploaded successfully");
                  }}
                />
              )}
              <p className="text-red-500 text-sm">{fields.image.errors}</p>
            </div>
            <div className="grid gap-2">
              <Label>Article Content</Label>
              <Input
                type="hidden"
                name={fields.articleContent.name}
                key={fields.articleContent.name}
                defaultValue={fields.articleContent.name}
                value={JSON.stringify(value)}
              />
              <TailwindEditor onChange={setValue} initialValue={value} />
              <p className="text-red-500 text-sm">
                {fields.articleContent.errors}
              </p>
            </div>
            <div className="flex justify-end">
              <SubmitButton text="Create Article" />
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
