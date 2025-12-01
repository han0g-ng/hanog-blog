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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allPostsData.map(({ id, date, title, description }) => {
            // Determine the correct URL based on the post location
            const postUrl = id === 'hello-world' 
              ? `/posts/${id}` 
              : `/writeups/${id.replace('writeup/', '')}`;
            
            return (
              <div key={id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 aspect-square flex flex-col">
                <div className="p-6 flex flex-col h-full">
                  <p className="text-sm text-green-500 dark:text-green-400 mb-2 flex-shrink-0">{date}</p>
                  <Link href={postUrl} className="block flex-grow flex flex-col">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400 transition-colors line-clamp-2 flex-shrink-0">
                      {title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-800 dark:text-gray-400 line-clamp-4 flex-grow overflow-hidden">{description}</p>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}