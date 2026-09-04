import { getSortedWriteupsData } from '@/lib/writeups';
import Link from 'next/link';

export default function WriteupsPage() {
  const allWriteupsData = getSortedWriteupsData();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-300 dark:to-blue-400">
          CTF Writeups
        </h1>
        <p className="text-base sm:text-lg text-gray-800 dark:text-gray-400 max-w-2xl mx-auto px-4">
          Tổng hợp các writeup từ các cuộc thi CTF
        </p>
      </div>

      {allWriteupsData.length === 0 ? (
        <section className="text-center py-20">
          <div className="text-gray-400 dark:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-xl text-center">
              Chưa có writeup nào...
            </p>
            <p className="text-sm mt-2 text-center">
              Các writeup sẽ được cập nhật sau các cuộc thi CTF
            </p>
          </div>
        </section>
      ) : (
        <section className="mb-12">
          <div className="max-w-3xl mx-auto space-y-6">
            {allWriteupsData.map(({ id, date, title, description, ctf, category, difficulty, tags }) => (
              <div key={id} className="p-5 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-2">
                  <span>📅 {date}</span>
                  {category && <span>• 📂 {category}</span>}
                  {difficulty && <span>• {difficulty}</span>}
                </div>

                {ctf && (
                  <p className="text-xs text-blue-500 dark:text-blue-400 mb-2">🚩 {ctf}</p>
                )}

                <Link href={`/writeups/${id}`} className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  {title}
                </Link>

                {description && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{description}</p>
                )}

                {tags && tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {tags.map((tag: string, index: number) => (
                      <span key={index} className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
