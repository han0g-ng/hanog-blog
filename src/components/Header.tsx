"use client"; 

import Link from 'next/link';
import ThemeToggleButton from './ThemeToggleButton';

const Header = () => {
  return (
    <header className="bg-white text-slate-800 shadow-md dark:bg-gray-900 dark:text-white dark:border-b dark:border-gray-700">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-cyan-400">
          Hanog Blog
        </Link>
        <nav className="flex items-center">
          <Link href="/about" className="ml-6 hover:text-cyan-400">
            About
          </Link>
          <Link href="/tags" className="ml-6 hover:text-cyan-400">
            Tags
          </Link>
          <div className="ml-6">
            <ThemeToggleButton />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;