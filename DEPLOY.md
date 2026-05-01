# Deploying Neurolit to Cloudflare Pages

## Prerequisites

- A [Cloudflare account](https://dash.cloudflare.com/sign-up)
- This repository pushed to a GitHub account
- The API server deployed separately (e.g., a Node.js host or Cloudflare Workers)

---

## Automated deployment via GitHub Actions (recommended)

The repository includes `.github/workflows/deploy.yml`, which automatically builds and deploys the site on every push to `main` and posts a preview URL comment on every pull request.

### One-time setup

#### 1. Create a Cloudflare Pages project

1. Go to [Cloudflare Pages dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Direct Upload**.
2. Name the project **`neurolit`** (must match the `projectName` in the workflow).
3. Skip the initial upload — GitHub Actions will handle all future deployments.

#### 2. Obtain a Cloudflare API token

1. Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens) → **Create Token**.
2. Use the **Edit Cloudflare Workers** template, or create a custom token with:
   - **Permissions:** `Account → Cloudflare Pages → Edit`
   - **Account Resources:** your account
3. Copy the generated token.

#### 3. Find your Cloudflare Account ID

Your Account ID is shown in the right-hand sidebar of the Cloudflare dashboard home, or in the URL: `https://dash.cloudflare.com/<ACCOUNT_ID>`.

#### 4. Add GitHub repository secrets

Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret** and add:

| Secret name | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | The API token from step 2 |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID from step 3 |
| `VITE_API_URL` | Base URL of your deployed API server, e.g. `https://api.neurolit.com` |

> `GITHUB_TOKEN` is provided automatically by GitHub Actions — no manual setup needed.

> **Note on forked pull requests:** GitHub Actions does not expose repository secrets to workflows triggered by PRs from forks (for security reasons). Preview deployments and PR comments will work for branches within the same repository, but not for PRs opened from external forks.

### How it works

| Event | Result |
|---|---|
| Push to `main` | Production deployment to Cloudflare Pages |
| Pull request opened or updated | Preview deployment; Cloudflare posts the preview URL as a PR comment |

---

## Manual deployment (alternative)

If you prefer to let Cloudflare Pages build the project itself from the GitHub integration instead of using GitHub Actions:

### Step 1 — Connect GitHub to Cloudflare Pages

1. Go to [Cloudflare Pages dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Authorize Cloudflare to access your GitHub account and select this repository.
3. Click **Begin setup**.

### Step 2 — Configure build settings

| Setting | Value |
|---|---|
| **Framework preset** | None |
| **Build command** | `pnpm --filter @workspace/neurolit build` |
| **Build output directory** | `artifacts/neurolit/dist` |
| **Root directory** | *(leave blank — monorepo root)* |
| **Node.js version** | 20 (set under **Environment variables** or via `.nvmrc`) |

#### Environment variables

Add these under **Settings → Environment variables** for the Production environment:

| Variable | Value | Required |
|---|---|---|
| `VITE_API_URL` | Base URL of your deployed API server, e.g. `https://api.neurolit.com` | Yes (if using the API) |
| `NODE_VERSION` | `20` | Recommended |

> **Local dev note:** When `VITE_API_URL` is not set, the frontend falls back to relative `/api/...` paths, which work when the dev server is running alongside the API server (Replit environment).

### Step 3 — Deploy

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
