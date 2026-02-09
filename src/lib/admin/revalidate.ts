export async function revalidatePaths(paths: string[]) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  await fetch(`${baseUrl}/api/revalidate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-revalidate-secret": process.env.REVALIDATE_SECRET ?? "",
    },
    body: JSON.stringify({ paths }),
  });
}
