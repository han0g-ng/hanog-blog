import { getWriteupData, getAllWriteupIds } from '@/lib/writeups';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrism from 'rehype-prism-plus';

type Props = {
    params: Promise<{ slug: string }>;
};

// Generate static params for all writeups
export async function generateStaticParams() {
    const paths = getAllWriteupIds();
    return paths.map(path => ({
        slug: path.params.slug,
    }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const { frontmatter } = await getWriteupData(slug);
    return {
        title: frontmatter.title || slug,
        description: frontmatter.description || 'CTF Writeup',
    };
}

// Main component to render the writeup
export default async function Writeup({ params }: Props) {
    const { slug } = await params;
    const { frontmatter, content } = await getWriteupData(slug);

    const { content: compiledContent } = await compileMDX({
        source: content,
        options: {
            parseFrontmatter: false,
            mdxOptions: {
                rehypePlugins: [rehypePrism],
            },
        },
    });

    return (
        <article className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-gray-100">
                        {frontmatter.title || slug}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        {frontmatter.date && (
                            <span className="flex items-center">
                                📅 {frontmatter.date}
                            </span>
                        )}
                        {frontmatter.ctf && (
                            <span className="flex items-center">
                                🚩 {frontmatter.ctf}
                            </span>
                        )}
                        {frontmatter.category && (
                            <span className="flex items-center">
                                📂 {frontmatter.category}
                            </span>
                        )}
                        {frontmatter.difficulty && (
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                frontmatter.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                frontmatter.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            }`}>
                                {frontmatter.difficulty}
                            </span>
                        )}
                    </div>
                    
                    {frontmatter.tags && frontmatter.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {frontmatter.tags.map((tag: string, index: number) => (
                                <span key={index} className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                    
                    {frontmatter.description && (
                        <p className="mt-4 text-gray-600 dark:text-gray-400 text-base sm:text-lg">
                            {frontmatter.description}
                        </p>
                    )}
                </div>

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none
                    prose-headings:text-gray-900 dark:prose-headings:text-gray-100
                    prose-p:text-gray-700 dark:prose-p:text-gray-300
                    prose-a:text-green-500 hover:prose-a:text-green-600
                    prose-strong:text-gray-900 dark:prose-strong:text-gray-100
                    prose-code:text-green-600 dark:prose-code:text-green-400
                    prose-code:bg-gray-100 dark:prose-code:bg-gray-800
                    prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                    prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950
                    prose-pre:text-gray-100
                    prose-img:rounded-lg prose-img:shadow-lg
                ">
                    {compiledContent}
                </div>
            </div>
        </article>
    );
}
