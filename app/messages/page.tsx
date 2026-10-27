'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Reply } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

type ContactMessage = {
  id: number;
  message: string;
  createdAt: string;
  reply: string | null;
  repliedAt: string | null;
};

const formatDate = (date: string, locale: string) =>
  new Date(date).toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' });

export default function MyMessagesPage() {
  const [signedIn, setSignedIn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const { t, locale } = useLanguage();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setSignedIn(false);
      setLoading(false);
      return;
    }

    fetch('/api/messages', {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.message || t('Failed to load messages.', 'โหลดข้อความไม่สำเร็จ'));
        return json;
      })
      .then((data) => setMessages(data.messages))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- load once; `t` only affects the fallback error text
  }, []);

  // Notification links point at #message-<id>. The list loads after the
  // page does, so scroll once it's rendered (and again on later hash changes).
  useEffect(() => {
    if (loading) return;

    const scrollToHash = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setHighlightId(id);
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, [loading]);

  const card = (children: React.ReactNode) => (
    <div className="px-6 py-16">
      <div className="card max-w-3xl mx-auto p-8 md:p-10">{children}</div>
    </div>
  );

  if (loading) {
    return card(<p className="text-gray-500">{t('Loading your messages…', 'กำลังโหลดข้อความ…')}</p>);
  }

  if (!signedIn) {
    return card(
      <div className="text-center py-6">
        <h1 className="section-title mb-2">{t('Sign in to view your messages', 'เข้าสู่ระบบเพื่อดูข้อความของคุณ')}</h1>
        <p className="text-gray-500 mb-6">{t('You need to be logged in to see your messages and replies.', 'คุณต้องเข้าสู่ระบบก่อนจึงจะดูข้อความและการตอบกลับได้')}</p>
        <Link href="/login" className="btn-primary">
          {t('Sign in', 'เข้าสู่ระบบ')}
        </Link>
      </div>
    );
  }

  if (error) {
    return card(<p className="alert-error">{error}</p>);
  }

  return (
    <div className="px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="section-title">{t('My Messages', 'ข้อความของฉัน')}</h1>
            <p className="text-sm text-gray-500">{t('Your messages to our team and their replies.', 'ข้อความที่คุณส่งถึงทีมงานและการตอบกลับ')}</p>
          </div>
          <Link href="/contact" className="btn-primary shrink-0">
            <Plus size={16} />
            {t('New message', 'ส่งข้อความใหม่')}
          </Link>
        </div>

        {messages.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-gray-500">{t("You haven't sent any messages yet.", 'คุณยังไม่ได้ส่งข้อความใด ๆ')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((m) => {
              const anchor = `message-${m.id}`;
              return (
                <div
                  key={m.id}
                  id={anchor}
                  className={`card p-6 scroll-mt-24 transition ${
                    highlightId === anchor ? 'ring-2 ring-sky-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-xs text-gray-500">{t('You', 'คุณ')} · {formatDate(m.createdAt, locale)}</span>
                    {m.reply ? (
                      <span className="badge bg-green-100 text-green-700">{t('Replied', 'ตอบกลับแล้ว')}</span>
                    ) : (
                      <span className="badge bg-amber-100 text-amber-700">{t('Pending', 'รอการตอบกลับ')}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-800 whitespace-pre-wrap">{m.message}</p>

                  {m.reply && (
                    <div className="mt-4 rounded-xl border border-sky-100 bg-sky-50 p-4">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-sky-700 mb-1">
                        <Reply size={13} />
                        UTO Advance{m.repliedAt && ` · ${formatDate(m.repliedAt, locale)}`}
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{m.reply}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
