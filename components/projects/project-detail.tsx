import Link from 'next/link';
import { projects, type Project } from '@/data/projects';

export function ProjectDetail({ project, modal = false }: { project: Project; modal?: boolean }) {
  return <article className="project-detail">
    <p className="eyebrow">{project.category}</p>
    <h1 id="project-title">{project.title}</h1>
    <p className="project-tagline">{project.tagline}</p>
    <div className="project-detail-grid">
      <section><h2>Overview</h2><p>{project.overview}</p></section>
      <section><h2>The problem</h2><p>{project.problem}</p></section>
    </div>
    {project.features?.length ? <section className="project-extra"><h2>Implemented features</h2><ul>{project.features.map(item => <li key={item}>{item}</li>)}</ul></section> : null}
    {project.technologies?.length ? <section className="project-extra"><h2>Technology</h2><div className="tags">{project.technologies.map(item => <span key={item}>{item}</span>)}</div></section> : null}
    {project.architecture?.length ? <section className="project-extra"><h2>Architecture</h2><ul>{project.architecture.map(item => <li key={item}>{item}</li>)}</ul></section> : null}
    <section className="project-development"><h2><span className="status-dot" />{project.status}</h2><p>{project.statusDetail}</p></section>
    {project.liveUrl && <a className="button primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Visit application <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>}
    <nav className="project-related" aria-label="Other independent projects"><span>Continue exploring</span>
      {projects.filter(item => item.slug !== project.slug).map(item =>
        <Link key={item.slug} href={`/projects/${item.slug}`} replace={modal} scroll={!modal}>{item.title} <span aria-hidden="true">↗</span></Link>
      )}
    </nav>
  </article>;
}
