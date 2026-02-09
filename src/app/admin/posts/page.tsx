import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getAdminPosts } from "@/lib/admin/queries";
import { togglePostStatus } from "@/lib/admin/actions";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/admin/ui/table";
import { Badge } from "@/components/admin/ui/badge";
import { Button, buttonVariants } from "@/components/admin/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/admin/ui/input";

type PageProps = {
  searchParams?: { q?: string; status?: string };
};

export default async function AdminPostsPage({ searchParams }: PageProps) {
  await requireAdmin();
  const query = searchParams?.q ?? "";
  const status = searchParams?.status ?? "all";
  const posts = await getAdminPosts(query, status);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Posts</h1>
          <p className="text-sm text-white/60">Manage the blog index.</p>
        </div>
        <Link
          href="/admin/posts/new"
          className={cn(buttonVariants({ variant: "default" }))}
        >
          New post
        </Link>
      </div>
      <form className="flex flex-wrap gap-3">
        <Input name="q" placeholder="Search title" defaultValue={query} />
        <Input
          name="status"
          placeholder="Status (all/draft/published)"
          defaultValue={status}
        />
        <Button type="submit" variant="outline">
          Filter
        </Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>
                <Link
                  href={`/admin/posts/${post.id}`}
                  className="text-white hover:underline"
                >
                  {post.title}
                </Link>
                <div className="text-xs text-white/50">{post.slug}</div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={post.status === "published" ? "success" : "warning"}
                >
                  {post.status}
                </Badge>
              </TableCell>
              <TableCell className="text-xs text-white/50">
                {post.updated_at
                  ? new Date(post.updated_at).toLocaleDateString("en-US")
                  : "—"}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Link
                    href={`/blog/${post.slug}?preview=1`}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                    )}
                  >
                    Preview
                  </Link>
                  <form
                    action={togglePostStatus.bind(
                      null,
                      post.id,
                      post.status !== "published",
                      post.slug,
                    )}
                  >
                    <Button type="submit" variant="outline" size="sm">
                      {post.status === "published" ? "Unpublish" : "Publish"}
                    </Button>
                  </form>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
