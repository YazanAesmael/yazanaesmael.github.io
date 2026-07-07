// @ts-check
import { defineConfig } from 'astro/config';

// yazan.work — served from the yazanaesmael.github.io repo via GitHub Actions,
// with a custom apex domain. User/apex site => no `base` path needed.
export default defineConfig({
  site: 'https://yazan.work',
  trailingSlash: 'ignore',
  build: {
    // Emit /about.html rather than /about/index.html — cleaner for a small site.
    format: 'file',
  },
  devToolbar: { enabled: false },
});
