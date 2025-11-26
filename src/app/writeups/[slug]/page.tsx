import { getWriteupData, getAllWriteupIds } from '@/lib/writeups';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const writeups = getAllWriteupIds();
  return writeups.map((writeup) => ({
    slug: writeup.params.slug,
  }));
}

export default async function WriteupPost({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  let writeupData;
  try {
    writeupData = await getWriteupData(slug);
  } catch (error) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back button */}
      <Link 
        href="/writeups"
        className="inline-flex items-center text-green-500 hover:text-green-400 mb-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Quay lại Writeups
      </Link>

      {/* Header */}
      <header className="mb-8">
        {writeupData.frontmatter.ctf && (
          <div className="text-sm font-semibold text-blue-500 dark:text-blue-400 mb-2">
            {writeupData.frontmatter.ctf}
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          {writeupData.frontmatter.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <time>{writeupData.frontmatter.date}</time>
          {writeupData.frontmatter.difficulty && (
            <>
              <span>•</span>
              <span className={`font-medium ${
                writeupData.frontmatter.difficulty === 'Easy' ? 'text-green-500' :
                writeupData.frontmatter.difficulty === 'Medium' ? 'text-yellow-500' :
                writeupData.frontmatter.difficulty === 'Hard' ? 'text-orange-500' :
                'text-red-500'
              }`}>
                {writeupData.frontmatter.difficulty}
              </span>
            </>
          )}
          {writeupData.frontmatter.category && (
            <>
              <span>•</span>
              <span className="text-purple-500 dark:text-purple-400">
                {writeupData.frontmatter.category}
              </span>
            </>
          )}
        </div>

        {writeupData.frontmatter.tags && writeupData.frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {writeupData.frontmatter.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none
        prose-headings:text-gray-800 dark:prose-headings:text-gray-200
        prose-p:text-gray-600 dark:prose-p:text-gray-400
        prose-a:text-green-500 dark:prose-a:text-green-400
        prose-code:text-pink-500 dark:prose-code:text-pink-400
        prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800
        prose-pre:text-gray-800 dark:prose-pre:text-gray-200
        prose-strong:text-gray-800 dark:prose-strong:text-gray-200
        prose-img:rounded-lg prose-img:shadow-lg
      ">
        <MDXRemote source={writeupData.content} />
      </div>
    </article>
  );
}
