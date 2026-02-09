import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/content";
import { getWorkItems } from "@/lib/prismic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const work = await getWorkItems();

  const base = "https://miniature.studio";

  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/work`, lastModified: new Date() },
    { url: `${base}/archive`, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/start-a-project`, lastModified: new Date() },
    { url: `${base}/blog`, lastModified: new Date() },
    ...posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.published_at
        ? new Date(post.published_at)
        : new Date(),
    })),
    ...work.map((item) => ({
      url: `${base}/work/${item.uid}`,
      lastModified: new Date(),
    })),
  ];
}
