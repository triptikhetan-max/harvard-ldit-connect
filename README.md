# LDIT Connect

An independent copy of the T522 team networking prototype, exported from Alejandra's Lovable project on November 24, 2026, with Tripti's Find Your Alum activity added.

This repository is not connected to the original Lovable project. Changes here do not update the team's published site. The original First Hello game, playbook, and other platform sections are retained.

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

## Demo data and configuration

The platform uses fictional demo profiles and opportunities. Its linked-account/import features are prototypes. No production database or real directory integration has been configured for this copy. Local service configuration in `.env` is excluded from Git; do not upload credentials. A future deployment needs its own configuration and verification.

The original Harvard photo attribution is retained on the home page. Original image assets are bundled under `public/images/` for portability. Find Your Alum's authored HTML is retained in `public/find-your-alum.html`.

## Stack

TanStack Start, React, TypeScript, Tailwind CSS, and Vitest.
