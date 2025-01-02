import { DeleteSiteAction } from "@/app/actions";
import { UploadImageForm } from "@/app/components/dashboard/forms/UploadImageForm";
import { SubmitButton } from "@/app/components/dashboard/SubmitButtons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function SettingsSiteRoute({
  params,
}: {
  params: { siteId: string };
}) {
  return (
    <>
      <div className="flex items-center gap-x-2">
        <Button asChild variant="outline" size="icon">
          <Link href={`/dashboard/sites/${params.siteId}`}>
            <ChevronLeft className="size-4" />
          </Link>
        </Button>
        <h3 className="text-2xl font-semibold">Go back</h3>
      </div>
      <UploadImageForm siteId={params.siteId} />
      <Card className="border-red-500 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-500">Danger</CardTitle>
          <CardDescription className="text-red-500">
            This will delete your sites and all the articles associated with it.
            Click the button below to delete everything.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <form action={DeleteSiteAction}>
            <input type="hidden" name="siteId" value={params.siteId} />
            <SubmitButton text="Delete Site" variant="destructive" />
          </form>
        </CardFooter>
      </Card>
    </>
  );
}
