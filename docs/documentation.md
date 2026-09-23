# SaaS Launch — Template Documentation & Customization Guide

Welcome to the comprehensive documentation for **SaaS Launch**, a premium, commercial-grade front-end SaaS landing page template engineered with semantic HTML5, modern CSS3, and vanilla JavaScript.

---

## Table of Contents

1. [Template Overview & Inclusions](#1-template-overview--inclusions)
2. [Prerequisites & Required Tools](#2-prerequisites--required-tools)
3. [Running Locally](#3-running-locally)
4. [Project File Structure](#4-project-file-structure)
5. [Customizing Brand Identity & Text](#5-customizing-brand-identity--text)
6. [Color Palette & Typography Customization](#6-color-palette--typography-customization)
7. [Updating Pricing & Billing Calculations](#7-updating-pricing--billing-calculations)
8. [Dashboard Mockups & Custom Visuals](#8-dashboard-mockups--custom-visuals)
9. [JavaScript Interactions Architecture](#9-javascript-interactions-architecture)
10. [Connecting the Contact Form to a Backend](#10-connecting-the-contact-form-to-a-backend)
11. [Replacing Demo Testimonials & Statistics](#11-replacing-demo-testimonials--statistics)
12. [Deploying to Static Hosting Platforms](#12-deploying-to-static-hosting-platforms)
13. [Preparing for Marketplace Submission](#13-preparing-for-marketplace-submission)
14. [Accessibility & Performance Standards](#14-accessibility--performance-standards)

---

## 1. Template Overview & Inclusions

**SaaS Launch** is built from the ground up to empower SaaS founders, indie hackers, and creative agencies to deploy a high-converting, accessible, and responsive landing page in minutes without the overhead of heavy JavaScript frameworks.

### What is Included:
- **A. Slim Announcement Bar**: Top promotional banner with "NEW" badge, link, and session-aware dismiss button.
- **B. Responsive Sticky Navigation**: Glassmorphic blur on scroll, accessible mobile drawer menu, smooth jump-links, and dual CTA buttons.
- **C. High-Converting Hero Section**: Eyebrow badge, compelling copy hierarchy, dual call-to-actions, trust indicators, and a high-fidelity inline CSS/SVG SaaS dashboard interface mockup with floating KPI badges.
- **D. Social Proof Strip**: 5 fictional vector client marks, 3 core reliability stats, and clear illustrative demo labels.
- **E. 6 Core Feature Cards**: Responsive grid (3-col desktop, 2-col tablet, 1-col mobile) with subtle periodic hover animations (gentle floating cycle, icon harmonic float, top gradient flow, and periodic light sheen) and SVG iconography.
- **F. Alternating Product Showcase**: 3 deep-dive feature rows pairing benefit bullet points with realistic interactive UI mockups (Goal Tracker, Team Collaboration Feed, Automated Pipeline Flow).
- **G. 3-Step "How It Works" Section**: Clear visual numbered onboarding progression.
- **H. Dynamic Pricing Engine**: 3 pricing tiers (Starter, Pro, Business) featuring a monthly/annual billing cycle toggle with a configurable 20% discount calculation.
- **I. Customer Testimonials**: Quote cards with user avatars, roles, and company affiliations.
- **J. Integration Ecosystem**: 6 app cards (Slack, Notion, Google Drive, GitHub, Figma, Zapier) with instant connect indicators.
- **K. Accessible FAQ Accordion**: 7 pre-written questions with smooth collapsible height transitions and keyboard accessibility (`Enter`/`Space`).
- **L. High-Impact Final CTA**: Gradient backdrop with dual conversion buttons.
- **M. Contact & Inquiry Section**: Semantic form with client-side regex email validation, real-time error states, and submission feedback.
- **N. Footer**: 4-column structured layout, dynamic copyright year (`new Date().getFullYear()`), social icons, and modal legal links.
- **O. Interactive Modal System**: Pre-populates selected plan when opened from any pricing button, validates signup inputs, and provides demo confirmation.
- **P. Back-to-Top Floating Trigger**: Smooth scroll recovery that reveals itself after 350px of page scrolling.

---

## 2. Prerequisites & Required Tools

Because SaaS Launch is built with pure web standards (HTML5, CSS3, Vanilla JS), you do not need Node.js, npm, or build steps to customize it.

### Recommended Environment:
- **Code Editor**: Visual Studio Code, Cursor, WebStorm, or Sublime Text.
- **Local Server** (Optional for testing):
  - Python 3 (`python3 -m http.server 8000`)
  - VS Code Extension: **Live Server** (by Ritwick Dey)
  - Node.js `npx serve .` or `npx vite`

---

## 3. Running Locally

### Option A: VS Code Live Server (Fastest)
1. Open the project folder in VS Code.
2. Right-click on `index.html` and click **"Open with Live Server"**.
3. Your default browser will open the page at `http://127.0.0.1:5500`.

### Option B: Python Simple Server
Open your terminal in the project directory and run:
```bash
# Python 3
python3 -m http.server 3000
```
Open your browser at `http://localhost:3000`.

### Option C: Node.js / Vite
If using the provided Vite runner:
```bash
npm install
npm run dev
```

---

## 4. Project File Structure

```text
saas-launch/
├── index.html              # Main semantic HTML structure & metadata
├── css/
│   └── styles.css          # Design system variables, layouts, and animations
├── js/
│   └── main.js             # Configuration object & interactive event listeners
├── assets/
│   ├── images/             # OpenGraph previews and branding assets
│   └── icons/              # Vector SVG icons
├── docs/
│   └── documentation.md    # Detailed guide (this document)
├── LICENSE.txt             # License terms & commercial template attribution
└── README.md               # Quickstart summary
```

---

## 5. Customizing Brand Identity & Text

### Updating the Brand Name
1. **HTML**: In `index.html`, search for `SaaS Launch` and replace it with your company name in:
   - `<title>` tag
   - `<meta property="og:title">`
   - Navbar brand `<a href="#" class="brand-logo">`
   - Footer logo `<div class="footer-brand-col">`
2. **JavaScript Configuration**: Open `js/main.js` and edit the `SaaSLaunchConfig.brand` object:
   ```javascript
   const SaaSLaunchConfig = {
     brand: {
       name: "YourBrandName",
       tagline: "Your custom headline here",
       logoText: "YourBrand"
     },
     // ...
   };
   ```

---

## 6. Color Palette & Typography Customization

All visual styles are driven by CSS Custom Properties at the top of `css/styles.css`.

### Changing Primary Brand Colors
```css
:root {
  /* Replace #635bff with your brand color */
  --color-primary: #635bff;
  --color-primary-hover: #5145e5;
  --color-primary-active: #4338ca;
  --color-primary-light: #f0efff;
  --color-primary-rgb: 99, 91, 255;

  /* Surfaces & Neutrals */
  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-border: #e2e8f0;

  /* Typography */
  --color-text-heading: #0f172a;
  --color-text-body: #64748b;
}
```

### Changing Fonts
By default, the template loads **Plus Jakarta Sans** from Google Fonts. To switch to another font (such as Inter, Outfit, or Poppins):
1. Update the Google Fonts link in `<head>` of `index.html`.
2. Update `--font-family-sans` in `css/styles.css`:
   ```css
   --font-family-sans: 'Outfit', -apple-system, sans-serif;
   ```

---

## 7. Updating Pricing & Billing Calculations

All prices, plan names, and annual billing discounts are controlled centrally in `js/main.js`.

```javascript
const SaaSLaunchConfig = {
  billing: {
    yearlyDiscountPercent: 20, // 20% discount on yearly plans
    currencySymbol: "$",
    defaultBillingCycle: "monthly"
  },
  plans: {
    starter: {
      name: "Starter",
      monthlyPrice: 0,
      yearlyMonthlyEquivalent: 0,
      billedYearlyTotal: 0
    },
    pro: {
      name: "Pro",
      monthlyPrice: 19,
      yearlyMonthlyEquivalent: 15,
      billedYearlyTotal: 180
    },
    business: {
      name: "Business",
      monthlyPrice: 49,
      yearlyMonthlyEquivalent: 39,
      billedYearlyTotal: 468
    }
  }
};
```

When the user toggles between **Monthly** and **Yearly Billing**:
- Price amounts update automatically with no page reload.
- The billed annual note updates to reflect the annual total.
- Opening the modal passes the selected plan and price context directly to the registration flow.

---

## 8. Dashboard Mockups & Custom Visuals

The hero and showcase mockups are built using pure CSS and lightweight inline SVGs. This guarantees:
- **Zero latency**: Instant rendering without loading large image files.
- **Pixel-perfection**: Crisp display on retina and high-DPI displays.
- **Easy customization**: Easily edit data points, chart curves, or metrics directly in HTML.

### Customizing the Hero Performance Wave Chart
In `index.html`, locate `<svg viewBox="0 0 450 120">`. The SVG `path` definition controls the wave line:
```xml
<path d="M0,85 C60,95 90,40 140,50 ... " fill="url(#chartGradient)" />
```
You can alter coordinates or change colors by modifying the `<stop>` tags inside `<defs>`.

---

## 9. JavaScript Interactions Architecture

All interactions are implemented in vanilla ES6 module format inside `js/main.js`:
- `initAnnouncementBar()`: Handles dismissal and stores preference in `sessionStorage`.
- `initStickyHeader()`: Adds `.is-scrolled` to `<header>` on scroll > 20px.
- `initMobileNavigation()`: Manages drawer toggle, ARIA states, body scroll lock, and outside click/Escape dismissal.
- `initSmoothScroll()`: Intercepts `#anchor` clicks for smooth scrolling with sticky header offset.
- `initPricingToggle()`: Syncs pricing numbers between monthly and annual plans.
- `initFaqAccordion()`: Manages single or multi-accordion expansion with ARIA attributes.
- `initSignupModal()`: Controls modal display, focus trap, plan tabs, and form validation.
- `initContactForm()`: Validates name, email format, and message length with clear feedback.
- `initBackToTop()`: Toggles floating button visibility past 350px.
- `initScrollReveal()`: Activates subtle upward entry transitions using `IntersectionObserver`, automatically bypassed when `prefers-reduced-motion: reduce` is detected.

---

## 10. Connecting the Contact Form to a Backend

In this template, the contact form validates input locally and simulates successful delivery. To connect this to a real backend in production:

### Method A: Formspree or Formkeep (No Server Required)
1. Register a free account at [Formspree](https://formspree.io).
2. Update `<form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">`.
3. In `js/main.js`, in `initContactForm()`, replace the demo feedback with a standard `fetch()` call:
   ```javascript
   const formData = new FormData(form);
   fetch(form.action, {
     method: "POST",
     body: formData,
     headers: { 'Accept': 'application/json' }
   }).then(response => {
     if (response.ok) {
       successBanner.classList.add("is-visible");
       form.reset();
     }
   });
   ```

### Method B: Node.js / Express or Next.js API Route
Send a `POST` request to `/api/contact` with JSON payload `{ name, email, subject, message }` and process through an email service provider such as Resend, SendGrid, or Postmark.

---

## 11. Replacing Demo Testimonials & Statistics

All social proof, statistics, and customer testimonials in this template are labeled as illustrative demo content.

### To insert real testimonials:
1. Locate `<section id="testimonials">` in `index.html`.
2. Replace the quote text, customer name, and role.
3. Replace the initials in `<div class="author-avatar">` with actual customer photos:
   ```html
   <img src="/assets/images/customer-1.jpg" alt="Jane Doe" class="author-avatar" />
   ```
4. Update the statistics in `<div class="stats-strip">` with your verified analytics numbers.

---

## 12. Deploying to Static Hosting Platforms

Because **SaaS Launch** contains only static HTML, CSS, and JS files, it can be deployed for free on any modern hosting provider:

### Vercel:
1. Push your code to GitHub.
2. Go to Vercel and import your repository.
3. Keep default settings and click **Deploy**.

### Netlify:
1. Drag and drop the `saas-launch/` folder directly onto the Netlify Dashboard.
2. Or link your Git repository with build command left blank and publish directory set to `.`.

### GitHub Pages:
1. In your GitHub repository, go to **Settings > Pages**.
2. Select the `main` branch as your source and root `/` as the folder.
3. Click **Save**.

---

## 13. Preparing for Marketplace Submission

When packaging this template for ThemeForest, Creative Market, or UI8:
1. **Clean Assets**: Ensure all sample photos are properly licensed or replaced with SVGs.
2. **Validate Code**:
   - Run HTML through [W3C Nu HTML Checker](https://validator.w3.org/nu/).
   - Validate CSS through [W3C CSS Validator](https://jigsaw.w3.org/css-validator/).
3. **Cross-Browser Verification**: Check Chrome, Firefox, Safari, Edge, iOS Safari, and Android Chrome.
4. **Documentation**: Include this `documentation.md` file inside the `docs/` folder.
5. **License**: Check `LICENSE.txt` and assign your custom commercial or marketplace distribution license.

---

## 14. Accessibility & Performance Standards

- **WCAG 2.1 AA Compliant**: All text elements adhere to minimum 4.5:1 contrast ratios.
- **Screen Reader Friendly**: Proper ARIA landmarks (`role="banner"`, `role="complementary"`, `role="contentinfo"`), `aria-expanded`, and descriptive icon `aria-hidden` tags.
- **Prefers Reduced Motion**: Animations automatically deactivate for users with motion sensitivities.
- **Zero Third-Party JS Libraries**: Ultra-fast initial load times and no external scripts that could cause security vulnerabilities.

---
*Created for SaaS Launch — The modern starter template for high-growth software teams.*
