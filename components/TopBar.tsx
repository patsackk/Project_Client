'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { PanelLeftOpen } from 'lucide-react';
import NotificationBell from '@/components/NotificationBell';
import LanguageToggle from '@/components/LanguageToggle';
import { useLanguage } from '@/components/LanguageProvider';

type TopBarProps = {
  sidebarOpen: boolean;
  onOpenSidebar: () => void;
};

export default function TopBar({ sidebarOpen, onOpenSidebar }: TopBarProps) {
  const [username, setUsername] = useState<string | null>(null);
  const { t } = useLanguage();

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

    toast.success(t('Logged out successfully!', 'ออกจากระบบเรียบร้อยแล้ว'));
  };

  return (
    <div className="sticky top-0 z-20 flex items-center justify-between gap-3 bg-white/90 backdrop-blur border-b px-4 py-2.5">
      <div className="flex items-center gap-3">
        {!sidebarOpen && (
          <button
            onClick={onOpenSidebar}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-sky-100 transition"
            aria-label={t('Show sidebar', 'แสดงแถบด้านข้าง')}
          >
            <PanelLeftOpen size={18} />
          </button>
        )}
        <span className="font-semibold text-sm text-gray-700">UTO Advance</span>
      </div>

      {!username ? (
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <Link
            href="/login"
            className="btn-secondary px-4 py-1.5"
          >
            {t('Sign in', 'เข้าสู่ระบบ')}
          </Link>
          <Link
            href="/register"
            className="btn-primary px-4 py-1.5"
          >
            {t('Sign up', 'สมัครสมาชิก')}
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <NotificationBell />
          <button
            onClick={handleLogout}
            className="btn-danger px-4 py-1.5"
          >
            {t('Logout', 'ออกจากระบบ')}
          </button>
        </div>
      )}
    </div>
  );
}
