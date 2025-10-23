// src/components/Seo.jsx
import React from "react";

// --- CORE METADATA ---
const SITE_NAME = "Raushan Kumar — MERN Portfolio";
const DEFAULT_TITLE = "Raushan Kumar — MERN Stack Developer";
const DEFAULT_DESC = "Portfolio of Raushan Kumar, a MERN stack developer building fast, accessible, and responsive web applications.";
const DEFAULT_URL = "https://justgodigital.online/";
const DEFAULT_IMAGE = "https://justgodigital.online/og-image.png";
const OG_LOCALE = "en_US";


// --- SOCIAL PROFILES ---
const DEFAULT_TWITTER = "@raushankumar7273"; // Your Twitter/X handle
const GITHUB_URL = "https://github.com/raushan7273";
const LINKEDIN_URL = "https://www.linkedin.com/in/raushan-kumar-7273rk/";
const FACEBOOK_URL = "https://www.facebook.com/raushankumar.7273";
const INSTAGRAM_URL = "https://www.instagram.com/raushankumar.7273/";

// --- DEFAULT STRUCTURED DATA (JSON-LD) ---
// This tells Google about you and your social profiles.
const defaultJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Raushan Kumar",
  "url": DEFAULT_URL,
  "sameAs": [
    GITHUB_URL,
    LINKEDIN_URL,
    FACEBOOK_URL,
    INSTAGRAM_URL,
    `https://twitter.com/${DEFAULT_TWITTER.substring(1)}`, // Converts handle to URL
  ],
};

/**
 * Props:
 *  - title, description
 *  - canonicalUrl
 *  - image (absolute)
 *  - type: "website" | "article"
 *  - robots: "index,follow" | "noindex,nofollow" etc.
 *  - keywords?: string
 *  - prevUrl?: string (for pagination)
 *  - nextUrl?: string (for pagination)
 *  - hreflang?: { lang: string, href: string }[]  (optional)
 *  - jsonLd?: object | object[]   (structured data)
 */
export default function Seo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  canonicalUrl = DEFAULT_URL,
  image = DEFAULT_IMAGE,
  type = "website",
  robots = "index,follow",
  keywords,
  prevUrl,
  nextUrl,
  hreflang = [{ lang: "en", href: DEFAULT_URL }],
  jsonLd = defaultJsonLd,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const jsonArray = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <>
      {/* Core */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Canonical */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={description} />
      <meta property="og:locale" content={OG_LOCALE} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {DEFAULT_TWITTER && <meta name="twitter:creator" content={DEFAULT_TWITTER} />}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Pagination */}
      {prevUrl && <link rel="prev" href={prevUrl} />}
      {nextUrl && <link rel="next" href={nextUrl} />}

      {/* Hreflang */}
      {hreflang.map((h) => (
        <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
      ))}

      {/* JSON-LD */}
      {jsonArray.map((node, i) => (
        <script
          key={i}
          type="application/ld+json"
          // React 19 supports this pattern natively; no Helmet needed
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </>
  );
}
