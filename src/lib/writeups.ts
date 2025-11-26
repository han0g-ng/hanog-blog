// src/lib/writeups.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const writeupsDirectory = path.join(process.cwd(), 'posts/writeup');

export function getSortedWriteupsData() {
  // Check if directory exists
  if (!fs.existsSync(writeupsDirectory)) {
    return [];
  }

  // Get file names under /posts/writeup
  const fileNames = fs.readdirSync(writeupsDirectory);
  // Filter only .mdx files
  const mdxFiles = fileNames.filter((fileName) => fileName.endsWith('.mdx'));
  
  const allWriteupsData = mdxFiles.map((fileName) => {
    // Remove ".mdx" from file name to get id
    const id = fileName.replace(/\.mdx$/, '');

    // Read markdown file as string
    const fullPath = path.join(writeupsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { 
        title: string; 
        date: string; 
        description: string;
        ctf?: string;
        category?: string;
        difficulty?: string;
        tags?: string[];
      }),
    };
  });

  // Sort writeups by date
  return allWriteupsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllWriteupIds() {
  if (!fs.existsSync(writeupsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(writeupsDirectory);
  const mdxFiles = fileNames.filter((fileName) => fileName.endsWith('.mdx'));
  
  return mdxFiles.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.mdx$/, ''),
      },
    };
  });
}

export async function getWriteupData(slug: string) {
  const fullPath = path.join(writeupsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  return {
    slug,
    frontmatter: matterResult.data,
    content: matterResult.content,
  };
}
