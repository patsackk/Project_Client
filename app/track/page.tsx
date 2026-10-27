'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import type { Translate } from '@/lib/i18n';

const ADMIN_ORIGIN = process.env.NEXT_PUBLIC_ADMIN_ORIGIN || '';

const statusBadge: Record<string, string> = {
  'Not Started': 'border-gray-300 bg-gray-50 text-gray-700',
  'In Progress': 'border-sky-300 bg-sky-50 text-sky-700',
  Completed: 'border-green-300 bg-green-50 text-green-700',
};

type TrackUpdate = {
  status: string;
  percentComplete: number;
  notes: string;
  photos: string[];
  createdAt: string;
};

type TrackResponse = {
  hasClient: boolean;
  project?: { name: string; location: string } | null;
  update?: TrackUpdate | null;
};

// Status values are stored in English; translate only for display.
function statusLabel(status: string, t: Translate) {
  const labels: Record<string, string> = {
    'Not Started': t('Not Started', 'ยังไม่เริ่ม'),
    'In Progress': t('In Progress', 'กำลังดำเนินการ'),
    Completed: t('Completed', 'เสร็จสมบูรณ์'),
  };
  return labels[status] ?? status;
}

function clarificationMessage(
  project: TrackResponse['project'],
  update: TrackUpdate | null | undefined,
  t: Translate
) {
  if (!update) {
    return t("I'd like clarification on my project status.", 'ขอสอบถามเพิ่มเติมเกี่ยวกับสถานะโครงการของฉัน');
  }
  const subject = project?.name ?? t('my project', 'โครงการของฉัน');
  const status = statusLabel(update.status, t);
  return t(
    `I'd like clarification on the recent update for ${subject} (${status}, ${update.percentComplete}% complete): "${update.notes}"`,
    `ขอสอบถามเพิ่มเติมเกี่ยวกับความคืบหน้าล่าสุดของ ${subject} (${status}, เสร็จแล้ว ${update.percentComplete}%): "${update.notes}"`
  );
}

export default function TrackStatusPage() {
  const [signedIn, setSignedIn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TrackResponse | null>(null);
  const { t, locale } = useLanguage();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setSignedIn(false);
      setLoading(false);
      return;
    }

    fetch('/api/track', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.message || t('Failed to load status.', 'โหลดสถานะไม่สำเร็จ'));
        return json as TrackResponse;
      })
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- load once; `t` only affects the fallback error text
  }, []);

  const card = (children: React.ReactNode) => (
    <div className="px-6 py-16">
      <div className="card max-w-3xl mx-auto p-8 md:p-10">{children}</div>
    </div>
  );

  if (loading) {
    return card(<p className="text-gray-500">{t('Loading your project status…', 'กำลังโหลดสถานะโครงการ…')}</p>);
  }

  if (!signedIn) {
    return card(
      <div className="text-center py-6">
        <h1 className="section-title mb-2">{t('Sign in to view your project status', 'เข้าสู่ระบบเพื่อดูสถานะโครงการของคุณ')}</h1>
        <p className="text-gray-500 mb-6">{t('You need to be logged in to see updates for your project.', 'คุณต้องเข้าสู่ระบบก่อนจึงจะดูความคืบหน้าของโครงการได้')}</p>
        <Link href="/login" className="btn-primary">
          {t('Sign in', 'เข้าสู่ระบบ')}
        </Link>
      </div>
    );
  }

  if (error) {
    return card(<p className="alert-error">{error}</p>);
  }

  if (!data?.hasClient) {
    return card(
      <div className="text-center py-6">
        <h1 className="section-title mb-2">{t('No active project yet', 'ยังไม่มีโครงการที่กำลังดำเนินการ')}</h1>
        <p className="text-gray-500">
          {t(
            "Once you're assigned to a project, its status will show up here.",
            'เมื่อคุณได้รับมอบหมายโครงการแล้ว สถานะจะแสดงที่นี่'
          )}
        </p>
      </div>
    );
  }

  const { project, update } = data;

  return card(
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h1 className="section-title">{t('Project Status', 'สถานะโครงการ')}</h1>
        <span
          className={`px-4 py-1 rounded-full border text-sm font-medium ${
            update ? statusBadge[update.status] ?? statusBadge['Not Started'] : statusBadge['Not Started']
          }`}
        >
          {statusLabel(update ? update.status : 'Not Started', t)}
        </span>
      </div>
      {project && (
        <p className="text-sm text-gray-500 mb-5">
          {project.name} • {project.location}
        </p>
      )}

      {/* Completion card */}
      <div className="border border-gray-200 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-600">{t('Current Completion', 'ความคืบหน้าปัจจุบัน')}</span>
          <span className="text-2xl font-bold text-gray-900">
            {update ? update.percentComplete : 0}%
          </span>
        </div>

        <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-sky-600"
            style={{ width: `${update ? update.percentComplete : 0}%` }}
          />
        </div>

        {update ? (
          <div className="mt-5 pt-5 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-600">
            <Clock size={16} />
            <span>
              {t('Recent Update:', 'อัปเดตล่าสุด:')}{' '}
              {new Date(update.createdAt).toLocaleDateString(locale, {
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        ) : (
          <p className="mt-5 pt-5 border-t border-gray-100 text-sm text-gray-500">
            {t('No updates posted yet.', 'ยังไม่มีการอัปเดต')}
          </p>
        )}
      </div>

      {/* Notes */}
      {update && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold tracking-wide text-gray-500 mb-3">
            {t('UPDATE NOTES', 'รายละเอียดการอัปเดต')}
          </h2>
          <p className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {update.notes}
          </p>
        </div>
      )}

      {/* Photos */}
      {update && update.photos.length > 0 && (
        <>
          <h2 className="text-xs font-semibold tracking-wide text-gray-500 mb-3">
            {t('PROGRESS PHOTOS', 'รูปภาพความคืบหน้า')}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            {update.photos.map((photo) => (
              <a
                key={photo}
                href={`${ADMIN_ORIGIN}${photo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block aspect-square rounded-xl overflow-hidden border border-gray-200"
              >
                <img
                  src={`${ADMIN_ORIGIN}${photo}`}
                  alt={t('Progress', 'ความคืบหน้า')}
                  className="w-full h-full object-cover"
                />
              </a>
            ))}
          </div>
        </>
      )}

      {/* Actions */}
      <Link
        href={`/contact?message=${encodeURIComponent(clarificationMessage(project, update, t))}`}
        className="btn-primary w-full py-3"
      >
        <MessageSquare size={18} />
        {t('Contact Admin', 'ติดต่อผู้ดูแล')}
      </Link>
    </>
  );
}
