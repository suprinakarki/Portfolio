import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { portfolio } from './src/data/portfolio.js';

const escape = (value) => value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const url = env.VITE_SITE_URL ? new URL(env.VITE_SITE_URL).origin + '/' : '';
  const title = escape(`${portfolio.name} | ${portfolio.title}`);
  const description = escape(portfolio.seoDescription);
  return {
    plugins: [react(), tailwindcss(), {
      name: 'portfolio-seo',
      transformIndexHtml(html) {
        return html.replace('<!--portfolio-meta-->', `<title>${title}</title><meta name="description" content="${description}"/><meta property="og:type" content="website"/><meta property="og:title" content="${title}"/><meta property="og:description" content="${description}"/><meta name="twitter:card" content="summary"/><meta name="twitter:title" content="${title}"/><meta name="twitter:description" content="${description}"/>${url ? `<link rel="canonical" href="${escape(url)}"/><meta property="og:url" content="${escape(url)}"/>` : ''}`);
      },
      generateBundle() {
        this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n${url ? `Sitemap: ${url}sitemap.xml\n` : ''}` });
        if (url) this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(url)}</loc></url></urlset>` });
      },
    }],
  };
});
