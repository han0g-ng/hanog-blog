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
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
          Tổng hợp các writeup từ các cuộc thi CTF
        </p>
      </div>

      {allWriteupsData.length === 0 ? (
        <section className="text-center py-20">
          <div className="text-gray-400 dark:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-xl">Chưa có writeup nào...</p>
            <p className="text-sm mt-2">Các writeup sẽ được cập nhật sau các cuộc thi CTF</p>
          </div>
        </section>
      ) : (
        <section className="mb-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allWriteupsData.map(({ id, date, title, description, ctf, category, difficulty, tags }) => (
              <div key={id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-green-500 dark:text-green-400">{date}</p>
                    {difficulty && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {difficulty}
                      </span>
                    )}
                  </div>
                  
                  {ctf && (
                    <p className="text-xs text-blue-500 dark:text-blue-400 mb-2">
                      🚩 {ctf}
                    </p>
                  )}
                  
                  <Link href={`/writeups/${id}`} className="block">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400 transition-colors">
                      {title}
                    </h3>
                  </Link>
                  
                  {category && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      📂 {category}
                    </p>
                  )}
                  
                  {description && (
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3">
                      {description}
                    </p>
                  )}
                  
                  {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag: string, index: number) => (
                        <span key={index} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
