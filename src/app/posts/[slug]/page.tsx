import { getPostData, getAllPostIds } from '@/lib/posts';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrism from 'rehype-prism-plus';

type Props = {
    params: { slug: string };
};

// Hàm này nói cho Next.js biết cần tạo ra những trang tĩnh nào
export async function generateStaticParams() {
    const paths = getAllPostIds();
    // Ví dụ paths = [{ params: { slug: 'hello-world' } }]
    // Chúng ta chỉ cần trả về [{ slug: 'hello-world' }]
    return paths.map(path => ({
        slug: path.params.slug,
    }));
}

// Hàm này tạo metadata (title, description) cho trang
export async function generateMetadata({ params }: Props) {
    const { frontmatter } = await getPostData(params.slug);
    return {
        title: frontmatter.title,
        description: frontmatter.description,
    };
}

// Component chính để render trang
export default async function Post({ params }: Props) {
    // BƯỚC 1: Lấy dữ liệu bài viết, bao gồm frontmatter và content
    const { frontmatter, content } = await getPostData(params.slug);

    // BƯỚC 2: Biên dịch nội dung MDX thành HTML/React components
    const { content: compiledContent } = await compileMDX({
        source: content,
        options: {
            parseFrontmatter: false, // Vì chúng ta đã xử lý frontmatter rồi
            mdxOptions: {
                rehypePlugins: [rehypePrism],
            },
        },
    });

    // BƯỚC 3: Trả về JSX để render ra trang (phần này phải ở BÊN TRONG hàm Post)
    return (
        <article className="container mx-auto px-4 py-8 prose lg:prose-xl">
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">{frontmatter.title}</h1>
            <p className="text-gray-500 mb-8">{frontmatter.date}</p>
            <div>
                {compiledContent}
            </div>
        </article>
    );
}