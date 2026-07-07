# yazan.work

Personal site for Yazan Aesmael — [yazan.work](https://yazan.work).
Built with [Astro](https://astro.build), deployed to GitHub Pages.

Single scrolling page with a **Concise ⇄ Deep dive** toggle: concise is the
recruiter-skim view; deep dive expands the full case studies inline. All content
lives in the DOM in both modes (so it stays fully indexable), and the deep view is
shareable — `yazan.work/?view=deep`.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Deploy

Push to `main`. GitHub Actions builds and publishes to Pages automatically
(`.github/workflows/deploy.yml`). The custom domain lives in `public/CNAME`.

## How to update

Everything is content-as-data — you edit small files, not page markup.

| To change… | Edit |
| --- | --- |
| Name, tagline, bio, links, "open to work" banner, location toggle | `src/data/site.ts` |
| A project (adds/updates the card **and** its case study) | `src/content/projects/<name>.md` |
| Work history + education | `src/data/experience.ts` |
| Skills | `src/data/skills.ts` |
| Open-source cards | `src/data/oss.ts` |
| Colors, fonts, spacing (whole-site restyle) | `src/styles/tokens.css` |

### Add a project

Copy any file in `src/content/projects/`, then edit its frontmatter and body:

- **Frontmatter** drives the concise card (name, tagline, summary, status, stack,
  metrics, links, highlights).
- **The Markdown body** is the full case study, shown only in Deep dive.
- `tier` controls order (1 = top). `statusKind` is one of
  `live` · `development` · `open-source` · `private`.

Concise and deep for a project live in the **same file**, so they never drift.

### Show / hide location

`src/data/site.ts` → `location.show: true | false`.

## Structure

```
src/
  content/projects/   # one .md per featured project (card + case study)
  data/               # site, experience, skills, oss  (edit these)
  components/          # Hero, ProjectCard, ViewToggle, sections…
  layouts/Base.astro  # <head>, SEO, fonts, view-toggle bootstrap
  styles/tokens.css   # design tokens + concise/deep CSS
  pages/index.astro   # assembles the page
public/               # CNAME, favicon
```
