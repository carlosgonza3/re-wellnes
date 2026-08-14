# RE Wellness & Recovery

Responsive React landing page for RE Wellness & Recovery.

## Local development

The production and Netlify builds use Node.js 22, pinned in `.nvmrc`.

```bash
nvm use
npm ci
npm start
```

## Release checks

Run the same verification command Netlify uses:

```bash
npm run verify
```

This runs the non-interactive test suite and creates the optimized production
bundle in `build/`.

## Netlify deployment

The repository-level `netlify.toml` is the source of truth:

- Build command: `npm run verify`
- Publish directory: `build`
- Node.js: 22 (from `.nvmrc`)
- Production security and cache headers: configured in `netlify.toml`

For the full launch, DNS, HTTPS, and rollback checklist, see
[docs/NETLIFY_RELEASE.md](docs/NETLIFY_RELEASE.md).

## GitHub Pages preview

The workflow in `.github/workflows/deploy-pages.yml` remains available as a
preview deployment. Its repository-specific `PUBLIC_URL` is scoped to that
workflow and does not affect the root-based Netlify build.
