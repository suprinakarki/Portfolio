import AboutDetails from '../components/AboutDetails';
import { Code2, PanelsTopLeft, Server, Database, Terminal, ArrowUpRight, GraduationCap } from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { Reveal, SectionHeading, ProjectCard } from '../components/UI';
const icons = { code: Code2, layout: PanelsTopLeft, server: Server, database: Database, terminal: Terminal };
export function About() {
  return <section id="about" tabIndex={-1} className="section container about-grid reference-about"><Reveal className="about-portrait"><div className="about-photo-frame">{portfolio.profileImage ? <img className="about-photo" src={portfolio.profileImage} alt={portfolio.name} width="480" height="600" loading="lazy"/> : <div className="about-monogram">{portfolio.initials}</div>}</div></Reveal><Reveal className="about-copy"><SectionHeading title="About Me"/><p className="about-biography">Hey there,<br/>{portfolio.about.join(' ')}</p><AboutDetails/></Reveal></section>;
}
export function Skills() {
  const services = [
    { icon: Code2, title: 'Full Stack Web Development', description: 'Exploring how front-end and back-end technologies work together to build useful web experiences.' },
    { icon: PanelsTopLeft, title: 'Front-End Development', description: 'Building responsive interfaces and learning modern UI development with React and Next.js.' },
    { icon: Server, title: 'Programming & Problem Solving', description: 'Developing programming skills with JavaScript, PHP, and C# through study and projects.' },
  ];
  return <section id="skills" tabIndex={-1} className="section tinted"><div className="container services-section"><Reveal><SectionHeading title="My Services"/></Reveal><div className="services-grid">{services.map(({ icon: Icon, title, description }) => <Reveal key={title} className="service-card"><Icon size={32}/><h3>{title}</h3><p>{description}</p></Reveal>)}</div></div></section>;
}
export function Projects() {
  return <section id="projects" tabIndex={-1} className="section container"><Reveal className="heading-row"><SectionHeading title="My Main Projects" description="Selected projects from my learning journey."/></Reveal><div className="projects-grid">{portfolio.projects.map((project, index) => <Reveal key={project.name}><ProjectCard project={project} index={index}/></Reveal>)}</div></section>;
}
export function Education() {
  const e = portfolio.education;
  return <section id="education" tabIndex={-1} className="section container education-grid"><Reveal><SectionHeading number="04" eyebrow="THE FOUNDATION" title="My Education"/></Reveal><Reveal className="education-card"><div className="education-top"><span className="education-icon"><GraduationCap size={25}/></span><span className="tag">{e.start} — {e.end || 'Present'}</span></div><h3>{e.degree} <span>({e.abbreviation})</span></h3><p className="college">{e.college}</p><p className="university">{e.university}</p><div className="education-rule"/><p>{e.description}</p></Reveal></section>;
}
