import { requireAdmin } from "@/lib/auth";
import { getAdminApplications } from "@/lib/admin/queries";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/admin/ui/table";
import { Badge } from "@/components/admin/ui/badge";

export default async function AdminApplicationsPage() {
  await requireAdmin();
  const applications = await getAdminApplications();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Consultant Applications</h1>
          <p className="text-sm text-white/60">Inbox for the People network.</p>
        </div>
        <div className="text-sm text-white/40">
          {applications.length} applications
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/10 hover:bg-white/5">
              <TableHead className="text-white/60">Name / Email</TableHead>
              <TableHead className="text-white/60">Role</TableHead>
              <TableHead className="text-white/60">Tags</TableHead>
              <TableHead className="text-white/60">Rate</TableHead>
              <TableHead className="text-white/60">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow
                key={app.id}
                className="border-white/10 hover:bg-white/5"
              >
                <TableCell>
                  <div className="font-medium text-white">{app.name}</div>
                  <div className="text-xs text-white/50">{app.email}</div>
                  {app.linkedin && (
                    <a
                      href={app.linkedin}
                      target="_blank"
                      className="text-xs text-teal-400 hover:underline"
                    >
                      LinkedIn
                    </a>
                  )}
                </TableCell>
                <TableCell>
                  <div className="text-sm text-white/80">{app.role}</div>
                  <div className="text-xs text-white/50">
                    {app.current_company || "Freelance"}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {app.expertise_tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-[10px]"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {app.expertise_tags.length > 3 && (
                      <span className="text-xs text-white/40">
                        +{app.expertise_tags.length - 3}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-white/60">
                  {app.hourly_rate_range}
                </TableCell>
                <TableCell className="text-xs text-white/50">
                  {new Date(app.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
            {applications.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-white/40"
                >
                  No applications yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
