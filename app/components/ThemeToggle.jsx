'use client';

import { useState, useEffect } from 'react';
import { BsSun, BsMoon } from 'react-icons/bs';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const newTheme = theme === 'light' ? 'dark' : 'light';

    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');

    setTimeout(() => setIsAnimating(false), 600);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 flex items-center justify-center">
      <button
        onClick={toggleTheme}
        disabled={isAnimating}
        className={`
          relative overflow-hidden
          w-12 h-12 rounded-full
          bg-gradient-to-br from-white to-gray-100
          dark:from-gray-800 dark:to-gray-900
          hover:from-gray-50 hover:to-gray-200
          dark:hover:from-gray-700 dark:hover:to-gray-800
          shadow-lg dark:shadow-gray-900/30
          border border-gray-200 dark:border-gray-700
          transform transition-all duration-500
          hover:scale-110 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
          group
          ${isAnimating ? 'animate-pulse' : ''}
        `}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      >
        <div
          className={`
          absolute inset-0 rounded-full
          bg-gradient-to-r from-blue-500 to-purple-500 dark:from-orange-400 dark:to-yellow-300
          opacity-0 group-hover:opacity-10
          transition-opacity duration-300
        `}
        />

        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div
            className={`
            absolute inset-0 transform
            ${isAnimating ? 'animate-ripple' : ''}
            bg-white dark:bg-gray-800
            opacity-0
          `}
          />
        </div>

        <div className="relative w-full h-full flex items-center justify-center">
          <div
            className={`
            absolute transform transition-all duration-500 ease-spring
            ${
              theme === 'light'
                ? 'rotate-0 translate-y-0 opacity-100'
                : '-rotate-90 translate-y-full opacity-0'
            }
          `}
          >
            <BsMoon
              className="w-6 h-6 text-gray-800 dark:text-gray-200
              group-hover:text-blue-600 dark:group-hover:text-blue-400
              transition-colors duration-300"
            />
          </div>

          <div
            className={`
            absolute transform transition-all duration-500 ease-spring
            ${
              theme === 'dark'
                ? 'rotate-0 translate-y-0 opacity-100'
                : 'rotate-90 -translate-y-full opacity-0'
            }
          `}
          >
            <BsSun
              className="w-6 h-6 text-gray-800 dark:text-gray-200
              group-hover:text-yellow-500 dark:group-hover:text-yellow-400
              transition-colors duration-300"
            />
          </div>
        </div>

        <div
          className={`
          absolute inset-0 rounded-full
          border-2 border-transparent
          group-hover:border-gray-300 dark:group-hover:border-gray-600
          transform transition-all duration-300
          scale-125 group-hover:scale-105
          opacity-0 group-hover:opacity-100
        `}
        />
      </button>
    </div>
  );
};

export default ThemeToggle;
