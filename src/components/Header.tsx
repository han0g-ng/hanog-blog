"use client"; 

import Link from 'next/link';
import ThemeToggleButton from './ThemeToggleButton';
import { useState } from 'react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="no-print bg-white/80 backdrop-blur-sm text-slate-800 shadow-md dark:bg-gray-900/80 dark:text-white dark:border-b dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
              Hanog
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/writeups" className="nav-link hover:text-green-400 transition-colors">
              Writeups
            </Link>
            <Link href="/research" className="nav-link hover:text-green-400 transition-colors">
              Research
            </Link>
            <Link href="/about" className="nav-link hover:text-green-400 transition-colors">
              About
            </Link>
            <div className="ml-4">
              <ThemeToggleButton />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggleButton />
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/writeups" 
                className="nav-link hover:text-green-400 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Writeups
              </Link>
              <Link 
                href="/research" 
                className="nav-link hover:text-green-400 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Research
              </Link>
              <Link 
                href="/about" 
                className="nav-link hover:text-green-400 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;