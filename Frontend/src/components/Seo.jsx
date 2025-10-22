import React from 'react';

// This component takes props to set the SEO for each page
function Seo({ title, description, canonicalUrl, keywords }) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* --- Keywords --- */}
      <meta name="keywords" content={keywords} />
      
      {/* --- IMPORTANT SEO TAGS --- */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* --- Open Graph (for Facebook, LinkedIn, etc.) --- */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      {/* You can add a default og:image or make it a prop too */}
      <meta property="og:image" content="https://justgodigital.online/og-image.png" />
      
      {/* --- Twitter Cards --- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={canonicalUrl} />
      {/* You can add a default twitter:image or make it a prop too */}
      <meta name="twitter:image" content="https://justgodigital.online/og-image.png" />
    </>
  );
}

export default Seo;