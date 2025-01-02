"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { PostSchema, siteSchema } from "./utils/zodSchema";
import prisma from "./utils/db";
import { requireUser } from "./utils/requireUser";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
// import { parse } from "path";

export async function CreateSiteAction(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }
  const submission = parseWithZod(formData, {
    schema: siteSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  const response = await prisma.site.create({
    data: {
      description: submission.value.description,
      name: submission.value.name,
      subdirectory: submission.value.subdirectory,
      userId: user.id,
    },
  });
  return redirect("/dashboard/sites");
}

export async function CreatePostAction(prevState: any, formData: FormData) {
  const user = (await requireUser()) as KindeUser<Record<string, any>>;
  const submission = parseWithZod(formData, {
    schema: PostSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }
  const response = await prisma.post.create({
    data: {
      image: submission.value.image,
      title: submission.value.title,
      articleContent: JSON.parse(submission.value.articleContent),
      smallDescription: submission.value.smallDescription,
      slug: submission.value.slug,
      userId: user.id,
      siteId: formData.get("siteId") as string,
    },
  });
  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}

export async function EditPostAction(prevState: any, formData: FormData) {
  const user = (await requireUser()) as KindeUser<Record<string, any>>;

  const submission = parseWithZod(formData, {
    schema: PostSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.post.update({
    where: {
      userId: user.id,
      id: formData.get("articleId") as string,
    },
    data: {
      title: submission.value.title,
      smallDescription: submission.value.smallDescription,
      slug: submission.value.slug,
      articleContent: JSON.parse(submission.value.articleContent),
      image: submission.value.image,
    },
  });
  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}

export async function DeletePostAction(formData: FormData) {
  const user = await requireUser();
  const data = await prisma.post.delete({
    where: {
      userId: user.id,
      id: formData.get("articleId") as string,
    },
  });
  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}

export async function UpdateImage(formData: FormData) {
  const user = await requireUser();
  const data = await prisma.site.update({
    where: {
      userId: user.id,
      id: formData.get("siteId") as string,
    },
    data: {
      imageUrl: formData.get("imageUrl") as string,
    },
  });
  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}

export async function DeleteSiteAction(formData: FormData) {
  const user = await requireUser();
  const data = await prisma.site.delete({
    where: {
      userId: user.id,
      id: formData.get("siteId") as string,
    },
  });
  return redirect(`/dashboard/sites`);
}
