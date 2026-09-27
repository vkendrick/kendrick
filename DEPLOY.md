# Cloudflare Pages Deployment Guide

## Prerequisites

1. **Cloudflare Account** - Sign up at https://dash.cloudflare.com/sign-up
2. **Wrangler CLI** - `npm install -g wrangler`
3. **Git Repository** - Push code to GitHub/GitLab/Bitbucket

---

## Step 1: Login & Setup

```bash
# Login to Cloudflare
wrangler login

# Verify authentication
wrangler whoami
```

---

## Step 2: Create D1 Database

```bash
# Create database
wrangler d1 create kendrick-leads

# Output example:
# Created database 'kendrick-leads' in account 'your-account-id'
# database_id = "abc123-def456-ghi789"
# binding = "DB"
```

**Copy the `database_id`** - you'll need it for `wrangler.jsonc`.

---

## Step 3: Create KV Namespace

```bash
# Create KV namespace
wrangler kv:namespace create LEADS_KV

# Output example:
# Created namespace 'LEADS_KV'
# id = "xyz789-uvw456-rst123"
# binding = "LEADS_KV"
```

**Copy the `id`** - you'll need it for `wrangler.jsonc`.

---

## Step 4: Update wrangler.jsonc

Edit `wrangler.jsonc` with your actual IDs:

```jsonc
{
  "name": "kendrick-consultoria",
  "compatibility_date": "2026-09-27",
  "pages_build_output_dir": "./dist",
  "assets": {
    "binding": "ASSETS",
    "not_found_handling": "single-page-application"
  },
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "kendrick-leads",
      "database_id": "YOUR_DATABASE_ID_HERE"
    }
  ],
  "kv_namespaces": [
    {
      "binding": "LEADS_KV",
      "id": "YOUR_KV_NAMESPACE_ID_HERE"
    }
  ],
  "vars": {
    "ENVIRONMENT": "production"
  }
}
```

---

## Step 5: Run Database Migration

```bash
# Run migration remotely
wrangler d1 execute kendrick-leads --file=./migrations/001_init.sql --remote

# Verify tables created
wrangler d1 execute kendrick-leads --command="SELECT * FROM leads LIMIT 1" --remote
wrangler d1 execute kendrick-leads --command="SELECT * FROM contacts LIMIT 1" --remote
```

---

## Step 6: Cloudflare Pages Setup (Git Integration)

### Option A: Via Dashboard (Recommended)

1. Go to **Cloudflare Dashboard → Pages → Connect to Git**
2. Select your Git provider (GitHub/GitLab/Bitbucket)
3. Select repository: `kendrick-consultoria`
4. Configure build:
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
   - **Root directory**: `/kendrick/kendrick` (if repo has multiple projects)
5. **Environment variables** (Pages → Settings → Functions → Environment variables):

| Variable | Value | Description |
|----------|-------|-------------|
| `RESEND_API_KEY` | `re_xxxxxxxxxxxx` | Resend API key for emails |
| `OWNER_EMAIL` | `veridiana@kendrick.com` | Where notifications go |
| `CALLMEBOT_APIKEY` | `your-callmebot-key` | Optional: WhatsApp notifications |
| `CLOUDFLARE_ANALYTICS_TOKEN` | `your-analytics-token` | From Web Analytics |

6. **Add D1 Binding**: Pages → Settings → Functions → D1 databases → Add binding
   - Variable name: `DB`
   - Database: `kendrick-leads`

7. **Add KV Binding**: Pages → Settings → Functions → KV namespaces → Add binding
   - Variable name: `LEADS_KV`
   - Namespace: `LEADS_KV`

8. **Deploy**: Click "Save and Deploy"

### Option B: Via Wrangler CLI

```bash
# Deploy directly
npm run pages:deploy

# Or with environment variables
CLOUDFLARE_API_TOKEN=xxx CLOUDFLARE_ACCOUNT_ID=xxx npm run pages:deploy
```

---

## Step 7: Cloudflare Web Analytics

1. Go to **Dashboard → Web Analytics → Add site**
2. Enter your domain (e.g., `kendrickconsultoria.com`)
3. Copy the **Token** (looks like: `abc123def456...`)
4. Add as environment variable: `CLOUDFLARE_ANALYTICS_TOKEN`
5. Re-deploy (or next auto-deploy will pick it up)

---

## Step 8: Custom Domain

1. Pages → Settings → Custom domains → Add domain
2. Enter: `kendrickconsultoria.com` (or your domain)
3. Follow DNS verification instructions
4. SSL/TLS: Automatic (Cloudflare manages)

---

## Step 9: Verify Deployment

```bash
# Check deployment status
wrangler pages deployment list --project-name=kendrick-consultoria

# Test endpoints
curl https://kendrick-consultoria.pages.dev/api/health
curl -X POST https://kendrick-consultoria.pages.dev/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","score":5,"level":"invisible_digital","package":"Arranque Digital Mínimo","consent":true}'
```

---

## Environment Variables Reference

### Required for Production

| Variable | Source | Purpose |
|----------|--------|---------|
| `RESEND_API_KEY` | https://resend.com/api-keys | Transactional emails |
| `OWNER_EMAIL` | Your email | Lead/contact notifications |
| `DB` (binding) | Cloudflare D1 | Database for leads/contacts |
| `LEADS_KV` (binding) | Cloudflare KV | Optional: caching/rate-limiting |

### Optional

| Variable | Source | Purpose |
|----------|--------|---------|
| `CALLMEBOT_APIKEY` | https://callmebot.com/whatsapp/ | WhatsApp notifications |
| `CLOUDFLARE_ANALYTICS_TOKEN` | Cloudflare Web Analytics | Privacy-first analytics |

---

## Post-Deploy Checklist

- [ ] Site loads at `https://kendrick-consultoria.pages.dev` (or custom domain)
- [ ] Quiz works: `/quiz` → 5 questions → email capture → result page
- [ ] Lead saved in D1: `wrangler d1 execute kendrick-leads --command="SELECT * FROM leads" --remote`
- [ ] Contact form works: `/#contacto` → submit → check D1 `contacts` table
- [ ] Email received at `OWNER_EMAIL` for test lead
- [ ] WhatsApp notification received (if `CALLMEBOT_APIKEY` set)
- [ ] Analytics showing in Cloudflare Web Analytics
- [ ] Sitemap accessible: `https://kendrick-consultoria.pages.dev/sitemap.xml`
- [ ] Robots.txt accessible: `https://kendrick-consultoria.pages.dev/robots.txt`
- [ ] Structured data validates: https://validator.schema.org/
- [ ] Images loading from `/portfolio/*.webp`
- [ ] Mobile responsive check
- [ ] PageSpeed Insights > 90

---

## Troubleshooting

### Build fails
```bash
# Clear cache and rebuild
rm -rf dist node_modules
npm install --legacy-peer-deps
npm run build
```

### D1 binding not working
- Verify `database_id` in `wrangler.jsonc` matches `wrangler d1 list`
- Ensure binding name is `DB` in both wrangler.jsonc and Pages settings
- Check Pages → Functions → D1 databases shows "Connected"

### Functions not executing
- Verify `functions/` folder copied to `dist/functions/` in build
- Check `_redirects` has `/* /index.html 200` for SPA
- Functions must be in `dist/functions/api/*.ts` format

### Emails not sending
- Verify `RESEND_API_KEY` starts with `re_`
- Check Resend dashboard for delivery status
- Test with `wrangler pages dev dist` locally first

---

## Costs (Monthly Estimates)

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| Cloudflare Pages | Unlimited requests, 500 builds/mo | $20/mo for more builds |
| Cloudflare D1 | 5M reads, 100k writes, 5GB storage | $5/mo per additional 5M reads |
| Cloudflare KV | 100k reads, 1k writes, 1GB | $0.50/mo per million reads |
| Cloudflare Web Analytics | Free (10M events/mo) | N/A |
| Resend | 3,000 emails/mo | $20/mo for 50k emails |
| CallMeBot | Free (rate limited) | €3/mo for higher limits |

**Estimated cost: $0-5/mo** for typical usage.

---

## GitHub Actions Auto-Deploy

The `.github/workflows/deploy.yml` handles auto-deploy on push to main:

1. Add secrets in GitHub: Settings → Secrets → Actions:
   - `CLOUDFLARE_API_TOKEN` (from Cloudflare → My Profile → API Tokens)
   - `CLOUDFLARE_ACCOUNT_ID` (from Cloudflare Dashboard URL)

2. Push to main → Auto-deploy triggers

---

## Local Development with Full Stack

```bash
# Start Vite + Pages Functions locally
npm run pages:dev

# Opens http://localhost:8788 with:
# - Frontend (Vite HMR)
# - API functions (/api/leads, /api/contact)
# - D1 database (local .wrangler/state)
```