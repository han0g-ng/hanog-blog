// src/app/blogs/page.tsx
import Link from 'next/link';
import { getSortedblogsData } from '@/lib/blogs';

export const metadata = {
  title: 'Blog',
  description: 'Danh sách các bài viết blog',
};

export default function BlogListPage() {
  const blogs = getSortedblogsData();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mb-8">
        Tất cả bài viết
      </h1>

      {blogs.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">Chưa có bài viết nào trong thư mục posts/blog.</p>
      ) : (
        <div className="space-y-6">
          {blogs.map((item) => (
            <div
              key={item.id}
              className="p-5 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
            >
              <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-2">
                <span>📅 {item.date}</span>
                {item.category && <span>• 📂 {item.category}</span>}
              </div>

              <Link
                href={`/blogs/${item.id}`}
                className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                {item.title}
              </Link>

              {item.description && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {item.description}
                </p>
              )}

              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}