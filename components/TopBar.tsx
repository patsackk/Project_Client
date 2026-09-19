'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { PanelLeftOpen } from 'lucide-react';

type TopBarProps = {
  sidebarOpen: boolean;
  onOpenSidebar: () => void;
};

export default function TopBar({ sidebarOpen, onOpenSidebar }: TopBarProps) {
  const [username, setUsername] = useState<string | null>(null);

  //  sync login / logout real-time
  useEffect(() => {
    const syncAuth = () => {
      setUsername(localStorage.getItem('username'));
    };

    syncAuth();
    window.addEventListener('storage', syncAuth);
    window.addEventListener('focus', syncAuth);

    return () => {
      window.removeEventListener('storage', syncAuth);
      window.removeEventListener('focus', syncAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    window.dispatchEvent(new Event('storage'));

    toast.success('Logged out successfully!');
  };

  return (
    <div className="sticky top-0 z-20 flex items-center justify-between gap-3 bg-white/90 backdrop-blur border-b px-4 py-2.5">
      <div className="flex items-center gap-3">
        {!sidebarOpen && (
          <button
            onClick={onOpenSidebar}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-sky-100 transition"
            aria-label="Show sidebar"
          >
            <PanelLeftOpen size={18} />
          </button>
        )}
        <span className="font-semibold text-sm text-gray-700">UTO Advance</span>
      </div>

      {!username ? (
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="px-4 py-1.5 rounded-full border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="px-4 py-1.5 rounded-full border border-sky-600 bg-sky-600 text-white text-sm hover:bg-sky-700 transition"
          >
            Sign up
          </Link>
        </div>
      ) : (
        <button
          onClick={handleLogout}
          className="px-4 py-1.5 rounded-full border border-red-600 bg-red-600 text-white text-sm hover:bg-red-700 transition"
        >
          Logout
        </button>
      )}
    </div>
  );
}
