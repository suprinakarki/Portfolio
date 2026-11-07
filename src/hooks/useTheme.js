import { useEffect, useState } from 'react';
export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#111118' : '#FAFAFC';
  }, [theme]);
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = () => { try { if (!localStorage.getItem('portfolio-theme')) setTheme(media.matches ? 'dark' : 'light'); } catch { setTheme(media.matches ? 'dark' : 'light'); } };
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);
  return [theme, () => setTheme((current) => { const next = current === 'light' ? 'dark' : 'light'; try { localStorage.setItem('portfolio-theme', next); } catch { /* Storage may be disabled. */ } return next; })];
}
