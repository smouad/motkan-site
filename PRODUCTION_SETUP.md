# Production Setup Guide

Your landing page is now production-ready. Complete these setup steps to fully activate all features.

## ✅ Completed

- [x] Lead capture form (UI + styling)
- [x] SEO meta tags (Open Graph, Twitter Card, Schema.org)
- [x] Analytics tracking code placeholder
- [x] Privacy Policy and Terms of Service pages
- [x] 404 error page
- [x] Sitemap.xml for search engines
- [x] Robots.txt for crawlers
- [x] Mobile responsive testing
- [x] Contact form styles + success/error states
- [x] Footer legal links

---

## ⚙️ Setup Required (Before Launch)

### 1. **Formspree Email Integration** (Required for lead capture)

The contact form is built but needs an email endpoint.

**Steps:**
1. Go to https://formspree.com
2. Sign up (free tier available)
3. Create a new form:
   - Name: "Motkan Lead Capture"
   - Email: `hello@motkan.ai`
4. Copy your form ID (looks like: `f/abcdef123456`)
5. Open `app/contact-form.jsx` and replace `YOUR_FORM_ID`:
   ```jsx
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```
   with your actual ID.

6. Test the form at `http://localhost:3200/#contact`
7. Commit and push the change

**Verify:** Submit a test form → check `hello@motkan.ai` inbox

---

### 2. **Google Analytics** (Required for tracking)

Analytics tracking code is in place but needs your Google ID.

**Steps:**
1. Go to https://analytics.google.com
2. Create a new property for motkan.ai (if you don't have one)
3. Copy your Measurement ID (format: `G-XXXXXXXXXX`)
4. Open `app/layout.tsx` and replace both instances of `G-XXXXXXXXXX`:
   ```tsx
   src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
   gtag('config', 'G-XXXXXXXXXX', {
   ```
5. Commit and push the change

**Verify:** Visit the site and check Analytics → Realtime to see traffic

---

### 3. **Email Setup** (For contact emails)

Make sure `hello@motkan.ai` is monitored:
- [ ] Gmail/Office365 inbox created
- [ ] Auto-responder set up (optional but recommended)
- [ ] Add email to team calendar notifications

---

### 4. **Domain Configuration** (If using custom domain)

If deploying to a custom domain instead of vercel.app:

1. Update domain in `layout.tsx`:
   ```tsx
   const siteUrl = "https://motkan.ai"; // Change if different
   ```

2. Update sitemap.xml URLs to match your domain

3. Add domain DNS records to Vercel (if hosted on Vercel)

---

## 🧪 Testing Checklist

Before going live, verify:

- [ ] **Contact form** works and sends emails to your inbox
- [ ] **Privacy page** displays correctly at `/privacy`
- [ ] **Terms page** displays correctly at `/terms`
- [ ] **404 page** shows when visiting `/nonexistent`
- [ ] **Mobile responsiveness** — test on phone (navbar, forms, buttons)
- [ ] **Google Analytics** shows traffic in real-time dashboard
- [ ] **Sitemap** accessible at `/sitemap.xml`
- [ ] **Robots.txt** accessible at `/robots.txt`
- [ ] **SEO meta tags** visible in page source:
  ```html
  <meta property="og:title" content="Motkan — AI Systems...">
  <meta name="description" content="...">
  ```

---

## 📱 Mobile Testing

Run the dev server and test on mobile:

```bash
cd /Users/mouad/Developer/motkan-site
npm run dev
```

Then visit `http://localhost:3200` on:
- iPhone (Safari)
- Android (Chrome)
- Tablet (landscape)

Check:
- Navigation menu collapses
- Form fields stack properly
- Hero section is readable
- Buttons are tap-friendly

---

## 🚀 Deployment

Your site auto-deploys to Vercel whenever you push to `main`:

```bash
git add .
git commit -m "your message"
git push origin main
```

Check deployment status at: https://vercel.com

---

## 📊 After Launch Monitoring

**First Week:**
- Monitor Google Analytics for traffic patterns
- Watch for form submissions and respond within 2 hours
- Check for any console errors in browser DevTools
- Test form from different email providers

**Ongoing:**
- Review analytics monthly for visitor trends
- Monitor form submissions and response times
- Keep legal pages updated as needed
- Add new use cases or testimonials

---

## 🔧 Troubleshooting

**Form submissions not working?**
- Check Formspree form ID is correct
- Verify email in Formspree settings matches your inbox
- Check browser console for errors (F12 → Console tab)

**Analytics not tracking?**
- Verify Google Analytics ID is correct
- Wait 24-48 hours for data to populate
- Check Google Analytics > Realtime view while browsing site

**Sitemap/Robots.txt not found?**
- They're in `/public/` folder
- Should be accessible at `/sitemap.xml` and `/robots.xml`

**Mobile layout broken?**
- Check `@media (max-width: 600px)` styles in `app/styles.css`
- Test with Chrome DevTools → Toggle device toolbar

---

## 📝 Files Changed

- `app/contact-form.jsx` — Lead capture form component
- `app/layout.tsx` — SEO tags + Analytics setup
- `app/page.jsx` — Contact form integration + footer links
- `app/styles.css` — Form, legal, and mobile styles
- `app/privacy/page.tsx` — Privacy Policy page
- `app/terms/page.tsx` — Terms of Service page
- `app/not-found.tsx` — 404 error page
- `public/sitemap.xml` — Search engine sitemap
- `public/robots.txt` — Crawler instructions

---

## ❓ Questions?

If anything is unclear:
1. Check code comments in the files (especially `contact-form.jsx` and `layout.tsx`)
2. Verify setup instructions above
3. Test locally first: `npm run dev`

You're ready to launch! 🚀
