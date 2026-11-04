import { notFound } from 'next/navigation';
import { getProject } from '@/data/projects';
import { ProjectDetail } from '@/components/projects/project-detail';
import { ProjectModal } from '@/components/layout/navigation';

export default async function ProjectModalPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return <ProjectModal key={project.slug} project={project}><ProjectDetail project={project} modal /></ProjectModal>;
}
