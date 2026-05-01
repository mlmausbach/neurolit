# Deploying Neurolit to Cloudflare Pages

## Prerequisites

- A [Cloudflare account](https://dash.cloudflare.com/sign-up)
- This repository pushed to a GitHub account
- The API server deployed separately (e.g., a Node.js host or Cloudflare Workers)

---

## Step 1 — Connect GitHub to Cloudflare Pages

1. Go to [Cloudflare Pages dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Authorize Cloudflare to access your GitHub account and select this repository.
3. Click **Begin setup**.

---

## Step 2 — Configure build settings

| Setting | Value |
|---|---|
| **Framework preset** | None |
| **Build command** | `pnpm --filter @workspace/neurolit build` |
| **Build output directory** | `artifacts/neurolit/dist` |
| **Root directory** | *(leave blank — monorepo root)* |
| **Node.js version** | 20 (set under **Environment variables** or via `.nvmrc`) |

### Environment variables

Add these under **Settings → Environment variables** for the Production environment:

| Variable | Value | Required |
|---|---|---|
| `VITE_API_URL` | Base URL of your deployed API server, e.g. `https://api.neurolit.com` | Yes (if using the API) |
| `NODE_VERSION` | `20` | Recommended |

> **Local dev note:** When `VITE_API_URL` is not set, the frontend falls back to relative `/api/...` paths, which work when the dev server is running alongside the API server (Replit environment).

---

## Step 3 — Deploy

Click **Save and Deploy**. Cloudflare Pages will:

1. Clone the repository
2. Run `pnpm install` (detected automatically via `pnpm-lock.yaml`)
3. Run `pnpm --filter @workspace/neurolit build`
4. Serve the `artifacts/neurolit/dist` folder as a static site

All client-side routes (e.g. `/entrar`, `/admin`) are handled by the `_redirects` rule already included in the build output, so deep links and page refreshes will work correctly.

---

## API server

The Neurolit frontend connects to a Node.js API server for form submissions (`/api/candidatura`) and the admin panel (`/api/candidaturas`). This server is **not** deployed as part of the Cloudflare Pages static build.

Deploy the API server separately and set `VITE_API_URL` to its public base URL.
