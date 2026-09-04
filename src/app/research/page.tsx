export default function ResearchPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mb-8">
          Security Research
        </h1>
        <p className="text-base sm:text-lg text-gray-800 dark:text-gray-400 max-w-2xl mx-auto">
          Nghiên cứu và phân tích về các lỗ hổng bảo mật
        </p>
      </div>

      <section className="py-5 border border-gray-200 dark:border-gray-800 rounded-xl">
        <div className="text-gray-400 dark:text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <p className="text-xl text-center">
            Nội dung đang được cập nhật...
          </p>
        </div>
      </section>
    </main>
  );
}
