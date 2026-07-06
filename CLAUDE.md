# Elevated Shine — Project Notes for Claude

## What this project is

Static HTML site for Elevated Shine mobile detailing. No build system. Files are plain `.html` using a custom "Design Components" (DC) React runtime via `support.js`. Deployed on Netlify at `elevatedshinedetail.com`.

**Key files:**
- `Mobile Detailing Site.dc.html` — main landing page
- `BookingForm.dc.html` — booking form (embedded via `<dc-import>`)
- `support.js` — DC runtime (React 18, do not edit)
- `assets/` — logo files

Supabase project ID: `hhdrqgkhpfmbujlnhtlm`

---

## Open todos

### Google Auth
- [x] Supabase dashboard → Authentication → Providers → enable Google, paste in Client ID + Secret from Google Cloud Console (done 2026-07-05; OAuth client "Elevated Shine Web" in Google Cloud project `elevatedshine`)
- [x] Add `https://hhdrqgkhpfmbujlnhtlm.supabase.co/auth/v1/callback` to Authorized Redirect URIs in the Google Cloud OAuth client
- [x] Add `https://elevatedshinedetail.com` (and `http://localhost`) to Authorized JavaScript Origins in Google Cloud
- [ ] Test the "Continue with Google" button — NOTE: the Google OAuth app is in **Testing** mode, so only test users added under Google Auth Platform → Audience can sign in. Publish the app (or add test users) before testing.

### Remove Apple Sign-In
- [x] Delete the Apple `<button>` block in `BookingForm.dc.html`
- [x] Remove `signInApple` from `renderVals()` and the `signInWithProvider('apple')` call

### Supabase Schema & Form Fields
- [x] Split "Your name" field into **First name** + **Last name** side by side in the form UI
- [x] Update `bookings` table: replace `name` column with `first_name` + `last_name`
- [x] Update `signUp` call's `user_metadata` to store `first_name` and `last_name` separately
- [x] Confirm `bookings` table has all columns: `first_name`, `last_name`, `email`, `phone`, `county`, `service`, `vehicle`, `date`, `time`, `notes`, `mode`, `user_id`, `frame_id` — verified via migration `split_name_add_vehicle_size`
- [x] Add `vehicle_size` column to `bookings` (Sedan / SUV / Truck, check-constrained) and a matching size selector in the form alongside the service dropdown
- [x] Update the service dropdown options to match the 3 current tiers: Essential Clean, Full Detail, Showroom

### Package restructure (2026-07-06)
- [x] Tiers renamed: **Express Shine / Elevated Detail / Premium Care Service** (site cards + form dropdown)
- [x] Pricing is by package + vehicle size only (no condition-based ranges). Size classes: **Compact / Mid-size / Large SUV & Truck**
- [x] Size is determined by the business from the customer's vehicle make & model — the form has NO size dropdown; the Vehicle (make & model) field is required instead
- [x] `bookings.vehicle_size` kept as internal, nullable, check-constrained to Compact / Mid-size / Large SUV/Truck (migration `vehicle_size_new_classes`)
- [x] Add-ons added to site: Machine wax +$60, Ceramic seal +$120, Vinyl & leather repair from $75
- `index.html` is a copy of `Mobile Detailing Site.dc.html` (Netlify entry point) — re-copy after editing the .dc.html

### Deployment (live as of 2026-07-06)
- GitHub repo: https://github.com/jkear/Elevated-shine.git — **push after every successful site test**; Netlify project `elevatedshine` auto-deploys from `main`
- Live at https://elevatedshinedetail.com (the domain owned in Spaceship — NOT elevatedshine.com, which belongs to someone else) + www redirect + elevatedshine.netlify.app
- DNS at Spaceship: A `@` → 75.2.60.5, CNAME `www` → elevatedshine.netlify.app
- Entry point is `index.html` (copy of `Mobile Detailing Site.dc.html`) — re-copy after edits

### Packages (2026-07-06)
- Express Shine from $120 · Elevated Detail from $179 · Premium Care Service from $399 — single "starting at" price per package, final quote by vehicle size (Compact / Mid-size / Large SUV & Truck), size determined from customer's make & model
- Premium includes DA-buffer work only: finishing polish, synthetic sealant + SiO₂ spray. **True ceramic coating is an add-on, from $750** (multi-year, incl. polish prep — priced vs Bender7 $700/3–5yr and Jax $980+)
