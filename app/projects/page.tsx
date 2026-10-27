import ProjectsView from '@/components/views/ProjectsView';
import { getPortfolioProjects } from '@/lib/content';
import { getLang } from '@/lib/i18n-server';

export default async function ProjectsPage() {
  const projects = await getPortfolioProjects(await getLang());

  return <ProjectsView properties={projects} />;
}
