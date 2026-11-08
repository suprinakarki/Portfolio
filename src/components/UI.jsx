import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';
import { portfolio } from '../data/portfolio';
export function Reveal({ children, className = '' }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.45 }}>{children}</motion.div>;
}
export function SectionHeading({ title, description }) {
  return <div className="section-heading"><h2>{title}</h2>{description && <p className="section-description">{description}</p>}</div>;
}
export function Socials() {
  return <div className="socials"><a href={portfolio.github} target="_blank" rel="noreferrer" aria-label="Suprina on GitHub"><Github size={19}/></a>{portfolio.linkedin ? <a href={portfolio.linkedin} target="_blank" rel="noreferrer" aria-label="Suprina on LinkedIn"><Linkedin size={19}/></a> : <span className="unavailable-social" aria-label="LinkedIn profile not added" title="LinkedIn profile not added"><Linkedin size={19}/><span className="sr-only">LinkedIn coming soon</span></span>}</div>;
}
export function ProjectCard({ project, index }) {
  return (
    <article className="project-card project-image-card">
      <a className={`project-preview preview-${index}`} href={project.repository} target="_blank" rel="noreferrer" aria-label={`View ${project.name} code on GitHub (opens in a new tab)`}>
        {project.image ? <img src={project.image} alt={project.imageAlt || `${project.name} project cover`} loading="lazy" width="1448" height="1086"/> : <span className="project-monogram">{project.monogram}</span>}
        <div className="project-hover-details">
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          {project.verified && project.technologies.length > 0 && <p>{project.technologies.join(' · ')}</p>}
          <span className="project-hover-link">View Code <ArrowUpRight size={17}/></span>
        </div>
      </a>
    </article>
  );
}
