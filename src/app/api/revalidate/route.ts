import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { paths } = (await request.json()) as { paths?: string[] };
  if (!paths?.length) {
    return NextResponse.json(
      { ok: false, error: "No paths provided" },
      { status: 400 },
    );
  }

  paths.forEach((path) => revalidatePath(path));
  return NextResponse.json({ ok: true, paths });
}
