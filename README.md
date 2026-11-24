# LDIT Connect

An independent copy of the T522 team networking prototype, exported from Alejandra's Lovable project on November 24, 2026, with Tripti's Find Your Alum activity added.

This repository is not connected to the original Lovable project. Changes here do not update the team's published site. The original First Hello game, playbook, and other platform sections are retained.

## Public team demo

Open https://triptikhetan-max.github.io/harvard-ldit-connect/ . This public GitHub Pages demo uses fictional alumni only and needs no access code. The repository is public at https://github.com/triptikhetan-max/harvard-ldit-connect .

Pushes to `main` run tests, type checking, and a static build through `.github/workflows/pages.yml`, then publish only `.output/public`. The server bundle, private alumni snapshot, and credentials are not deployed to Pages. Build locally with `GITHUB_PAGES=true bun run build`; the base path is `/harvard-ldit-connect/`, including images and Find Your Alum's embedded activity. Filtered query URLs are handled in the browser and excluded from prerendering so they cannot overwrite the default directory page.

## Run locally

Requires Node.js 22.12+ and Bun.

```sh
cd /Users/tripti/Projects/harvard-ldit-connect
bun install --frozen-lockfile
bun run dev --host 127.0.0.1 --port 5178
```

Open http://127.0.0.1:5178/find-your-alum. The activity supports role selection, links to Harvard/LinkedIn search, a personalized message draft, copying, and browser-local progress. It does not send messages automatically. External directory access requires the user's own account.

## Checks

```sh
cd /Users/tripti/Projects/harvard-ldit-connect
bun run test
bun x tsc --noEmit
bun run build
```

## Shared project demo

The public directory shows fictional profiles only. Code-entry, personal imports, and the shared real-alumni panel are hidden from the public demo. Find Your Alum and First Hello remain available. Navigation groups Jobs, Events, and Pathways under Explore; guides, First Hello, and Resources under Prepare.

The previously configured real-alumni API remains protected in private R2 storage; requests still require the viewing secret. It is not HarvardKey identity verification. The collected snapshot is not bundled into public assets or Git.

Required runtime secrets: `DEMO_ACCESS_TOKEN` for viewing and a separate `DEMO_ADMIN_TOKEN` for importing. Configure them through Sites environment variables, never source files. The owner uses `/demo-data` to load a validated snapshot. The viewing code cannot replace it. R2 binding `BUCKET` is declared in `.openai/hosting.json`.

Build the app normally, then run `node scripts/package-sites.ts` before using the Sites source/version/deploy workflow. The packaging wrapper handles the protected demo endpoints ahead of Nitro. Rotating the viewing token revokes access on the next request.

## Demo data and configuration

The Alumni Directory page supports a personal saved-file import. Imported names, degree details, professional headlines, and official profile links stay in the visitor's browser storage; files are not uploaded. The list is a dated snapshot, not an authenticated Harvard API connection or automatic refresh. Real directory exports must stay outside this repository and must never be bundled into a public deployment.

Public app: https://ldit-connect-tripti.trilogy-1207.chatgpt.site

The platform uses fictional demo profiles and opportunities. Its linked-account/import features are prototypes. No production database or real directory integration has been configured for this copy. Local service configuration in `.env` is excluded from Git; do not upload credentials. A future deployment needs its own configuration and verification.

The original Harvard photo attribution is retained on the home page. Original image assets are bundled under `public/images/` for portability. Find Your Alum's authored HTML is retained in `public/activities/find-your-alum.html`.

## Stack

TanStack Start, React, TypeScript, Tailwind CSS, and Vitest.
