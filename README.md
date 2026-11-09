# Suprina Karki — Portfolio

A responsive React + Vite portfolio with Tailwind CSS v4 theme tokens, Motion, Lucide icons, React Hook Form, and optional EmailJS delivery. Built for local development and static hosting. Node 22.12+ or Node 24 recommended.

The main page follows the supplied screenshot's bold introduction, red accent, stationary background dots, and photo beside About Me. Both light and dark themes remain available. `src/styles/index.css` contains base styles, `refinements.css` contains the enhanced cards and typography, and `reference.css` contains the screenshot-inspired composition and accent overrides. The supplied portrait is available at `public/images/suprina-karki.jpeg`.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To validate and build:

```sh
npm run lint
npm run build
npm run preview
```

Run `npm test` for the Chrome browser checks (Google Chrome must be installed). Run these against an environment without EmailJS credentials. They cover both themes at 320, 375, 768, 1024, and 1440 pixels, theme persistence, keyboard/mobile navigation, runtime errors, and form validation with unconfigured delivery. Live email delivery and Lighthouse scores are not verified by these checks.

The package override selects patched `minimatch` 11.0.1+ for the ESLint toolchain. Keep it until upstream ESLint dependencies incorporate the fix, and rerun lint when changing it.

Commit `package-lock.json` and use `npm ci` for repeatable deployments.

## Update content

Edit `src/data/portfolio.js`. It holds personal details, social links, biography, education, skills, and projects. Unknown email, LinkedIn, resume, and photo values are `null`; the UI shows explicit availability labels. Do not enter invented contact details. Each skill group separates `confirmed` from `unconfirmed`: only confirmed skills render. Move a skill into `confirmed` after confirming it. Groups without confirmed skills are hidden.

Both supplied project paths returned GitHub 404 responses on November 7, 2026. Descriptions and previews are explicitly placeholders, with no unsupported technology tags or live demos. Verify repository content before replacing descriptions, adding tags, or setting `verified: true`. `verificationNote` preserves the check context. A supplied repository link is retained even when access is unverified.

## Project screenshots

Create `public/images/`, add optimized WebP or AVIF files, then set each project's `image` to `/images/filename.webp` and provide meaningful `imageAlt`. Use approximately 1280 × 800 images. Noncritical screenshots are lazy-loaded. Replace placeholder descriptions only with confirmed project facts; add `liveUrl` only for a verified working deployment.

## Profile photo

Add a portrait to `public/images/` and set `profileImage` to its root-relative path. A portrait near 480 × 560 works well. Until supplied, the site uses a styled SK monogram, without requesting a missing image.

## Resume

Create `public/resume/`, place the real resume PDF there, and set `resume: '/resume/suprina-karki-resume.pdf'`. The resume download appears automatically. No fabricated PDF is included; until configured, visitors see “Resume coming soon.”

## Email delivery

Copy `.env.example` to `.env.local`. Create an EmailJS service and an email template, then configure `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY`. The template receives `{{from_name}}`, `{{from_email}}`, `{{reply_to}}`, and `{{message}}`. Use `New Portfolio Message from {{from_name}}` as the subject and `{{from_email}}` for the sender email in the message body. Set the recipient in the EmailJS dashboard and Reply-To to `{{reply_to}}`. Restrict allowed website origins in EmailJS and configure provider-side abuse protection and quotas. Restart Vite after changing environment variables.

The EmailJS public browser key is intended to be visible. **All `VITE_` values are included in client code; never put private keys, passwords, or access tokens there.** The form includes validation, a honeypot, a client rate limit, loading feedback, and success/error announcements. The honeypot and client limit are basic deterrents, not server-enforced protection. Without settings, the form explicitly reports that delivery is unavailable and never reports success. Real delivery requires an actual EmailJS account and should be verified with a test message before launch.

## Themes and accessibility

Theme preference is initialized before React paints, follows system preference until explicitly selected, and persists in local storage when available. The interface supports reduced motion, skip navigation, keyboard focus, active sections, labeled fields, announced form feedback, and Escape-to-close mobile navigation.

## SEO

Set `VITE_SITE_URL` to the final public origin, e.g. `https://your-actual-domain.com`, before building. The Vite plugin generates static metadata from the centralized content, plus the canonical URL, Open Graph URL, `robots.txt`, and `sitemap.xml`. Without a real domain, canonical and sitemap are intentionally omitted. No fake domain is published. Sharing uses text summary metadata; add a real social preview image when available. Theme tokens and responsive rules live in `src/styles/index.css`; Tailwind v4 uses its CSS `@theme` configuration.

## Deploy

**Vercel:** import this repository, select Vite, use `npm run build` and output directory `dist`. Add environment values in project settings before deploying. No backend is required.

**Netlify:** import this repository, use `npm run build` and publish directory `dist`. Add environment values in site configuration and rebuild. `netlify.toml` includes the build defaults. This is a single page with anchor navigation, so no SPA route rewrites are needed.

Verify the final domain, social links, real resume, portrait, screenshots, repository access, and email delivery before publishing this as a completed professional profile. Production builds can run with placeholders, but contact delivery stays unavailable until configured.
