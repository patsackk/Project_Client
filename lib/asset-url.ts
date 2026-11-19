const ADMIN_ORIGIN = process.env.NEXT_PUBLIC_ADMIN_ORIGIN || '';

// Images uploaded through the admin app are either full Vercel Blob URLs
// (used as they are) or, from local dev, "/uploads/..." paths served by the
// admin app. "/images/..." ships with this app.
export function assetUrl(src: string) {
  return src.startsWith('/uploads/') ? `${ADMIN_ORIGIN}${src}` : src;
}
