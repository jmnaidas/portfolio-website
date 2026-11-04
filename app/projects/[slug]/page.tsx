import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProject, projects } from '@/data/projects';
import { ProjectDetail } from '@/components/projects/project-detail';
import { Navigation, ProjectModal } from '@/components/layout/navigation';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const title = `${project.title} | John Marie Naidas`;
  const url = `/projects/${project.slug}`;
  return { title, description: project.description, alternates: { canonical: url },
    openGraph: { title, description: project.description, url },
    twitter: { title, description: project.description } };
}
export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return <><Navigation homeLinks /><main id="main" className="container project-page">
    <Link className="project-back" href="/#independent">← Back to independent work</Link>
    <ProjectModal key={project.slug} project={project} modal={false}><ProjectDetail project={project} /></ProjectModal>
  </main></>;
}
