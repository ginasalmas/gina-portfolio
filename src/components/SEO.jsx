import React from 'react';
import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://gina-portfolio-delta.vercel.app';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;
const SITE_NAME = 'Gina Salma Sabilla — Portfolio';
const TWITTER_HANDLE = '@ginasalmas';

/**
 * SEO component — injects per-page meta tags, Open Graph, Twitter Card.
 *
 * Props:
 *  title        — page title (will be used verbatim, no suffix appended)
 *  description  — meta description (keep 150-160 chars for best results)
 *  keywords     — comma-separated keyword string
 *  image        — absolute OG image URL (1200×630 recommended)
 *  url          — canonical URL for this page (absolute)
 *  type         — 'website' | 'article' | 'profile'  (default: 'website')
 *  publishedTime — ISO date string, used when type='article'
 *  modifiedTime  — ISO date string, used when type='article'
 *  tags         — array of strings, used when type='article'
 *  noindex      — set true to add noindex (e.g. admin pages)
 */
const SEO = ({
  title = "Gina Salma Sabilla — UI/UX Designer & Graphic Designer | Portfolio",
  description = "Portfolio Gina Salma Sabilla — Informatics Graduate yang spesialis di UI/UX Design, Graphic Design, Web Design, dan Administrasi. Open to work.",
  keywords = "Gina Salma Sabilla, Gina, UI/UX Designer, Graphic Designer, Informatics Graduate, Web Designer, Product Designer, Portfolio, Figma, Jakarta, Indonesia",
  image = DEFAULT_OG_IMAGE,
  url = `${BASE_URL}/`,
  type = "website",
  publishedTime,
  modifiedTime,
  tags = [],
  noindex = false,
}) => {
  // Ensure absolute image URL
  const absoluteImage = image && image.startsWith('http') ? image : DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      {/* ── Basic ── */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noindex
        ? <meta name="robots" content="noindex, nofollow" />
        : <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      }

      {/* ── Canonical ── */}
      <link rel="canonical" href={url} />

      {/* ── Open Graph ── */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="id_ID" />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${title} — Gina Salma Sabilla`} />

      {/* ── Article-specific OG ── */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && (
        <meta property="article:author" content="Gina Salma Sabilla" />
      )}
      {type === 'article' && tags.map((tag, i) => (
        <meta key={i} property="article:tag" content={tag} />
      ))}

      {/* ── Twitter Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:image:alt" content={`${title} — Gina Salma Sabilla`} />
    </Helmet>
  );
};

export default SEO;
