import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.jsselitegroupindia.com',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  vite: { plugins: [tailwindcss()] },
});
