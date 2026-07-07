import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * PROJECTS collection.
 *
 * One Markdown file per featured project in `src/content/projects/`.
 * Frontmatter drives the concise card + concise view.
 * The Markdown body is the full case study, shown only in "deep dive" view.
 * => concise + deep live in ONE file, so an edit updates both. No drift.
 *
 * To add a project: copy an existing file, edit the frontmatter + body,
 * and set `tier` for ordering. That's the whole workflow.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    // Concise one/two-liner shown on the card in both views.
    summary: z.string(),
    role: z.string(),
    // Short status label, e.g. "Live · iOS App Store"
    status: z.string(),
    // Drives the status dot color + label styling.
    statusKind: z.enum(['live', 'development', 'open-source', 'private']),
    year: z.string(),
    platforms: z.array(z.string()).default([]),
    // Lower tier = higher on the page. 1 = flagship.
    tier: z.number().default(99),
    featured: z.boolean().default(true),
    // Public, allowed links only. Never add a private/NDA link here.
    links: z
      .array(z.object({ label: z.string(), url: z.string().url() }))
      .default([]),
    // Concise stack chips for the card.
    stack: z.array(z.string()).default([]),
    // Honest, concise metrics. NO fabricated traction — engineering facts only.
    metrics: z.array(z.string()).default([]),
    // Deep-view bullet highlights (the case study body carries the prose).
    highlights: z.array(z.string()).default([]),
  }),
});

export const collections = { projects };
