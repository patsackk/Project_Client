'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Bell, ClipboardList, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

const POLL_INTERVAL_MS = 30_000;

// Notifications newer than this timestamp count as unread. Stored per
// browser, since the database has no per-user read state.
const SEEN_KEY = 'notificationsSeenAt';

type Notification = {
  id: string;
  type: 'status' | 'reply';
  title: string;
  body: string;
  href: string;
  createdAt: string;
};

function readSeenAt() {
  try {
    return Number(localStorage.getItem(SEEN_KEY)) || 0;
  } catch {
    return 0;
  }
}

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [seenAt, setSeenAt] = useState(0);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang, t, locale } = useLanguage();

  useEffect(() => {
    setSeenAt(readSeenAt());

    const load = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await fetch('/api/notifications', {
          headers: { Authorization: `Bearer ${token}` },
          cache: 'no-store',
        });
        if (!res.ok) return;
        const data = await res.json();
        setNotifications(data.notifications);
      } catch {
        // Keep showing the last known state on network errors.
      }
    };

    load();
    const interval = setInterval(load, POLL_INTERVAL_MS);
    window.addEventListener('focus', load);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', load);
    };
    // Titles are translated server-side (from the lang cookie), so refetch
    // when the language changes.
  }, [lang]);

  useEffect(() => {
    if (!open) return;

    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  // Closing the panel (by any means) marks everything currently shown as
  // read, so unread items stay highlighted while it's open.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (wasOpen.current && !open) {
      const now = Date.now();
      try {
        localStorage.setItem(SEEN_KEY, String(now));
      } catch {}
      setSeenAt(now);
    }
    wasOpen.current = open;
  }, [open]);

  const isUnread = (n: Notification) => new Date(n.createdAt).getTime() > seenAt;
  const unreadCount = notifications.filter(isUnread).length;

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-sky-100 hover:text-sky-700 transition"
        aria-label={
          unreadCount > 0
            ? t(`Notifications (${unreadCount} unread)`, `การแจ้งเตือน (ยังไม่ได้อ่าน ${unreadCount})`)
            : t('Notifications', 'การแจ้งเตือน')
        }
        aria-expanded={open}
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-red-600 text-[10px] font-semibold text-white">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="card absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] overflow-hidden z-30">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <span className="text-sm font-semibold text-gray-900">{t('Notifications', 'การแจ้งเตือน')}</span>
            {unreadCount > 0 && (
              <span className="badge bg-sky-100 text-sky-700">{t(`${unreadCount} new`, `ใหม่ ${unreadCount}`)}</span>
            )}
          </div>

          {notifications.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-gray-500">
              {t("You're all caught up.", 'ไม่มีการแจ้งเตือนใหม่')}
            </p>
          ) : (
            <ul className="max-h-80 overflow-y-auto divide-y">
              {notifications.map((n) => {
                const Icon = n.type === 'status' ? ClipboardList : MessageSquare;
                const content = (
                  <div className="flex gap-3">
                    <Icon size={16} className="mt-0.5 shrink-0 text-sky-600" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-gray-900 truncate">{n.title}</span>
                        {isUnread(n) && <span className="w-2 h-2 shrink-0 rounded-full bg-sky-600" />}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{n.body}</p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        {new Date(n.createdAt).toLocaleDateString(locale)}
                      </p>
                    </div>
                  </div>
                );

                return (
                  <li key={n.id} className={isUnread(n) ? 'bg-sky-50/60' : ''}>
                    <Link
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 hover:bg-sky-50 transition"
                    >
                      {content}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
