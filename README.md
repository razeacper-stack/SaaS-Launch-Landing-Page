# SaaS Launch — Premium SaaS Landing Page Template

A clean, modern, and conversion-focused SaaS landing page template built strictly with **semantic HTML5**, **modern CSS3**, and **vanilla JavaScript**. 

Designed for SaaS startups, indie developers, and marketplace authors who need a high-performance, accessible, and completely customizable front-end template.

---

## ⚡ Highlights

- **Pure Web Standards**: Zero npm runtime bloat, no React/Vue/Angular required.
- **Modern Design System**: CSS Custom Properties for colors, typography, radii, and shadows.
- **Dynamic Pricing Engine**: Instant monthly/annual toggle with a configurable 20% discount calculation.
- **Interactive Modals & Navigation**: Accessible mobile drawer, sticky header with backdrop blur, and interactive signup modal.
- **Rich Dashboard Mockups**: Crisp SVG & CSS SaaS interface mockups with live throughput wave charts, team velocity radial gauges, and pipeline activity feeds.
- **Form Validation**: Client-side regex email and required field validation with friendly demo feedback banners.
- **Accessible & Responsive**: Keyboard navigable FAQ accordion, ARIA controls, WCAG AA color contrast, and `prefers-reduced-motion` compliance.

---

## 📁 File Structure

```text
├── index.html              # Main semantic HTML page with sections A-N
├── css/
│   └── styles.css          # Design system, layout grid, and component styles
├── js/
│   └── main.js             # Centralized config and vanilla JS interactions
├── assets/
│   ├── images/             # Static graphics and social preview images
│   └── icons/              # Vector SVG icons
├── docs/
│   └── documentation.md    # In-depth customization guide and deployment steps
├── LICENSE.txt             # License terms & commercial template attribution
└── README.md               # Quickstart guide (this file)
```

---

## 🚀 Quick Start

### 1. View Directly
Double-click `index.html` to view in any modern browser.

### 2. Run with VS Code Live Server
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension.
3. Right click `index.html` &rarr; **Open with Live Server**.

### 3. Run with Python
```bash
python3 -m http.server 3000
```
Open [http://localhost:3000](http://localhost:3000).

---

## 🎨 Easy Customization

### Change Primary Brand Colors
In `css/styles.css`, edit the `:root` variables:
```css
:root {
  --color-primary: #635bff;        /* Your Brand Color */
  --color-primary-hover: #5145e5;
  --color-primary-light: #f0efff;
}
```

### Update Pricing & Discount Rules
In `js/main.js`, edit the centralized `SaaSLaunchConfig` object:
```javascript
const SaaSLaunchConfig = {
  billing: {
    yearlyDiscountPercent: 20,
    currencySymbol: "$"
  },
  plans: {
    starter: { monthlyPrice: 0, yearlyMonthlyEquivalent: 0 },
    pro: { monthlyPrice: 19, yearlyMonthlyEquivalent: 15 },
    business: { monthlyPrice: 49, yearlyMonthlyEquivalent: 39 }
  }
};
```

---

## 📖 In-Depth Documentation
For detailed guidance on backend form connection, marketplace submission guidelines, and deploying to Vercel/Netlify/GitHub Pages, refer to **`docs/documentation.md`**.

---

## 📄 License
See **`LICENSE.txt`** for template licensing terms.
