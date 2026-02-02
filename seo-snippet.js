// Single-file SEO snippet (CONFIG + META_DATA + LD_DATA + runtime)

(function () {
  "use strict";


  const CONFIG = {
    baseUrlFallback: "https://www.tppetgoods.com",
    googleSiteVerification: ""
  };

  // === DATA (from your previous meta-tags.js) ===
  const META_DATA = {"meta_tags_list":[{"page_url":"https://www.tppetgoods.com/","title_tag":"Dog Treats & PawPetBOX Subscription | Teddy's Paw Pet Goods","meta_description":"Try PawPetBOX monthly pet treat subscription from Teddy's Paw Pet Goods — baked treats, dog toys, clothing and specialty pet items delivered monthly. Shop pet supplies now."},{"page_url":"https://www.tppetgoods.com/pawpetbox-subscription","title_tag":"PawPetBOX Subscription & Monthly Pet Treats | Teddy's Paw","meta_description":"Subscribe to PawPetBOX monthly pet treat subscription — curated dog treats, baked treats, pet training toys and specialty pet items from Teddy's Paw Pet Goods."},{"page_url":"https://www.tppetgoods.com/dogs","title_tag":"Dog Toys & Clothing | Teddy's Paw Pet Goods","meta_description":"Shop dog toys, dog clothing, grooming supplies and specialty pet items at Teddy's Paw Pet Goods. Find pet treats and training toys for happy, healthy dogs."},{"page_url":"https://www.tppetgoods.com/baked-treats","title_tag":"Baked Treats & Pet Treats | Teddy's Paw Pet Goods","meta_description":"Delicious baked treats and pet treats from Teddy's Paw Pet Goods. Shop cupcakes, bites and specialty dog treats — perfect for gifts or everyday rewards."},{"page_url":"https://www.tppetgoods.com/product-page/easter-pack","title_tag":"Easter Pack Dog Treats | Teddy's Paw Pet Goods","meta_description":"Easter Pack — baked dog treats with whole wheat, oats & yogurt icing from Teddy's Paw Pet Goods. A tasty gift pack for dogs and pet lovers."},{"page_url":"https://www.tppetgoods.com/contact","title_tag":"Contact Pet Supplies & PawPetBOX | Teddy's Paw Pet Goods","meta_description":"Get in touch with Teddy's Paw Pet Goods for orders, PawPetBOX subscriptions, pet supplies, or dog grooming questions. We're happy to help with pet needs."},{"page_url":"https://www.tppetgoods.com/about","title_tag":"Pet Supplies & Dog Treats | Teddy's Paw Pet Goods","meta_description":"Teddy's Paw Pet Goods offers pet supplies, dog treats, grooming services and our PawPetBOX pet treat subscription — quality and integrity since 2021."},{"page_url":"https://www.tppetgoods.com/product-page/pawpetbox","title_tag":"PawPetBOX Luxury Pet Treats | Teddy's Paw Pet Goods","meta_description":"Luxury PawPetBOX pet treat subscription — curated dog treats, training toys and specialty pet items delivered monthly by Teddy's Paw Pet Goods."}],"keywords":["dog treats","pawpetbox subscription","pet treats","dog toys","pet supplies","baked treats","dog clothing","pet training toys","specialty pet items","teddy's paw pet goods","monthly pet treat subscription","pet treat subscription","dog grooming"]};

  // === DATA (from your previous LD.js) ===
  const LD_DATA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.tppetgoods.com/#organization",
  "name": "Teddy's Paw Pet Goods, LLC",
  "legalName": "Teddy's Paw Pet Goods, LLC",
  "url": "https://www.tppetgoods.com/",
  "logo": "https://static.wixstatic.com/media/3f52e0_876bd106226c4940a2ab5bec5aa73513~mv2.jpg/v1/fill/w_2500,h_1223,al_c/3f52e0_876bd106226c4940a2ab5bec5aa73513~mv2.jpg",
  "description": "Teddy's Paw Pet Goods, LLC provides high quality pet foods, innovative pet goods, grooming services, and our PawPetBOX pet treat subscription services at competitive prices while conducting business with integrity and respect.",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "PawPetBOX & Featured Products",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "PawPetBOX - Large",
          "url": "https://www.tppetgoods.com/product-page/pawpetbox",
          "description": "Each month’s PawPetBOX includes a selection of pet treats and a specialty items (clothing, training toy, etc.)."
        },
        "price": "39.99",
        "priceCurrency": "USD",
        "url": "https://www.tppetgoods.com/product-page/pawpetbox"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Easter Pack",
          "url": "https://www.tppetgoods.com/product-page/easter-pack",
          "description": "Dog treat pack. Ingredients: Whole wheat flour, oats, canola oil, honey, yogurt icing. Guaranteed Analysis: Crude Protein: min. 10.98% Crude Fat: min. 9.74% Crude Fiber: max 3.29% Moisture: max 10.02%."
        },
        "price": "9.99",
        "priceCurrency": "USD",
        "url": "https://www.tppetgoods.com/product-page/easter-pack"
      }
    ]
  }
};

  /* ===== Helpers ===== */
  function clamp(str, max) {
    if (typeof str !== "string") str = String(str ?? "");
    return str.length <= max ? str : str.slice(0, Math.max(0, max - 1)) + "…";
  }

  function stripTrailingSlash(p) {
    if (!p) return "/";
    return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
  }

  function normalizePathFromUrl(url) {
    try {
      const u = new URL(url);
      return stripTrailingSlash(u.pathname || "/");
    } catch {
      const m = String(url || "").match(/^https?:\/\/[^/]+(\/[^?#]*)?/i);
      return stripTrailingSlash((m && m[1]) || "/");
    }
  }

  function removeLangPrefix(pathname) {
    const m = String(pathname || "/").match(
      /^\/([a-z]{2}(?:-[A-Z]{2})?)(?=\/|$)(.*)$/
    );
    if (!m) return pathname || "/";
    const rest = stripTrailingSlash(m[2] || "/");
    return rest || "/";
  }

  function currentPagePath() {
    const path = window.location.pathname || "/";
    return stripTrailingSlash(path || "/");
  }

  function currentKeyCandidates() {
    const path = currentPagePath();
    const origin = (window.location.origin || "").replace(/\/$/, "");
    const full = origin + path;

    if (path === "/") {
      return [full, "/"];
    }

    const noLang = removeLangPrefix(path);
    return [full, path, stripTrailingSlash(path), noLang, stripTrailingSlash(noLang)];
  }

  function buildIndex(metaJson) {
    const list = (metaJson && metaJson.meta_tags_list) || [];
    const index = {};
    for (const item of list) {
      const path = normalizePathFromUrl(item.page_url);
      let origin = "";
      try {
        origin = new URL(item.page_url).origin;
      } catch {
        origin = "";
      }
      const full = origin ? origin.replace(/\/$/, "") + path : "";

      const entry = {
        title: item.title_tag || "",
        description: item.meta_description || "",
      };

      index[path] = entry;
      index[stripTrailingSlash(path)] = entry;
      if (full) index[full] = entry;
    }
    return index;
  }

  function _stripQuotes(s) {
    return String(s ?? "")
      .replace(/["'“”‘’„«»]/g, "")
      .replace(/\s+/g, " ")
      .replace(/^[\s\-–—·,;:]+|[\s\-–—·,;:]+$/g, "")
      .trim();
  }

  function normalizeKeywordsList(input, opts) {
    const { maxKeywords = 20 } = opts || {};
    if (input == null) return [];
    let items = Array.isArray(input)
      ? input.slice()
      : typeof input === "string"
      ? input.split(",")
      : [];
    const seen = new Set();
    return items
      .map(_stripQuotes)
      .filter((s) => s && s.length >= 2)
      .filter((s) => {
        const k = s.toLowerCase();
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      })
      .slice(0, maxKeywords);
  }

  function normalizeKeywords(input, opts) {
    const { maxKeywords = 20, maxLength = 280 } = opts || {};
    const list = normalizeKeywordsList(input, { maxKeywords });
    const content = list.join(", ");
    return content.length > maxLength ? content.slice(0, maxLength) : content;
  }

  function applyAltFallbacks(keywordsPool) {
    if (!Array.isArray(keywordsPool) || keywordsPool.length === 0) return;
    try {
      const images = Array.from(document.querySelectorAll("img"));
      let i = 0;
      images.forEach((img) => {
        const curAlt = (img.getAttribute("alt") || "").trim().toLowerCase();
        const shouldReplace =
          !curAlt ||
          curAlt.endsWith(".jpg") ||
          curAlt.endsWith(".png") ||
          curAlt === "image" ||
          curAlt === "img";
        if (shouldReplace) {
          img.setAttribute("alt", keywordsPool[i % keywordsPool.length]);
          i++;
        }
      });
    } catch {
      /* ignore */
    }
  }

  function optimizeImages() {
    try {
      const images = Array.from(document.querySelectorAll("img"));
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              io.unobserve(img);
              // hook for tracking / lazy work if needed
            }
          });
        });
        images.forEach((img, index) => {
          if (index > 0) io.observe(img);
        });
      }
    } catch (err) {
      console.error("Image optimization error:", err);
    }
  }

  function upsertMeta(nameOrProperty, content, useProperty) {
    const selector = useProperty
      ? `meta[property="${nameOrProperty}"]`
      : `meta[name="${nameOrProperty}"]`;
    let el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      if (useProperty) el.setAttribute("property", nameOrProperty);
      else el.setAttribute("name", nameOrProperty);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }

  function upsertLink(rel, href) {
    let link = document.head.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", rel);
      document.head.appendChild(link);
    }
    link.setAttribute("href", href);
  }

  function injectJsonLd(ldObject) {
    if (!ldObject) return;
    try {
      const existing = Array.from(
        document.head.querySelectorAll('script[type="application/ld+json"]')
      );
      existing.forEach((el) => {
        el.parentNode.removeChild(el);
      });

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(ldObject);
      document.head.appendChild(script);
    } catch (err) {
      console.error("Error injecting JSON-LD:", err);
    }
  }

  function applyJsonLd() {
    injectJsonLd(LD_DATA);
  }

  function applySeoFromJson() {
    try {
      const metaJson = META_DATA;
      const index = buildIndex(metaJson);

      const path = currentPagePath();
      const isHome = path === "/";

      const fallbackBase =
        (CONFIG && CONFIG.baseUrlFallback) ? CONFIG.baseUrlFallback : "";
      const baseUrl = (window.location.origin || fallbackBase).replace(/\/$/, "");
      const canonicalUrl = baseUrl + path;

      const keys = currentKeyCandidates();
      let entry = null;
      for (const k of keys) {
        if (index[k]) {
          entry = index[k];
          break;
        }
      }

      if (!entry) {
        return normalizeKeywordsList(metaJson.keywords, { maxKeywords: 25 });
      }

      const title = clamp(entry.title, 60);
      const desc = clamp(entry.description, 185);

      document.title = title;

      const metaList = [
        { type: "name", key: "description", content: desc },
        { type: "property", key: "og:url", content: canonicalUrl },
        { type: "name", key: "resource-hints", content: "preload" },
        { type: "name", key: "format-detection", content: "telephone=yes" },
        { type: "name", key: "mobile-web-app-capable", content: "yes" },
        { type: "name", key: "apple-mobile-web-app-capable", content: "yes" },
      ];

      // opcjonalnie dodaj google-site-verification, jeśli jest w CONFIG
      if (CONFIG && CONFIG.googleSiteVerification) {
        metaList.push({
          type: "name",
          key: "google-site-verification",
          content: CONFIG.googleSiteVerification
        });
      }

      if (isHome && metaJson && metaJson.keywords) {
        const kwContent = normalizeKeywords(metaJson.keywords, {
          maxKeywords: 25,
          maxLength: 512,
        });
        if (kwContent) {
          metaList.push({ type: "name", key: "keywords", content: kwContent });
        }
      }

      metaList.forEach((m) => {
        upsertMeta(m.key, m.content, m.type === "property");
      });

      upsertLink("canonical", canonicalUrl);

      return normalizeKeywordsList(metaJson.keywords, { maxKeywords: 25 });
    } catch (err) {
      console.error("Error meta settings:", err);
      return [];
    }
  }

  function initSnippetSEO() {
    const keywordsPool = applySeoFromJson();
    const path = currentPagePath();
    if (path === "/") {
      applyJsonLd();
    }
    optimizeImages();
    applyAltFallbacks(keywordsPool);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSnippetSEO);
  } else {
    initSnippetSEO();
  }
})();
