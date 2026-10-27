import { prisma } from './prisma';
import type { Lang } from './i18n';

// Website content (projects, services, home slider) is managed from the admin
// dashboard and stored in the shared database. See the admin app's
// app/content page.

const ADMIN_ORIGIN = process.env.NEXT_PUBLIC_ADMIN_ORIGIN || '';

// "/images/..." ships with this app; "/uploads/..." was uploaded through the
// admin dashboard and is served by the admin app.
export function assetUrl(src: string) {
  return src.startsWith('/uploads/') ? `${ADMIN_ORIGIN}${src}` : src;
}

// Thai falls back to English when an admin hasn't filled in the Thai field.
const pick = (lang: Lang, en: string, th: string) => (lang === 'th' && th ? th : en);

const order = [{ sortOrder: 'asc' as const }, { id: 'asc' as const }];

export type PortfolioItem = {
  id: number;
  name: string;
  location: string;
  type: string;
  description: string;
  coverImage: string;
  gallery: string[];
};

export type ServiceItem = {
  id: number;
  name: string;
  description: string;
  coverImage: string;
  gallery: string[];
};

function toPortfolioItem(lang: Lang, p: Awaited<ReturnType<typeof prisma.portfolioProject.findFirstOrThrow>>): PortfolioItem {
  return {
    id: p.id,
    name: pick(lang, p.nameEn, p.nameTh),
    location: pick(lang, p.locationEn, p.locationTh),
    type: p.type,
    description: pick(lang, p.descriptionEn, p.descriptionTh),
    coverImage: assetUrl(p.coverImage),
    gallery: p.gallery.map(assetUrl),
  };
}

function toServiceItem(lang: Lang, s: Awaited<ReturnType<typeof prisma.service.findFirstOrThrow>>): ServiceItem {
  return {
    id: s.id,
    name: pick(lang, s.nameEn, s.nameTh),
    description: pick(lang, s.descriptionEn, s.descriptionTh),
    coverImage: assetUrl(s.coverImage),
    gallery: s.gallery.map(assetUrl),
  };
}

export async function getPortfolioProjects(lang: Lang) {
  const rows = await prisma.portfolioProject.findMany({ orderBy: order });
  return rows.map((p) => toPortfolioItem(lang, p));
}

export async function getPortfolioProject(lang: Lang, id: number) {
  if (!Number.isInteger(id)) return null;
  const row = await prisma.portfolioProject.findUnique({ where: { id } });
  return row ? toPortfolioItem(lang, row) : null;
}

export async function getServices(lang: Lang) {
  const rows = await prisma.service.findMany({ orderBy: order });
  return rows.map((s) => toServiceItem(lang, s));
}

export async function getService(lang: Lang, id: number) {
  if (!Number.isInteger(id)) return null;
  const row = await prisma.service.findUnique({ where: { id } });
  return row ? toServiceItem(lang, row) : null;
}

export async function getHeroImages() {
  const rows = await prisma.heroSlide.findMany({ orderBy: order });
  return rows.map((s) => assetUrl(s.image));
}
