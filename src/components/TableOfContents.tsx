'use client';

import { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Lấy tất cả heading trong nội dung
    const content = document.querySelector('#writeup-content');
    if (!content) return;

    const headingElements = content.querySelectorAll('h1, h2, h3, h4');
    const items: TOCItem[] = [];

    headingElements.forEach((heading, index) => {
      // Tạo ID từ text nếu chưa có
      let id = heading.id;
      if (!id) {
        const text = heading.textContent || '';
        // Loại bỏ # ở đầu nếu có
        const cleanText = text.replace(/^#\s*/, '');
        id = cleanText
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim() || `heading-${index}`;
        heading.id = id;
      }

      const text = heading.textContent || '';
      const cleanText = text.replace(/^#\s*/, ''); // Loại bỏ # ở đầu

      items.push({
        id,
        text: cleanText,
        level: parseInt(heading.tagName.substring(1))
      });
    });

    setHeadings(items);

    // Theo dõi scroll để highlight mục đang xem
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { 
        rootMargin: '-100px 0px -80% 0px',
        threshold: 0.5
      }
    );

    headingElements.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Offset cho header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="toc-container">
      <h3 className="toc-title">📑 Mục lục</h3>
      <ul className="toc-list">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`toc-item toc-level-${heading.level} ${
              activeId === heading.id ? 'active' : ''
            }`}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={activeId === heading.id ? 'active' : ''}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
