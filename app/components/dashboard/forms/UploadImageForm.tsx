"use client";

import { UploadDropzone } from "@/app/utils/UploadthingComponents";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
// import { set } from "zod";
import { SubmitButton } from "../SubmitButtons";
import { toast } from "sonner";
import { UpdateImage } from "@/app/actions";
interface iAppProps {
  siteId: string;
}
export function UploadImageForm({ siteId }: iAppProps) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Image</CardTitle>
        <CardDescription>Upload an image for your site</CardDescription>
      </CardHeader>
      <CardContent>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="site Image"
            width={200}
            height={200}
            className="size-[200px] object-cover rounded-lg"
          />
        ) : (
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImageUrl(res[0].url);
              toast.success("Image uploaded successfully");
            }}
            onUploadError={() => {
              toast.error("Image upload failed");
            }}
          />
        )}
      </CardContent>
      <CardFooter>
        <form action={UpdateImage}>
          <input type="hidden" name="imageUrl" value={imageUrl} />
          <input type="hidden" name="siteId" value={siteId} />
          <SubmitButton text="Change Image" />
        </form>
      </CardFooter>
    </Card>
  );
}
