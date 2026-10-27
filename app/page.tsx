import HomeView from '@/components/views/HomeView';
import { getHeroImages, getServices } from '@/lib/content';
import { getLang } from '@/lib/i18n-server';

export default async function Home() {
  const lang = await getLang();
  const [services, heroImages] = await Promise.all([getServices(lang), getHeroImages()]);

  return <HomeView services={services} heroImages={heroImages} />;
}
