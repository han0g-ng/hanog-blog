import type { MetadataRoute } from "next";
import { getSortedPostsData } from "@/lib/posts";
import { getSortedblogsData } from "@/lib/blogs";
import { getSortedWriteupsData } from "@/lib/writeups";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hanog.blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/blogs`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/writeups`, changeFrequency: "weekly", priority: 0.8 },
  ];

  const posts = getSortedPostsData().filter((post) => !post.id.includes("/")).map((post) => ({
    url: `${siteUrl}/posts/${post.id}`,
    lastModified: post.date ? new Date(post.date) : undefined,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogs = getSortedblogsData().map((blog) => ({
    url: `${siteUrl}/blogs/${blog.id}`,
    lastModified: blog.date ? new Date(blog.date) : undefined,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const writeups = getSortedWriteupsData().map((writeup) => ({
    url: `${siteUrl}/writeups/${writeup.id}`,
    lastModified: writeup.date ? new Date(writeup.date) : undefined,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...posts, ...blogs, ...writeups];
}