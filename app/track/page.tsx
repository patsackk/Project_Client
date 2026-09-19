'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock, MessageSquare } from 'lucide-react';

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

function clarificationMessage(
  project: TrackResponse['project'],
  update: TrackUpdate | null | undefined
) {
  if (!update) return "I'd like clarification on my project status.";
  const subject = project?.name ?? 'my project';
  return `I'd like clarification on the recent update for ${subject} (${update.status}, ${update.percentComplete}% complete): "${update.notes}"`;
}

export default function TrackStatusPage() {
  const [signedIn, setSignedIn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TrackResponse | null>(null);

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
        if (!res.ok) throw new Error(json.message || 'Failed to load status.');
        return json as TrackResponse;
      })
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const card = (children: React.ReactNode) => (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <p className="max-w-3xl mx-auto text-gray-400 text-sm mb-4">
        Client view for status
      </p>
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        {children}
      </div>
    </main>
  );

  if (loading) {
    return card(<p className="text-gray-500">Loading your project status…</p>);
  }

  if (!signedIn) {
    return card(
      <div className="text-center py-6">
        <h1 className="text-xl font-bold text-gray-900 mb-2">Sign in to view your project status</h1>
        <p className="text-gray-500 mb-6">You need to be logged in to see updates for your project.</p>
        <Link
          href="/login"
          className="inline-block px-6 py-2.5 rounded-full bg-sky-600 text-white font-semibold hover:bg-sky-700 transition"
        >
          Sign in
        </Link>
      </div>
    );
  }

  if (error) {
    return card(<p className="text-red-600">{error}</p>);
  }

  if (!data?.hasClient) {
    return card(
      <div className="text-center py-6">
        <h1 className="text-xl font-bold text-gray-900 mb-2">No active project yet</h1>
        <p className="text-gray-500">
          Once you're assigned to a project, its status will show up here.
        </p>
      </div>
    );
  }

  const { project, update } = data;

  return card(
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold text-gray-900">Project Status</h1>
        <span
          className={`px-4 py-1 rounded-full border text-sm font-medium ${
            update ? statusBadge[update.status] ?? statusBadge['Not Started'] : statusBadge['Not Started']
          }`}
        >
          {update ? update.status : 'Not Started'}
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
          <span className="text-gray-600">Current Completion</span>
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
              Recent Update:{' '}
              {new Date(update.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        ) : (
          <p className="mt-5 pt-5 border-t border-gray-100 text-sm text-gray-500">
            No updates posted yet.
          </p>
        )}
      </div>

      {/* Notes */}
      {update && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold tracking-wide text-gray-500 mb-3">
            UPDATE NOTES
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
            PROGRESS PHOTOS
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
                  alt="Progress"
                  className="w-full h-full object-cover"
                />
              </a>
            ))}
          </div>
        </>
      )}

      {/* Actions */}
      <Link
        href={`/contact?message=${encodeURIComponent(clarificationMessage(project, update))}`}
        className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sky-600 text-white font-semibold hover:bg-sky-700 transition"
      >
        <MessageSquare size={18} />
        Contact Admin
      </Link>
    </>
  );
}
