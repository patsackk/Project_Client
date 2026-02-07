'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type HeaderProps = {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (v: boolean) => void;
};

export default function Header({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: HeaderProps) {
  const [username, setUsername] = useState<string | null>(null);

  // 🔁 Sync login state immediately
  useEffect(() => {
    const syncAuth = () => {
      setUsername(localStorage.getItem('username'));
    };

    syncAuth();
    window.addEventListener('auth-change', syncAuth);
    return () => window.removeEventListener('auth-change', syncAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    window.dispatchEvent(new Event('auth-change'));
    setIsMobileMenuOpen(false);
  };

  const menuItems = ['Home', 'About', 'Projects', 'Contact'];


  return (
    <>
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-gray-200">
        <div className="w-full flex items-center justify-between px-6 py-4">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="h-10 w-10 object-contain"
            />
            <span className="text-xl font-bold text-gray-800">
              UTO Advance
            </span>
          </div>

          {/* ===== DESKTOP MENU ===== */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item}
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="text-sm font-medium text-gray-700 hover:text-sky-700 transition"
              >
                {item}
              </Link>
            ))}

            {!username ? (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <button className="px-5 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-100 transition">
                    Sign in
                  </button>
                </Link>
                <Link href="/register">
                  <button className="px-5 py-2 rounded-full bg-gradient-to-r from-sky-600 to-sky-800 text-white text-sm shadow hover:opacity-90 transition">
                    Sign up
                  </button>
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-full bg-red-600 text-white text-sm hover:bg-red-700 transition"
              >
                Logout
              </button>
            )}
          </nav>

          {/* ===== HAMBURGER ===== */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d={
                  isMobileMenuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>
        </div>
      </header>

      {/* ===== MOBILE MENU ===== */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white shadow-xl rounded-b-3xl px-6 py-6">
          <ul className="flex flex-col gap-5 text-center">
            {menuItems.map((item) => (
              <li key={item}>
                <Link
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-lg font-medium text-gray-800 hover:text-sky-700 transition"
                >
                  {item}
                </Link>
              </li>
            ))}

            <div className="h-px bg-gray-200 my-2" />

            {!username ? (
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 rounded-full border border-gray-300 text-gray-700 text-sm"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 rounded-full bg-gradient-to-r from-sky-600 to-sky-800 text-white text-sm"
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="py-3 rounded-full bg-red-600 text-white text-sm"
              >
                Logout
              </button>
            )}
          </ul>
        </nav>
      )}
    </>
  );
}
