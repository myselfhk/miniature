import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getAdminPages } from "@/lib/admin/queries";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/admin/ui/table";
import { Badge } from "@/components/admin/ui/badge";
import { buttonVariants } from "@/components/admin/ui/button";
import { cn } from "@/lib/utils";

export default async function AdminPagesPage() {
  await requireAdmin();
  const pages = await getAdminPages();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Pages</h1>
          <p className="text-sm text-white/60">
            Manage landing pages (Home, About, etc).
          </p>
        </div>
        <Link
          href="/admin/pages/new"
          className={cn(buttonVariants({ variant: "default" }))}
        >
          New page
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/10 hover:bg-white/5">
              <TableHead className="text-white/60">Title / Slug</TableHead>
              <TableHead className="text-white/60">Status</TableHead>
              <TableHead className="text-white/60">Updated</TableHead>
              <TableHead className="text-white/60">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((page) => (
              <TableRow
                key={page.id}
                className="border-white/10 hover:bg-white/5"
              >
                <TableCell>
                  <Link
                    href={`/admin/pages/${page.id}`}
                    className="font-medium text-white hover:underline"
                  >
                    {page.title}
                  </Link>
                  <div className="text-xs text-white/50">/{page.slug}</div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      page.status === "published" ? "success" : "warning"
                    }
                  >
                    {page.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-white/50">
                  {new Date(page.updated_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Link
                    href={
                      page.slug === "home" ? "/" : `/${page.slug}?preview=1`
                    }
                    target="_blank"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                    )}
                  >
                    Preview
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
