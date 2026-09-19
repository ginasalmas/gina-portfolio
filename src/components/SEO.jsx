import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Gina — UI/UX Designer, Graphic Designer & Informatics Graduate", 
  description = "Personal Portfolio & Journal of Gina - UI/UX Designer, Graphic Designer, and Informatics Graduate crafting thoughtful digital experiences.", 
  keywords = "Gina Salma Sabilla, Gina, UI/UX Designer, Graphic Designer, Informatics, Web Designer, Product Designer, Portfolio, Admin",
  image = "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80",
  url = "https://gina-portfolio-delta.vercel.app/"
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
