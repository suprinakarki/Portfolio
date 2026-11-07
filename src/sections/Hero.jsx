import { ArrowDown, ArrowUpRight, Download, MapPin } from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { Reveal, Socials } from '../components/UI';

export default function Hero() {
  const [firstName, ...lastName] = portfolio.name.split(' ');
  const city = portfolio.location.split(',')[0];
  return (
    <section id="home" tabIndex={-1} className="container hero reference-hero">
      <Reveal className="hero-copy">
        <p className="hero-title">{portfolio.title}</p>
        <h1>Hi, I’m <span className="hero-name">{firstName}</span>{' '}<br />{lastName.join(' ')} from {city}<span className="hero-dot">.</span></h1>
        <p className="hero-description">{portfolio.intro}</p>
        <div className="hero-buttons">
          <a className="button primary" href="#projects">View My Work <ArrowUpRight size={18} /></a>
          {portfolio.resume ? <a className="button secondary" href={portfolio.resume} download><Download size={17} /> Download Resume</a> : <span className="resume-placeholder"><Download size={16} /> Resume coming soon</span>}
        </div>
        <div className="hero-meta"><Socials /><span className="meta-divider" /><span><MapPin size={15} />{portfolio.location}</span></div>
      </Reveal>
      <a href="#about" className="reference-scroll" aria-label="Scroll to About Me"><ArrowDown size={20} /></a>
    </section>
  );
}
