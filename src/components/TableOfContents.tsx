'use client';

import { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ contentId = 'writeup-content' }: { contentId?: string }) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    let intersectionObserver: IntersectionObserver | undefined;

    const collectHeadings = () => {
      const content = document.getElementById(contentId);
      if (!content) return;

      const headingElements = content.querySelectorAll('h1, h2, h3, h4');
      const items: TOCItem[] = [];

      headingElements.forEach((heading, index) => {
        let id = heading.id;
        if (!id) {
          const cleanText = (heading.textContent || '').replace(/^#\s*/, '');
          id = cleanText
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim() || `heading-${index}`;
          heading.id = id;
        }

        items.push({
          id,
          text: (heading.textContent || '').replace(/^#\s*/, ''),
          level: parseInt(heading.tagName.substring(1))
        });
      });

      setHeadings(items);

      intersectionObserver?.disconnect();
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveId(entry.target.id);
          });
        },
        { rootMargin: '-100px 0px -80% 0px', threshold: 0.5 }
      );
      headingElements.forEach((heading) => intersectionObserver?.observe(heading));
    };

    collectHeadings();
    const mutationObserver = new MutationObserver(collectHeadings);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      intersectionObserver?.disconnect();
    };
  }, [contentId]);

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
