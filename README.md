# As-Built Company website

Marketing site for As-Built Company, built with [Astro](https://astro.build/) and deployed on Cloudflare Pages / Workers.

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:4321/

## Build

```bash
npm run build
```

Outputs the static site to `dist/`.

## Deploy

Pushes to the `main` branch on GitHub auto-deploy to Cloudflare. No manual build/upload required.

## Editing content

- **Quick text edits**: use Pages CMS at https://app.pagescms.org/ (configured via `.pages.yml`).
- **Larger changes**: edit `.astro` files in `src/pages/` directly.
- **Site-wide style**: `src/styles/global.css`.
- **Layout / header / footer**: `src/layouts/BaseLayout.astro`.

## Contact form

The contact form posts to [Web3Forms](https://web3forms.com/). Replace `YOUR_WEB3FORMS_ACCESS_KEY` in `src/pages/contact.astro` with your real access key after signup.
