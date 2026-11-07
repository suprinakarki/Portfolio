import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const links = ['Home', 'About', 'Skills', 'Projects', 'Education', 'Contact'];
export default function Navbar() {
  const [theme, toggleTheme] = useTheme();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const menuButton = useRef(null);
  useEffect(() => {
    const update = () => { let current = 'home'; for (const label of links) { const el = document.getElementById(label.toLowerCase()); if (el && el.getBoundingClientRect().top <= 160) current = el.id; } if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20) current = 'contact'; setActive(current); };
    window.addEventListener('scroll', update, { passive: true }); update();
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    const close = (e) => { if (e.key === 'Escape') { setOpen(false); menuButton.current?.focus(); } };
    const resize = () => { if (window.innerWidth >= 900) setOpen(false); };
    document.addEventListener('keydown', close); window.addEventListener('resize', resize);
    return () => { document.removeEventListener('keydown', close); window.removeEventListener('resize', resize); };
  }, []);
  const items = links.map(label => <a key={label} href={`#${label.toLowerCase()}`} aria-current={active === label.toLowerCase() ? 'location' : undefined} onClick={() => { setOpen(false); document.getElementById(label.toLowerCase())?.focus({ preventScroll: true }); }}>{label}</a>);
  return <header className="site-header"><nav className="container nav" aria-label="Main navigation"><div className="desktop-nav">{items}</div><div className="nav-actions"><button className="icon-button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>{theme === 'dark' ? <Sun size={19}/> : <Moon size={19}/>}</button><button ref={menuButton} className="icon-button menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close navigation' : 'Open navigation'}>{open ? <X/> : <Menu/>}</button></div></nav><AnimatePresence>{open && <motion.nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.18 }}>{items}</motion.nav>}</AnimatePresence></header>;
}
