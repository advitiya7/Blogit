"use client";

import { CreateSiteAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { siteSchema } from "@/app/utils/zodSchema";

export default function NewSiteRoute() {
  const [lastResult, action] = useActionState(CreateSiteAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: siteSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <Card className="max-w-[450px]">
        <CardHeader>
          <CardTitle>Create Site</CardTitle>
          <CardDescription>Create your website here</CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
          <CardContent>
            <div className="flex flex-col gap-y-6">
              <div className="grid gap-3">
                <Label>Site Name</Label>
                <Input
                  placeholder="site name"
                  name={fields.name.name}
                  key={fields.name.name}
                  defaultValue={fields.name.initialValue}
                />
                <p className="text-red-500 text-sm">{fields.name.errors}</p>
              </div>
              <div className="grid gap-3">
                <Label>Subdirectory</Label>
                <Input
                  placeholder="subdirectory"
                  name={fields.subdirectory.name}
                  key={fields.subdirectory.name}
                  defaultValue={fields.subdirectory.initialValue}
                />
                <p className="text-red-500 text-sm">
                  {fields.subdirectory.errors}
                </p>
              </div>
              <div className="grid gap-3">
                <Label>Description</Label>
                <Textarea
                  placeholder="description"
                  name={fields.description.name}
                  key={fields.description.name}
                  defaultValue={fields.description.initialValue}
                />
                <p className="text-red-500 text-sm">
                  {fields.description.errors}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Submit</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
