/**
 * Site-wide identity, positioning, links, and copy.
 * This is the one file to edit for name, tagline, bio, contact, and the
 * "open to work" banner. Projects live in src/content/projects/.
 */

export const site = {
  name: 'Yazan Aesmael',
  title: 'Lead Android & Kotlin Multiplatform Engineer',

  // Hero
  hero: {
    // Kept honest and precise (see brief): 4 years total, 3 in senior/lead.
    kicker: 'Lead Android & Kotlin Multiplatform Engineer',
    headline: 'I build production mobile apps — and ship my own, end to end.',
    sub: '4 years building Android in Kotlin and Compose, senior/lead for the last 3. I lead frontend for a live app with 100,000+ users, and on my own time I ship indie products across the full stack a modern app needs.',
  },

  // "Open to work" signal — you're actively job-hunting. Set open:false to hide.
  availability: {
    open: true,
    text: 'Open to Lead / Senior Android & KMP roles',
  },

  // Location is optional on a work site. Off by default (privacy). Flip to show.
  location: {
    show: false,
    text: 'India · open to remote',
  },

  // Short bio — concise view.
  bioShort:
    "I'm a Lead Android / Kotlin Multiplatform engineer with 4 years building production mobile apps in Kotlin and Compose, 3 of them in senior/lead roles. I lead frontend (Android & iOS) on a live app with 100,000+ users, and on my own time I ship indie products — including Attesta, live on the App Store. I care about the craft underneath the surface: clean architecture, real performance, and things that actually work.",

  // Long bio — deep view.
  bioLong: [
    "I'm a Lead Android and Kotlin Multiplatform engineer. Over the last 4 years I've shipped production mobile software — three of them in senior and lead roles — and built my own apps in every spare hour.",
    "At work I lead the frontend for both Android and iOS on a live product with over 100,000 users, and I'm driving its migration from native Android to Kotlin Multiplatform and Compose Multiplatform. Off the clock, I'm a serial builder: I ship indie apps end to end, from architecture and UI down to the backend, security, and release pipeline. Attesta, an AI voice recorder I built solo, is live on the App Store.",
    "I work across the whole stack a modern mobile app needs — Compose UI, multiplatform shared cores, backends in Ktor and Supabase, CI/CD, and the low-level performance and security work most people skip. I also have a genuine offensive-security background, which shapes how I build things to be hard to break.",
    'Mostly, I build because I like making things people use.',
  ],

  links: {
    email: 'yazanaesmael@gmail.com',
    github: 'https://github.com/YazanAesmael',
    linkedin: 'https://www.linkedin.com/in/yazan-aesmael',
  },

  // SEO
  seo: {
    title: 'Yazan Aesmael — Lead Android & Kotlin Multiplatform Engineer',
    description:
      'Lead Android & Kotlin Multiplatform engineer. I lead frontend for a live app with 100,000+ users and ship indie apps end to end — Compose Multiplatform, real-time systems, backends, and security.',
  },
} as const;
