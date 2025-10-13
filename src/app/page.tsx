// src/app/page.tsx
import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Tech Blog</h1>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Bài viết mới nhất</h2>
        <ul>
          {allPostsData.map(({ id, date, title, description }) => (
            <li key={id} className="mb-6">
              <Link href={`/posts/${id}`} className="text-xl font-bold text-blue-600 hover:underline">
                {title}
              </Link>
              <p className="text-gray-600 text-sm mt-1">{date}</p>
              <p className="text-gray-800 mt-2">{description}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}