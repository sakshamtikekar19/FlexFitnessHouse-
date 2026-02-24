# JSONBin setup for visitor-submitted reviews

Uses your existing JSONBin account. No new signup. Two steps: create one extra bin, then deploy the API to Vercel (free).

---

## 1. Create a bin for submitted reviews

1. Go to [jsonbin.io](https://jsonbin.io) and log in.
2. **Create bin** → set the initial content to:
   ```json
   {"reviews":[]}
   ```
3. Save. Open the bin and click **Make public** (or note the bin ID).
4. Copy the **“Latest”** URL, e.g.  
   `https://api.jsonbin.io/v3/b/XXXXXXXX/latest?meta=false`  
   (or your bin’s **Bin ID** from the URL).

---

## 2. Deploy the API to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up / log in.
2. **Add New** → **Project** → **Import** this GitHub repo.
3. Leave **Root Directory** as `.` and deploy.
4. After deploy, go to **Project → Settings → Environment Variables**.
5. Add:
   - **Name:** `JSONBIN_SUBMITTED_BIN_ID`  
     **Value:** the bin ID from step 1 (the part after `/b/` in the URL, e.g. `6990ba6ad0ea881f40ba88da`).
   - **Name:** `JSONBIN_MASTER_KEY`  
     **Value:** your JSONBin Master Key (same as in Admin → Publish to web).
6. **Redeploy** the project (Deployments → ⋮ → Redeploy).

---

## 3. Update config.js

Open `config.js` and set:

```js
var SUBMITTED_REVIEWS_BIN_URL = 'https://api.jsonbin.io/v3/b/YOUR_SUBMITTED_BIN_ID/latest?meta=false';
var SUBMIT_REVIEW_API_URL = 'https://YOUR_VERCEL_PROJECT.vercel.app/api/submit-review';
```

Replace:
- `YOUR_SUBMITTED_BIN_ID` with the bin ID from step 1.
- `YOUR_VERCEL_PROJECT` with your Vercel project name (or use the full URL Vercel gives you).

Save and push to GitHub. Your main site can stay on GitHub Pages; only the **form** will POST to Vercel. Make sure the bin for submitted reviews is **public** so the site can read it without a key.

---

## Summary

| What | Where |
|------|--------|
| Admin data (pricing, trainers, admin reviews) | Existing bin, Admin → Publish now |
| Visitor-submitted reviews (read) | New public bin → `SUBMITTED_REVIEWS_BIN_URL` |
| Visitor-submitted reviews (write) | Vercel function `/api/submit-review` → `SUBMIT_REVIEW_API_URL` |

No billing, same JSONBin key (only in Vercel env, never in the browser).
