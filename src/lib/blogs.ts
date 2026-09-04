// src/lib/blogs.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogsDirectory = path.join(process.cwd(), 'posts/blog');

export interface BlogItem {
  id: string;
  title: string;
  date: string;
  description: string;
  ctf?: string;
  category?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard' | string;
  tags?: string[];
}

export function getSortedblogsData(): BlogItem[] {
  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogsDirectory);
  const mdxFiles = fileNames.filter((fileName) => fileName.endsWith('.mdx'));

  const allblogsData = mdxFiles.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(blogsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const title = matterResult.data.title || id.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

    return {
      id,
      title,
      date: matterResult.data.date || new Date().toISOString().split('T')[0],
      description: matterResult.data.description || '',
      ctf: matterResult.data.ctf,
      category: matterResult.data.category,
      difficulty: matterResult.data.difficulty,
      tags: matterResult.data.tags || [],
    };
  });

  return allblogsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllblogIds() {
  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogsDirectory);
  const mdxFiles = fileNames.filter((fileName) => fileName.endsWith('.mdx'));

  return mdxFiles.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.mdx$/, ''),
    },
  }));
}

export async function getblogData(slug: string) {
  const fullPath = path.join(blogsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Blog post not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    slug,
    frontmatter: matterResult.data,
    content: matterResult.content,
  };
}