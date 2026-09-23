/**
 * SaaS Launch — Premium SaaS Landing Page Template
 * Vanilla JavaScript interactions & Centralized Configuration
 */

import { translations, getTranslation } from "./translations.js";

// Global Theme & Language state
let currentTheme = "light";
let currentLang = "en";

// -----------------------------------------------------------------------------
// 1. Centralized Template Configuration Object
// -----------------------------------------------------------------------------
const SaaSLaunchConfig = {
  brand: {
    name: "SaaS Launch",
    tagline: "Launch Your Next Big Idea, Faster.",
    logoText: "SaaS Launch"
  },
  billing: {
    yearlyDiscountPercent: 20,
    currencySymbol: "$",
    defaultBillingCycle: "monthly" // 'monthly' | 'yearly'
  },
  plans: {
    starter: {
      name: "Starter",
      monthlyPrice: 0,
      yearlyMonthlyEquivalent: 0,
      billedYearlyTotal: 0,
      description: "For small teams and individual creators getting started.",
      ctaText: "Get Started Free"
    },
    pro: {
      name: "Pro",
      monthlyPrice: 19,
      // 20% discount on 19 is ~$15.20/mo ($182/year)
      yearlyMonthlyEquivalent: 15,
      billedYearlyTotal: 180,
      description: "For scaling teams and growing digital companies.",
      ctaText: "Start Pro Trial"
    },
    business: {
      name: "Business",
      monthlyPrice: 49,
      // 20% discount on 49 is ~$39/mo ($468/year)
      yearlyMonthlyEquivalent: 39,
      billedYearlyTotal: 468,
      description: "For established organizations requiring enterprise power.",
      ctaText: "Choose Business"
    }
  },
  faq: {
    allowMultipleOpen: false
  }
};

// -----------------------------------------------------------------------------
// 2. DOM Ready Initializer
// -----------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initLanguageToggle();
  initAnnouncementBar();
  initStickyHeader();
  initMobileNavigation();
  initSmoothScroll();
  initPricingToggle();
  initFaqAccordion();
  initSignupModal();
  initContactForm();
  initBackToTop();
  initScrollReveal();
  initCurrentYear();
  initDashboardTabs();
});

// -----------------------------------------------------------------------------
// Theme Switching (Dark & Light Mode)
// -----------------------------------------------------------------------------
function initThemeToggle() {
  const themeBtns = [
    document.getElementById("theme-toggle-btn"),
    document.getElementById("theme-toggle-btn-mobile")
  ].filter(Boolean);

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem("saas_theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  currentTheme = savedTheme ? savedTheme : (prefersDark ? "dark" : "light");

  const applyTheme = (theme) => {
    currentTheme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("saas_theme", theme);

    themeBtns.forEach(btn => {
      const isDark = theme === "dark";
      btn.setAttribute("aria-pressed", isDark ? "true" : "false");
      btn.setAttribute("title", isDark ? "Switch to light theme" : "Switch to dark theme");
    });
  };

  applyTheme(currentTheme);

  themeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
    });
  });

  // Listen to system theme changes if user has not set a preference
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem("saas_theme")) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });
  }
}

// -----------------------------------------------------------------------------
// Language Switching (English & Arabic RTL/LTR)
// -----------------------------------------------------------------------------
function initLanguageToggle() {
  const langBtns = [
    document.getElementById("lang-toggle-btn"),
    document.getElementById("lang-toggle-btn-mobile")
  ].filter(Boolean);

  const langLabels = [
    document.getElementById("lang-current-label"),
    document.getElementById("lang-current-label-mobile")
  ].filter(Boolean);

  // Check saved language or browser preference
  const savedLang = localStorage.getItem("saas_lang");
  currentLang = savedLang ? savedLang : (navigator.language && navigator.language.startsWith("ar") ? "ar" : "en");

  const applyLanguage = (lang) => {
    currentLang = lang;
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem("saas_lang", lang);

    if (lang === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
      langLabels.forEach(el => el.textContent = "EN");
      langBtns.forEach(btn => btn.setAttribute("aria-label", "Switch language to English"));
    } else {
      document.documentElement.removeAttribute("dir");
      langLabels.forEach(el => el.textContent = "عربي");
      langBtns.forEach(btn => btn.setAttribute("aria-label", "Switch language to Arabic"));
    }

    // Update all text nodes with data-i18n
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const translation = getTranslation(lang, key);
      if (translation !== null && translation !== undefined) {
        el.textContent = translation;
      }
    });

    // Update input placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const pKey = el.getAttribute("data-i18n-placeholder");
      const translation = getTranslation(lang, pKey);
      if (translation) {
        el.setAttribute("placeholder", translation);
      }
    });

    // Update aria labels
    document.querySelectorAll("[data-i18n-aria]").forEach(el => {
      const aKey = el.getAttribute("data-i18n-aria");
      const translation = getTranslation(lang, aKey);
      if (translation) {
        el.setAttribute("aria-label", translation);
      }
    });

    // Update page meta
    const pageTitle = getTranslation(lang, "pageTitle");
    if (pageTitle) document.title = pageTitle;

    const pageDesc = getTranslation(lang, "pageDescription");
    if (pageDesc) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", pageDesc);
    }

    // Notify other components about language switch
    document.dispatchEvent(new CustomEvent("languagechange", { detail: { lang } }));
  };

  applyLanguage(currentLang);

  langBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const nextLang = currentLang === "en" ? "ar" : "en";
      applyLanguage(nextLang);
    });
  });
}

// -----------------------------------------------------------------------------
// 3. Announcement Bar
// -----------------------------------------------------------------------------
function initAnnouncementBar() {
  const bar = document.getElementById("announcement-bar");
  const dismissBtn = document.getElementById("announcement-dismiss");
  if (!bar || !dismissBtn) return;

  // Check if previously dismissed in this session
  if (sessionStorage.getItem("saas_announcement_dismissed") === "true") {
    bar.classList.add("is-hidden");
    return;
  }

  dismissBtn.addEventListener("click", () => {
    bar.classList.add("is-hidden");
    sessionStorage.setItem("saas_announcement_dismissed", "true");
  });
}

// -----------------------------------------------------------------------------
// 4. Sticky Header with Scroll Detection
// -----------------------------------------------------------------------------
function initStickyHeader() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // initial check
}

// -----------------------------------------------------------------------------
// 5. Mobile Navigation Drawer & Hamburger
// -----------------------------------------------------------------------------
function initMobileNavigation() {
  const toggleBtn = document.getElementById("mobile-nav-toggle");
  const drawer = document.getElementById("mobile-drawer");
  if (!toggleBtn || !drawer) return;

  const closeMenu = () => {
    toggleBtn.setAttribute("aria-expanded", "false");
    drawer.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  const openMenu = () => {
    toggleBtn.setAttribute("aria-expanded", "true");
    drawer.classList.add("is-open");
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  toggleBtn.addEventListener("click", () => {
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when clicking any nav link in the drawer
  const drawerLinks = drawer.querySelectorAll("a, button");
  drawerLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Close on Escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) {
      closeMenu();
    }
  });

  // Close on screen resize to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && drawer.classList.contains("is-open")) {
      closeMenu();
    }
  });
}

// -----------------------------------------------------------------------------
// 6. Smooth Scrolling for Internal Links
// -----------------------------------------------------------------------------
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
}

// -----------------------------------------------------------------------------
// 7. Pricing Toggle (Monthly vs Yearly with Dynamic Calculations)
// -----------------------------------------------------------------------------
function initPricingToggle() {
  const toggleSwitch = document.getElementById("pricing-toggle");
  const labelMonthly = document.getElementById("toggle-label-monthly");
  const labelYearly = document.getElementById("toggle-label-yearly");
  if (!toggleSwitch) return;

  let currentCycle = SaaSLaunchConfig.billing.defaultBillingCycle; // 'monthly' | 'yearly'

  const updatePricingCards = (cycle) => {
    const isYearly = cycle === "yearly";
    toggleSwitch.setAttribute("aria-checked", isYearly ? "true" : "false");

    if (labelMonthly && labelYearly) {
      labelMonthly.classList.toggle("is-active", !isYearly);
      labelYearly.classList.toggle("is-active", isYearly);
    }

    const isAr = currentLang === "ar";
    const periodText = isAr ? "/شهر" : "/mo";

    // Update Starter
    const starterPrice = document.getElementById("price-starter");
    const starterPeriod = document.getElementById("period-starter");
    const starterBilled = document.getElementById("billed-starter");
    if (starterPrice && starterPeriod) {
      starterPrice.textContent = "0";
      starterPeriod.textContent = periodText;
      if (starterBilled) {
        starterBilled.textContent = isAr ? "مجاني دائماً للفرق الصغيرة" : "Free forever for small teams";
      }
    }

    // Update Pro
    const proPrice = document.getElementById("price-pro");
    const proPeriod = document.getElementById("period-pro");
    const proBilled = document.getElementById("billed-pro");
    if (proPrice && proPeriod) {
      if (isYearly) {
        proPrice.textContent = String(SaaSLaunchConfig.plans.pro.yearlyMonthlyEquivalent);
        proPeriod.textContent = periodText;
        if (proBilled) {
          proBilled.textContent = isAr 
            ? `فاتورة سنوية (${SaaSLaunchConfig.plans.pro.billedYearlyTotal}$/سنة)` 
            : `Billed annually ($${SaaSLaunchConfig.plans.pro.billedYearlyTotal}/yr)`;
        }
      } else {
        proPrice.textContent = String(SaaSLaunchConfig.plans.pro.monthlyPrice);
        proPeriod.textContent = periodText;
        if (proBilled) {
          proBilled.textContent = isAr 
            ? "فاتورة شهرية، يمكنك الإلغاء في أي وقت" 
            : "Billed monthly, cancel anytime";
        }
      }
    }

    // Update Business
    const bizPrice = document.getElementById("price-business");
    const bizPeriod = document.getElementById("period-business");
    const bizBilled = document.getElementById("billed-business");
    if (bizPrice && bizPeriod) {
      if (isYearly) {
        bizPrice.textContent = String(SaaSLaunchConfig.plans.business.yearlyMonthlyEquivalent);
        bizPeriod.textContent = periodText;
        if (bizBilled) {
          bizBilled.textContent = isAr 
            ? `فاتورة سنوية (${SaaSLaunchConfig.plans.business.billedYearlyTotal}$/سنة)` 
            : `Billed annually ($${SaaSLaunchConfig.plans.business.billedYearlyTotal}/yr)`;
        }
      } else {
        bizPrice.textContent = String(SaaSLaunchConfig.plans.business.monthlyPrice);
        bizPeriod.textContent = periodText;
        if (bizBilled) {
          bizBilled.textContent = isAr 
            ? "فاتورة شهرية، يمكنك الإلغاء في أي وقت" 
            : "Billed monthly, cancel anytime";
        }
      }
    }
  };

  toggleSwitch.addEventListener("click", () => {
    currentCycle = currentCycle === "monthly" ? "yearly" : "monthly";
    updatePricingCards(currentCycle);
  });

  // Support click on labels
  if (labelMonthly) {
    labelMonthly.addEventListener("click", () => {
      currentCycle = "monthly";
      updatePricingCards(currentCycle);
    });
  }

  if (labelYearly) {
    labelYearly.addEventListener("click", () => {
      currentCycle = "yearly";
      updatePricingCards(currentCycle);
    });
  }

  // Keyboard accessibility for toggle
  toggleSwitch.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      currentCycle = currentCycle === "monthly" ? "yearly" : "monthly";
      updatePricingCards(currentCycle);
    }
  });

  // Re-render when language changes
  document.addEventListener("languagechange", () => {
    updatePricingCards(currentCycle);
  });

  // Initial render
  updatePricingCards(currentCycle);
}

// -----------------------------------------------------------------------------
// 8. Accessible FAQ Accordion
// -----------------------------------------------------------------------------
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question-btn");
    const answerPanel = item.querySelector(".faq-answer-panel");
    if (!questionBtn || !answerPanel) return;

    questionBtn.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      // Single-open behavior
      if (!SaaSLaunchConfig.faq.allowMultipleOpen && !isOpen) {
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains("is-open")) {
            otherItem.classList.remove("is-open");
            const otherBtn = otherItem.querySelector(".faq-question-btn");
            const otherPanel = otherItem.querySelector(".faq-answer-panel");
            if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
            if (otherPanel) otherPanel.style.maxHeight = "0";
          }
        });
      }

      if (isOpen) {
        item.classList.remove("is-open");
        questionBtn.setAttribute("aria-expanded", "false");
        answerPanel.style.maxHeight = "0";
      } else {
        item.classList.add("is-open");
        questionBtn.setAttribute("aria-expanded", "true");
        answerPanel.style.maxHeight = answerPanel.scrollHeight + "px";
      }
    });
  });
}

// -----------------------------------------------------------------------------
// 9. Interactive Signup & Demo Modal
// -----------------------------------------------------------------------------
function initSignupModal() {
  const backdrop = document.getElementById("signup-modal-backdrop");
  const closeBtn = document.getElementById("modal-close-btn");
  const form = document.getElementById("modal-signup-form");
  const successView = document.getElementById("modal-success-view");
  const successDismissBtn = document.getElementById("modal-success-dismiss");
  const planTabs = document.querySelectorAll(".plan-tab-btn");
  const selectedPlanInput = document.getElementById("signup-plan-selected");
  const modalTitle = document.getElementById("modal-title");

  if (!backdrop) return;

  let chosenPlan = "pro";

  const openModal = (preselectedPlan = "pro") => {
    chosenPlan = preselectedPlan.toLowerCase();
    if (selectedPlanInput) selectedPlanInput.value = chosenPlan;

    // Update active tab button
    planTabs.forEach(btn => {
      const p = btn.getAttribute("data-plan");
      btn.classList.toggle("is-active", p === chosenPlan);
    });

    if (modalTitle) {
      if (chosenPlan === "starter") {
        modalTitle.textContent = currentLang === "ar" ? "ابدأ حسابك المجاني" : "Start Your Free Account";
      } else {
        modalTitle.textContent = currentLang === "ar"
          ? `ابدأ تجربتك المجانية لخطة ${chosenPlan.toUpperCase()}`
          : `Start Your ${chosenPlan.toUpperCase()} Trial`;
      }
    }

    // Reset view
    if (form) {
      form.style.display = "flex";
      form.reset();
      clearFormErrors(form);
    }
    if (successView) {
      successView.classList.remove("is-visible");
    }

    backdrop.classList.add("is-open");
    document.body.style.overflow = "hidden";

    // Focus first input
    const firstInput = backdrop.querySelector("input:not([type=hidden])");
    if (firstInput) setTimeout(() => firstInput.focus(), 100);
  };

  const closeModal = () => {
    backdrop.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  // Attach open triggers to all signup/pricing CTA buttons
  document.querySelectorAll("[data-open-signup]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const plan = btn.getAttribute("data-plan") || "pro";
      openModal(plan);
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (successDismissBtn) successDismissBtn.addEventListener("click", closeModal);

  // Close on backdrop click (outside dialog)
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) {
      closeModal();
    }
  });

  // Close on Escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && backdrop.classList.contains("is-open")) {
      closeModal();
    }
  });

  // Tab buttons to switch plan in modal
  planTabs.forEach(btn => {
    btn.addEventListener("click", () => {
      const p = btn.getAttribute("data-plan");
      openModal(p);
    });
  });

  // Modal form submission with validation
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      clearFormErrors(form);

      const nameInput = form.querySelector("#signup-name");
      const emailInput = form.querySelector("#signup-email");
      const passInput = form.querySelector("#signup-password");

      let isValid = true;
      const isAr = currentLang === "ar";

      if (!nameInput.value.trim()) {
        showInputError(nameInput, isAr ? "الاسم الكامل مطلوب" : "Full name is required");
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        showInputError(emailInput, isAr ? "يرجى إدخال عنوان بريد إلكتروني صالح" : "Please enter a valid email address");
        isValid = false;
      }

      if (passInput && passInput.value.length < 6) {
        showInputError(passInput, isAr ? "يجب ألا تقل كلمة المرور عن 6 أحرف" : "Password must be at least 6 characters");
        isValid = false;
      }

      if (isValid) {
        // Show demo success
        form.style.display = "none";
        if (successView) {
          successView.classList.add("is-visible");
          const planSummary = document.getElementById("modal-success-plan-name");
          if (planSummary) {
            planSummary.textContent = chosenPlan.toUpperCase();
          }
        }
      }
    });
  }
}

// -----------------------------------------------------------------------------
// 10. Contact Form Validation & Demo Feedback
// -----------------------------------------------------------------------------
function initContactForm() {
  const form = document.getElementById("contact-form");
  const successBanner = document.getElementById("contact-success-banner");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearFormErrors(form);

    const nameInput = form.querySelector("#contact-name");
    const emailInput = form.querySelector("#contact-email");
    const subjectInput = form.querySelector("#contact-subject");
    const messageInput = form.querySelector("#contact-message");

    let isValid = true;
    const isAr = currentLang === "ar";

    if (!nameInput.value.trim()) {
      showInputError(nameInput, isAr ? "يرجى إدخال اسمك الكامل" : "Please enter your name");
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      showInputError(emailInput, isAr ? "يرجى إدخال عنوان بريد إلكتروني صالح للعمل" : "Please enter a valid work email");
      isValid = false;
    }

    if (!subjectInput.value.trim()) {
      showInputError(subjectInput, isAr ? "حقل الموضوع مطلوب" : "Subject is required");
      isValid = false;
    }

    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      showInputError(messageInput, isAr ? "يجب ألا تقل الرسالة عن 10 أحرف" : "Message must be at least 10 characters");
      isValid = false;
    }

    if (isValid) {
      form.reset();
      if (successBanner) {
        successBanner.classList.add("is-visible");
        successBanner.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  });
}

// Helper: Show input error
function showInputError(inputEl, message) {
  if (!inputEl) return;
  inputEl.classList.add("is-invalid");
  const errorSpan = inputEl.parentElement.querySelector(".form-error-msg");
  if (errorSpan) {
    errorSpan.textContent = message;
    errorSpan.style.display = "block";
  }
}

// Helper: Clear errors
function clearFormErrors(form) {
  form.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));
  form.querySelectorAll(".form-error-msg").forEach(span => {
    span.textContent = "";
    span.style.display = "none";
  });
}

// -----------------------------------------------------------------------------
// 11. Back to Top Button
// -----------------------------------------------------------------------------
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 350) {
      btn.classList.add("is-visible");
    } else {
      btn.classList.remove("is-visible");
    }
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// -----------------------------------------------------------------------------
// 12. Scroll Reveal Animations (IntersectionObserver with Reduced Motion check)
// -----------------------------------------------------------------------------
function initScrollReveal() {
  // Check if reduced motion is preferred
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length || !("IntersectionObserver" in window)) {
    revealElements.forEach(el => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => observer.observe(el));
}

// -----------------------------------------------------------------------------
// 13. Dynamic Current Year in Footer
// -----------------------------------------------------------------------------
function initCurrentYear() {
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// -----------------------------------------------------------------------------
// 14. Interactive Dashboard Mockup (Overview, Analytics, Workflows, Team, Settings)
// -----------------------------------------------------------------------------
function initDashboardTabs() {
  const tabButtons = document.querySelectorAll(".sidebar-icon-btn[data-dash-tab]");
  const viewPanels = document.querySelectorAll(".dash-view");
  const searchText = document.getElementById("dash-search-text");
  const toastEl = document.getElementById("dash-mockup-toast");
  let toastTimer = null;

  if (!tabButtons.length || !viewPanels.length) return;

  // Search placeholders per tab
  const searchPlaceholders = {
    overview: {
      en: "Search projects, metrics, workflows...",
      ar: "بحث في المشاريع والمقاييس ومسارات العمل..."
    },
    analytics: {
      en: "Search metrics, API latency, telemetry logs...",
      ar: "بحث في المقاييس وزمن الاستجابة وسجلات الأخطاء..."
    },
    workflows: {
      en: "Search 4 active automated pipelines...",
      ar: "بحث في 4 مسارات عمل مؤتمتة نشطة..."
    },
    team: {
      en: "Search team members by name, role, or ID / number...",
      ar: "بحث في أعضاء الفريق بالاسم أو الدور أو الرقم / المعرف..."
    },
    settings: {
      en: "Search workspace preferences & API keys...",
      ar: "بحث في إعدادات مساحة العمل ومفاتيح API..."
    }
  };

  // Helper: In-mockup toast notification
  function showMockupToast(message) {
    if (!toastEl) return;
    if (toastTimer) clearTimeout(toastTimer);

    toastEl.textContent = message;
    toastEl.classList.add("is-visible");

    toastTimer = setTimeout(() => {
      toastEl.classList.remove("is-visible");
    }, 2800);
  }

  // Switch Tab Handler
  function switchDashboardTab(targetTab) {
    tabButtons.forEach(btn => {
      const isTarget = btn.getAttribute("data-dash-tab") === targetTab;
      btn.classList.toggle("is-active", isTarget);
      btn.setAttribute("aria-selected", isTarget ? "true" : "false");
    });

    viewPanels.forEach(panel => {
      const isTarget = panel.id === `dash-view-${targetTab}`;
      panel.classList.toggle("is-active", isTarget);
    });

    if (searchText && searchPlaceholders[targetTab]) {
      const lang = document.documentElement.getAttribute("lang") || "en";
      searchText.textContent = searchPlaceholders[targetTab][lang] || searchPlaceholders[targetTab].en;
    }
  }

  // Sidebar Tab Click Listeners
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-dash-tab");
      if (targetTab) {
        switchDashboardTab(targetTab);
      }
    });
  });

  // Quick switch from Overview to Analytics
  const quickSwitchBtn = document.getElementById("dash-quick-switch-act");
  if (quickSwitchBtn) {
    quickSwitchBtn.addEventListener("click", () => {
      switchDashboardTab("analytics");
    });
  }

  // Workflows: Toggle Switches & Run Test Actions
  const activeCounterEl = document.getElementById("wf-active-counter");
  const wfSwitches = document.querySelectorAll(".dash-wf-card .dash-switch");
  const wfRunBtns = document.querySelectorAll(".btn-run-wf");

  function updateActiveWfCount() {
    if (!activeCounterEl) return;
    const total = document.querySelectorAll(".dash-wf-card").length;
    const active = document.querySelectorAll(".dash-wf-card .dash-switch.is-checked").length;
    const isArabic = document.documentElement.getAttribute("lang") === "ar";
    activeCounterEl.textContent = isArabic ? `${active} من ${total} نشطة` : `${active} of ${total} Active`;
  }

  wfSwitches.forEach(sw => {
    sw.addEventListener("click", () => {
      const isChecked = sw.classList.toggle("is-checked");
      sw.setAttribute("aria-checked", isChecked ? "true" : "false");
      updateActiveWfCount();

      const card = sw.closest(".dash-wf-card");
      const titleEl = card ? card.querySelector(".dash-wf-title") : null;
      const name = titleEl ? titleEl.textContent.split("→")[0].trim() : "Workflow";

      const isArabic = document.documentElement.getAttribute("lang") === "ar";
      if (isChecked) {
        showMockupToast(isArabic ? `✓ تم تفعيل المسار: ${name}` : `✓ Enabled: ${name}`);
      } else {
        showMockupToast(isArabic ? `⏸ تم إيقاف المسار: ${name}` : `⏸ Paused: ${name}`);
      }
    });
  });

  wfRunBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const wfName = btn.getAttribute("data-wf-name") || "Pipeline";
      const isArabic = document.documentElement.getAttribute("lang") === "ar";
      const originalText = btn.innerHTML;

      btn.classList.add("is-running");
      btn.innerHTML = `<span>⏳</span> <span>${isArabic ? "جارِ الفحص..." : "Running..."}</span>`;

      setTimeout(() => {
        btn.classList.remove("is-running");
        btn.classList.add("is-success");
        btn.innerHTML = `<span>✓</span> <span>${isArabic ? "تم بنجاح (0.3 ث)" : "Success (0.3s)"}</span>`;

        showMockupToast(isArabic ? `⚡ تم تنفيذ مسار [${wfName}] بنجاح في 310ms!` : `⚡ [${wfName}] pipeline executed successfully in 310ms!`);

        setTimeout(() => {
          btn.classList.remove("is-success");
          btn.innerHTML = originalText;
        }, 2400);
      }, 650);
    });
  });

  // "+ New Workflow" button
  const newWfBtn = document.getElementById("btn-new-workflow");
  if (newWfBtn) {
    newWfBtn.addEventListener("click", () => {
      const isArabic = document.documentElement.getAttribute("lang") === "ar";
      showMockupToast(isArabic ? "⚡ محرر مسارات العمل: اختر المشغلات والإجراءات" : "⚡ Workflow Builder: Select triggers and actions");
    });
  }

  // Team: Real-time Member Search Filtering (Supports Name, Role, Member ID, Index/Number, Phone)
  const teamSearchInput = document.getElementById("team-search-input");
  const teamListContainer = document.getElementById("dash-team-list-container");
  const teamEmptyState = document.getElementById("team-empty-search");
  const clearTeamSearchBtn = document.getElementById("btn-clear-team-search");

  // Helper: Normalize Arabic-Indic and Eastern digits to standard 0-9 digits and trim
  function normalizeSearchString(val) {
    if (!val) return "";
    const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    let s = String(val);
    for (let i = 0; i < 10; i++) {
      s = s.split(arabicDigits[i]).join(String(i));
      s = s.split(farsiDigits[i]).join(String(i));
    }
    return s.toLowerCase().trim();
  }

  function filterTeamList(rawQuery) {
    if (!teamListContainer) return;
    const normalized = normalizeSearchString(rawQuery);
    // Strip leading hash, number signs or whitespace (e.g., "#101" -> "101", "#1" -> "1")
    const cleanNumQuery = normalized.replace(/^[#№]\s*/, "");
    const rows = teamListContainer.querySelectorAll(".dash-team-row");
    let matchCount = 0;

    rows.forEach(row => {
      if (!normalized) {
        row.style.display = "flex";
        matchCount++;
        return;
      }

      const name = (row.getAttribute("data-name") || "").toLowerCase();
      const role = (row.getAttribute("data-role") || "").toLowerCase();
      const id = (row.getAttribute("data-id") || "").toLowerCase();
      const num = (row.getAttribute("data-number") || "").toLowerCase();
      const phone = (row.getAttribute("data-phone") || "").toLowerCase();
      const text = row.textContent.toLowerCase();

      // Check criteria:
      // 1. Name or role text match
      const nameOrRoleMatch = name.includes(normalized) || role.includes(normalized);
      // 2. Full-text content match
      const textMatch = text.includes(normalized);
      // 3. Member ID match (e.g. searching "101", "102", "#101", "01")
      const idMatch = id === cleanNumQuery || id.includes(cleanNumQuery) || (`#${id}`).includes(normalized);
      // 4. Member number / index match (e.g. searching "1", "2", "3", "#1")
      const numMatch = num === cleanNumQuery || (`#${num}`).includes(normalized) || (`0${num}`).includes(cleanNumQuery);
      // 5. Phone / contact digits match
      const phoneMatch = phone && phone.includes(cleanNumQuery);

      const isMatch = nameOrRoleMatch || textMatch || idMatch || numMatch || phoneMatch;

      row.style.display = isMatch ? "flex" : "none";
      if (isMatch) matchCount++;
    });

    if (teamEmptyState) {
      teamEmptyState.style.display = matchCount === 0 ? "flex" : "none";
    }
  }

  if (teamSearchInput) {
    teamSearchInput.addEventListener("input", (e) => {
      filterTeamList(e.target.value);
    });
  }

  if (clearTeamSearchBtn && teamSearchInput) {
    clearTeamSearchBtn.addEventListener("click", () => {
      teamSearchInput.value = "";
      filterTeamList("");
      teamSearchInput.focus();
    });
  }

  // Top window search bar click interaction
  const topSearchBar = document.querySelector(".window-search");
  if (topSearchBar) {
    topSearchBar.style.cursor = "pointer";
    topSearchBar.addEventListener("click", () => {
      const activeTab = document.querySelector(".sidebar-icon-btn.is-active[data-dash-tab]");
      const tabName = activeTab ? activeTab.getAttribute("data-dash-tab") : "overview";
      if (tabName === "team" && teamSearchInput) {
        teamSearchInput.focus();
        teamSearchInput.select();
      } else {
        switchDashboardTab("team");
        setTimeout(() => {
          if (teamSearchInput) {
            teamSearchInput.focus();
          }
        }, 150);
      }
    });
  }

  // Team: Invite Member
  const inviteBtn = document.getElementById("btn-team-invite");
  const inviteEmailInput = document.getElementById("team-invite-email");
  const onlineBadge = document.getElementById("team-online-badge");

  function handleInviteMember() {
    if (!inviteEmailInput) return;
    const email = inviteEmailInput.value.trim();
    const isArabic = document.documentElement.getAttribute("lang") === "ar";

    if (!email || !email.includes("@")) {
      inviteEmailInput.style.borderColor = "#ef4444";
      showMockupToast(isArabic ? "يرجى إدخال بريد إلكتروني صالح" : "Please enter a valid email address");
      setTimeout(() => {
        inviteEmailInput.style.borderColor = "";
      }, 1500);
      return;
    }

    const username = email.split("@")[0];
    const initials = username.substring(0, 2).toUpperCase();
    const currentRows = teamListContainer ? teamListContainer.querySelectorAll(".dash-team-row") : [];
    const nextNumber = currentRows.length + 1;
    const nextId = 100 + nextNumber;

    // Create new row
    const newRow = document.createElement("div");
    newRow.className = "dash-team-row";
    newRow.setAttribute("data-name", username.toLowerCase());
    newRow.setAttribute("data-role", "contributor member invited");
    newRow.setAttribute("data-id", String(nextId));
    newRow.setAttribute("data-number", String(nextNumber));
    newRow.setAttribute("data-phone", `0${nextId}`);
    newRow.style.animation = "dashFadeIn 0.2s ease-out";
    newRow.innerHTML = `
      <div class="dash-member-left">
        <div class="dash-member-avatar" style="background:#10b981;">
          ${initials}
          <span class="dash-avatar-dot" style="background:#f59e0b;"></span>
        </div>
        <div class="dash-member-info">
          <div style="display:flex; align-items:center; gap:0.35rem;">
            <span class="dash-member-name">${username}</span>
            <span class="dash-member-id" title="Member ID: #${nextId}">#${nextId}</span>
          </div>
          <span class="dash-member-role" style="font-size:0.68rem; color:var(--color-text-muted);">${email}</span>
        </div>
      </div>
      <div class="dash-member-right">
        <span class="activity-tag" style="background:#f1f5f9; color:#475569;">${isArabic ? "عضو" : "Member"}</span>
        <span class="activity-tag tag-pending">${isArabic ? "تمت الدعوة" : "Invited"}</span>
      </div>
    `;

    if (teamListContainer) {
      teamListContainer.prepend(newRow);
      // Re-apply filter if user currently has text in the search input
      if (teamSearchInput && teamSearchInput.value) {
        filterTeamList(teamSearchInput.value);
      }
    }

    inviteEmailInput.value = "";
    showMockupToast(isArabic ? `✉️ تم إرسال دعوة الانضمام إلى: ${email}` : `✉️ Invitation sent to: ${email}`);

    if (onlineBadge) {
      const currentCount = teamListContainer.querySelectorAll(".dash-team-row").length;
      onlineBadge.textContent = isArabic ? `${currentCount} أعضاء في الفريق` : `${currentCount} Team Members`;
    }
  }

  if (inviteBtn && inviteEmailInput) {
    inviteBtn.addEventListener("click", handleInviteMember);
    inviteEmailInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleInviteMember();
      }
    });
  }

  // Analytics & Activities: Category Filtering
  const filterPills = document.querySelectorAll(".dash-filter-pill[data-act-filter]");
  const activityStream = document.getElementById("dash-full-activity-stream");

  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("is-active"));
      pill.classList.add("is-active");

      const filter = pill.getAttribute("data-act-filter");
      if (!activityStream) return;

      const items = activityStream.querySelectorAll(".dash-act-item");
      items.forEach(item => {
        const cat = item.getAttribute("data-category");
        const show = filter === "all" || cat === filter;
        item.style.display = show ? "flex" : "none";
      });
    });
  });

  // Analytics & Activities: Simulate Live Event
  const simulateBtn = document.getElementById("btn-simulate-activity");
  const simulatedEvents = [
    { title: "Stripe Webhook: invoice.payment_succeeded ($19.00)", desc: "Customer acct_892 renewed Pro Plan", cat: "deploys", tag: "Live", tagClass: "tag-success" },
    { title: "Automated Redis cache invalidation across 24 edge nodes", desc: "Sync latency 12ms &middot; 0 drops", cat: "sync", tag: "Synced", tagClass: "tag-success" },
    { title: "DDoS Mitigation rule challenged 420 requests", desc: "Edge firewall blocked abusive ASN", cat: "alerts", tag: "Mitigated", tagClass: "tag-pending" },
    { title: "Database read replica sync health check verified", desc: "Replication lag 0ms across London & Frankfurt", cat: "alerts", tag: "Verified", tagClass: "tag-active" }
  ];
  let simIndex = 0;

  if (simulateBtn && activityStream) {
    simulateBtn.addEventListener("click", () => {
      const ev = simulatedEvents[simIndex % simulatedEvents.length];
      simIndex++;
      const isArabic = document.documentElement.getAttribute("lang") === "ar";

      const newActRow = document.createElement("div");
      newActRow.className = "activity-row dash-act-item";
      newActRow.setAttribute("data-category", ev.cat);
      newActRow.style.animation = "dashFadeIn 0.24s cubic-bezier(0.16, 1, 0.3, 1)";
      newActRow.style.borderColor = "var(--color-primary)";
      newActRow.innerHTML = `
        <div class="activity-left">
          <span class="activity-icon" style="background:#ede9fe; color:#6d28d9;">⚡</span>
          <div>
            <div class="activity-name">${ev.title}</div>
            <div style="font-size:0.65rem; color:var(--color-text-muted);">${ev.desc}</div>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:var(--space-2);">
          <span class="activity-tag ${ev.tagClass}">${ev.tag}</span>
          <span style="font-size:0.65rem; color:var(--color-text-muted);">${isArabic ? "الآن" : "Just now"}</span>
        </div>
      `;

      activityStream.prepend(newActRow);
      showMockupToast(isArabic ? "⚡ تم تسجيل نشاط جديد في البث المباشر" : "⚡ New event recorded in live telemetry stream");
    });
  }

  // Settings: Copy API Key
  const copyKeyBtn = document.getElementById("btn-copy-api-key");
  const copyKeyText = document.getElementById("copy-key-text");

  if (copyKeyBtn) {
    copyKeyBtn.addEventListener("click", () => {
      const apiKey = "sk_live_94f8a109ec27b39a73c2";
      const isArabic = document.documentElement.getAttribute("lang") === "ar";

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(apiKey).catch(() => {});
      }

      if (copyKeyText) {
        copyKeyText.textContent = isArabic ? "تم النسخ!" : "Copied!";
        setTimeout(() => {
          copyKeyText.textContent = isArabic ? "نسخ المفتاح" : "Copy Key";
        }, 2000);
      }

      showMockupToast(isArabic ? "✓ تم نسخ مفتاح API إلى الحافظة" : "✓ API key copied to clipboard");
    });
  }
}
