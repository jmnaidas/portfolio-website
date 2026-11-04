import Link from 'next/link';
import { projects, type Project } from '@/data/projects';
import { ProjectActions } from './project-modal';

export function ProjectDetail({ project, modal = false }: { project: Project; modal?: boolean }) {
  return <article className="project-detail">
    <p className="eyebrow">{project.category}</p>
    <h1 id="project-title">{project.title}</h1>
    <p className="project-tagline">{project.tagline}</p>
    <div className="project-detail-grid">
      <section><h2>Overview</h2><p>{project.overview}</p></section>
      <section><h2>The problem</h2><p>{project.problem}</p></section>
    </div>
    <section className="project-development"><h2><span className="status-dot" />{project.status}</h2><p>{project.statusDetail}</p></section>
    <ProjectActions project={project} />
    <section className="project-extra"><p className="eyebrow">01 / ENGINEERING</p><h2>Technology stack</h2>
      <div className="project-stack">{project.technologyGroups.map(group => <div key={group.label}><h3>{group.label}</h3><div className="tags">{group.items.map(item => <span key={item}>{item}</span>)}</div></div>)}</div>
    </section>
    <section className="project-extra"><h2>Architecture decisions</h2><dl className="project-architecture">{project.architecture.map(item => <div key={item.title}><dt>{item.title}</dt><dd>{item.detail}</dd></div>)}</dl></section>
    <section className="project-extra"><p className="eyebrow">02 / PRODUCT CAPABILITIES</p><h2>Implemented features</h2><p className="project-note">Local implementation is distinct from public availability.</p>
      <ul className="project-features">{project.features.map(item => <li key={item.title}><div><h3>{item.title}</h3><span className="project-state">{item.state}</span></div><p>{item.detail}</p></li>)}</ul>
    </section>
    <section className="project-extra"><p className="eyebrow">03 / DEVELOPMENT JOURNEY</p><h2>{project.milestone.name}</h2><span className="project-state">{project.milestone.state} · local milestone</span><p>{project.milestone.detail}</p><p className="project-caveat">{project.milestone.limitation}</p>
      <h3 className="project-roadmap-title">Roadmap</h3><ol className="project-roadmap">{project.roadmap.map(item => <li key={item.title}><span className="project-state">{item.state}</span><h3>{item.title}</h3><p>{item.detail}</p></li>)}</ol>
    </section>
    <section className="project-extra"><h2>Engineering contribution</h2><p>{project.ownership}</p></section>
    <nav className="project-related" aria-label="Other independent projects"><span>Continue exploring</span>
      {projects.filter(item => item.slug !== project.slug).map(item =>
        <Link key={item.slug} href={`/projects/${item.slug}`} replace={modal} scroll={!modal}>{item.title} <span aria-hidden="true">↗</span></Link>
      )}
    </nav>
  </article>;
}
