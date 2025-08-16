import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'profile' | 'article'
  author?: string
}

export default function SEO({
  title = "Abhijeet Gitte - Full-Stack Developer & Mobile App Developer",
  description = "Final-year IT undergraduate specializing in React, Node.js, and mobile development. Expert in DSA with 500+ problems solved. Building scalable, high-performance applications.",
  keywords = "Abhijeet Gitte, Full-Stack Developer, React Developer, Node.js, Mobile Development, DSA, Computer Engineering, SPPU, Web Development, JavaScript, TypeScript, Portfolio",
  image = "/og-image.jpg",
  url = "https://abhijeet-gitte.vercel.app",
  type = "profile",
  author = "Abhijeet Gitte"
}: SEOProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Abhijeet Gitte",
    "url": url,
    "image": `${url}${image}`,
    "jobTitle": "Full-Stack Developer",
    "description": description,
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "Savitribai Phule Pune University (SPPU)",
      "sameAs": "https://www.unipune.ac.in/"
    },
    "knowsAbout": [
      "React",
      "Node.js", 
      "JavaScript",
      "TypeScript",
      "Mobile Development",
      "Data Structures and Algorithms",
      "Web Development",
      "Full-Stack Development",
      "Computer Engineering"
    ],
    "knowsLanguage": [
      {
        "@type": "Language",
        "name": "English"
      },
      {
        "@type": "Language", 
        "name": "Hindi"
      },
      {
        "@type": "Language",
        "name": "Marathi"
      }
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "React JS Certification",
        "credentialCategory": "certificate",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Infosys"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Data Analytics Certification", 
        "credentialCategory": "certificate",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Accenture (Forage)"
        }
      }
    ],
    "email": "abhijeetgitte10@gmail.com",
    "sameAs": [
      "https://github.com/abhijeetgitte",
      "https://linkedin.com/in/abhijeetgitte", 
      "https://twitter.com/abhijeetgitte"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    }
  }

  const webSiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": title,
    "description": description,
    "url": url,
    "author": {
      "@type": "Person",
      "name": author
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />

        {/* Canonical URL */}
        <link rel="canonical" href={url} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={type} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${url}${image}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${author} - Portfolio Preview`} />
        <meta property="og:site_name" content="Abhijeet Gitte Portfolio" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={`${url}${image}`} />
        <meta property="twitter:creator" content="@abhijeetgitte" />
        <meta property="twitter:site" content="@abhijeetgitte" />

        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
        <meta name="application-name" content="Abhijeet Gitte Portfolio" />
        <meta name="apple-mobile-web-app-title" content="Abhijeet Portfolio" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />

        {/* Favicons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* DNS Prefetch & Preconnect */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />

        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />

        {/* Performance Hints */}
        <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </Head>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteStructuredData)
        }}
      />
    </>
  )
}
