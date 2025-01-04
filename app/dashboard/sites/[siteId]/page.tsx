import prisma from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { create } from "domain";
import {
  Book,
  // FileIcon,
  MoreHorizontal,
  PlusCircle,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/app/components/dashboard/EmptyState";
async function getData(userId: string, siteId: string) {
  // const data = await prisma.post.findMany({
  //   where: {
  //     userId: userId,
  //     siteId: siteId,
  //   },
  //   select: {
  //     image: true,
  //     title: true,
  //     createdAt: true,
  //     id: true,
  //     Site: {
  //       select: {
  //         subdirectory: true,
  //       },
  //     },
  //   },
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  // });
  const data = await prisma.site.findUnique({
    where: {
      id: siteId,
      userId: userId,
    },
    select: {
      subdirectory: true,
      posts: {
        select: {
          image: true,
          title: true,
          createdAt: true,
          id: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  return data;
}
export default async function SiteIdRoute({
  params,
}: {
  params: { params: Promise<{ siteId: string }> };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/api/auth/login");
  }
  const { siteId } = await params;
  const data = await getData(user.id, siteId);
  return (
    <>
      <div className="flex  w-full justify-end gap-x-4">
        <Button asChild variant="secondary">
          <Link href={`/blog/${data?.subdirectory}`}>
            <Book className="size-4" />
            View blog
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href={`/dashboard/sites/${siteId}/settings`}>
            <Settings className="size-4" />
            Settings
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/dashboard/sites/${siteId}/create`}>
            <PlusCircle className="size-4" />
            Create Article
          </Link>
        </Button>
      </div>
      {data?.posts.length == 0 ? (
        <EmptyState
          title="you don't have any articles created"
          description="Please create some articles so you can see them"
          buttonText="Create Article"
          href={`/dashboard/sites/${siteId}/create`}
        />
      ) : (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Articles</CardTitle>
              <CardDescription>View all articles for this site</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Actions</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.posts.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Image
                          src={item.image}
                          alt="article Image"
                          width={64}
                          height={64}
                          className="size-16 rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.title}
                      </TableCell>
                      <TableCell>{item.createdAt.toDateString()}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/sites/${siteId}/${item.id}`}
                              >
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/sites/${siteId}/${item.id}/delete`}
                              >
                                Delete
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className="bg-green-500/10 text-green-500"
                        >
                          Published
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
