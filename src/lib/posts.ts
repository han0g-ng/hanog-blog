// src/lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

// Recursive function to get all MDX files
function getAllMdxFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recursively search in subdirectories
      getAllMdxFiles(filePath, fileList);
    } else if (file.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

export function getSortedPostsData() {
  // Get all MDX files recursively
  const allMdxFiles = getAllMdxFiles(postsDirectory);
  
  const allPostsData = allMdxFiles.map((fullPath) => {
    // Get relative path from posts directory
    const relativePath = path.relative(postsDirectory, fullPath);
    // Create id from relative path (remove .mdx extension)
    const id = relativePath.replace(/\.mdx$/, '').replace(/\\/g, '/');

    // Read markdown file as string
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { title: string; date: string; description: string }),
    };
  });

  // Sort posts by date, with hello-world always first
  return allPostsData.sort((a, b) => {
    // Always keep hello-world at the top
    if (a.id === 'hello-world') return -1;
    if (b.id === 'hello-world') return 1;
    
    // Sort others by date
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Thêm vào cuối file src/lib/posts.ts

// ... hàm getSortedPostsData ở trên

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  // Filter only .mdx files, ignore directories
  const mdxFiles = fileNames.filter((fileName) => fileName.endsWith('.mdx'));
  
  return mdxFiles.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.mdx$/, ''),
      },
    };
  });
}

export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  return {
    slug,
    frontmatter: matterResult.data,
    content: matterResult.content,
  };
}