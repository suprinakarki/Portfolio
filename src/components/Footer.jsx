import { ArrowUp } from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { Socials } from './UI';
export default function Footer() { return <footer className="container footer"><a className="logo" href="#home">{portfolio.shortName}<span>.</span></a><p>© {new Date().getFullYear()} {portfolio.name}. All rights reserved.</p><div className="footer-actions"><Socials/><a className="back-top" href="#home" aria-label="Back to top"><ArrowUp size={18}/></a></div></footer>; }
