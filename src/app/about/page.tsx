export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-300 dark:to-blue-400">
          About
        </h1>
        <p className="text-base sm:text-lg text-gray-800 dark:text-gray-400 max-w-2xl mx-auto">
          Giới thiệu về blog và tác giả
        </p>
      </div>

      <section className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Xin chào! 👋
          </h2>
          <div className="space-y-4">
            <p className="text-gray-800 dark:text-gray-400">
              Đây là blog cá nhân chia sẻ kinh nghiệm về CTF (Capture The Flag) và bảo mật thông tin.
            </p>
            <p className="text-gray-800 dark:text-gray-400">
              Tôi tập trung vào lĩnh vực chính:
            </p>
            <ul className="list-disc list-inside text-gray-800 dark:text-gray-400 space-y-2 ml-4">
              <li>Web Exploitation</li>
              
            </ul>
            <p className="text-gray-800 dark:text-gray-400">
              Mục tiêu của blog là chia sẻ kiến thức, writeup các bài CTF và các nghiên cứu về lỗ hổng bảo mật.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
