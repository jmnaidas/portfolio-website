import Link from 'next/link';
import { projects } from '@/data/projects';
import { Reveal } from '@/components/ui/reveal';

export function IndependentWork() {
  return <section id="independent" className="independent container">
    <Reveal><div className="section-heading">
      <div><p className="eyebrow">05 / INDEPENDENT WORK</p><h2>Ideas into<br /><span className="muted">working products.</span></h2></div>
      <p>Independent applications, built around everyday needs and continually refined.</p>
    </div></Reveal>
    <div className="project-grid">{projects.map((project, index) =>
      <Reveal key={project.slug} delay={index * 0.06}>
        <Link id={`project-${project.slug}`} className="project-card" href={`/projects/${project.slug}`} scroll={false}>
          <span className="project-index" aria-hidden="true">0{index + 1} /</span>
          <span className="project-category">{project.category}</span>
          <h3>{project.title}</h3><p>{project.description}</p>
          <span className="project-status"><span className="status-dot" />{project.status}</span>
          <span className="project-card-action">Explore project <span aria-hidden="true">↗</span></span>
        </Link>
      </Reveal>
    )}</div>
  </section>;
}
