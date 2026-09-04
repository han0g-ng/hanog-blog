// src/app/page.tsx
import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-300 dark:to-blue-400">
          CTF Writeups & Security Research
        </h1>
        <p className="text-base sm:text-lg text-gray-800 dark:text-gray-400 max-w-2xl mx-auto px-4">
          Chia sẻ kinh nghiệm về CTF, bảo mật và nghiên cứu lỗ hổng
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          <span className="border-b-4 border-green-400">Bài viết mới nhất</span>
        </h2>
        <div className="space-y-6">
          {allPostsData.map(({ id, date, title, description }) => {
            const postUrl = id.startsWith('blog/')
              ? `/blogs/${id.replace('blog/', '')}`
              : id.startsWith('writeup/')
              ? `/writeups/${id.replace('writeup/', '')}`
              : `/posts/${id}`;
            
            return (
              <div key={id} className="p-5 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-2">
                  <span>📅 {date}</span>
                </div>

                <Link href={postUrl} className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  {title}
                </Link>

                {description && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{description}</p>
                )}
                </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}