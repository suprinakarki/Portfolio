import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';
import { portfolio } from '../data/portfolio';
export function Reveal({ children, className = '' }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.45 }}>{children}</motion.div>;
}
export function SectionHeading({ number, eyebrow, title, description }) {
  return <div className="section-heading"><p className="eyebrow"><span>{number} /</span> {eyebrow}</p><h2>{title}</h2>{description && <p className="section-description">{description}</p>}</div>;
}
export function Socials() {
  return <div className="socials"><a href={portfolio.github} target="_blank" rel="noreferrer" aria-label="Suprina on GitHub"><Github size={19}/></a>{portfolio.linkedin ? <a href={portfolio.linkedin} target="_blank" rel="noreferrer" aria-label="Suprina on LinkedIn"><Linkedin size={19}/></a> : <span className="unavailable-social" aria-label="LinkedIn profile not added" title="LinkedIn profile not added"><Linkedin size={19}/><span className="sr-only">LinkedIn coming soon</span></span>}</div>;
}
export function ProjectCard({ project, index }) {
  return <motion.article className="project-card" whileHover={{ y: -4 }} transition={{ duration: 0.2 }}><div className={`project-preview preview-${index}`}>
    {project.image ? <img src={project.image} alt={project.imageAlt || `${project.name} screenshot`} loading="lazy" width="640" height="400"/> : <><div className="preview-top"><span>{String(index + 1).padStart(2, '0')} / SELECTED PROJECT</span><ArrowUpRight size={18}/></div><span className="project-monogram">{project.monogram}<span>.</span></span><span className="preview-caption">PROJECT PREVIEW COMING SOON</span></>}
    </div><div className="project-content"><div className="project-title"><h3>{project.name}</h3><span className="tag">{project.verified ? 'Project' : 'Details pending'}</span></div><p>{project.description}</p>{project.technologies.length > 0 && <div className="tags">{project.technologies.map(t => <span className="tag" key={t}>{t}</span>)}</div>}<div className="project-links"><a href={project.repository} target="_blank" rel="noreferrer"><Github size={17}/> View repository <ArrowUpRight size={16}/></a>{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={16}/></a>}</div>{!project.verified && <small>Repository access is currently unverified.</small>}</div></motion.article>;
}
