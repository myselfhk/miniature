import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getAdminCaseStudies } from "@/lib/admin/queries";
import { toggleCaseStudyStatus } from "@/lib/admin/actions";
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
import { Input } from "@/components/admin/ui/input";
import { cn } from "@/lib/utils";

type PageProps = {
  searchParams?: { q?: string; status?: string };
};

export default async function AdminCaseStudiesPage({
  searchParams,
}: PageProps) {
  await requireAdmin();
  const query = searchParams?.q ?? "";
  const status = searchParams?.status ?? "all";
  const cases = await getAdminCaseStudies(query, status);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Case studies</h1>
          <p className="text-sm text-white/60">Manage work entries.</p>
        </div>
        <Link
          href="/admin/case-studies/new"
          className={cn(buttonVariants({ variant: "default" }))}
        >
          New case study
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
          {cases.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Link
                  href={`/admin/case-studies/${item.id}`}
                  className="text-white hover:underline"
                >
                  {item.title}
                </Link>
                <div className="text-xs text-white/50">{item.slug}</div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={item.status === "published" ? "success" : "warning"}
                >
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell className="text-xs text-white/50">
                {item.updated_at
                  ? new Date(item.updated_at).toLocaleDateString("en-US")
                  : "—"}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Link
                    href={`/work/${item.slug}?preview=1`}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                    )}
                  >
                    Preview
                  </Link>
                  <form
                    action={toggleCaseStudyStatus.bind(
                      null,
                      item.id,
                      item.status !== "published",
                      item.slug,
                    )}
                  >
                    <Button type="submit" variant="outline" size="sm">
                      {item.status === "published" ? "Unpublish" : "Publish"}
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
