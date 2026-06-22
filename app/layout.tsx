import type { Metadata } from "next";

const siteUrl = "https://motkan.ai";

export const metadata: Metadata = {
  title: "Motkan — AI Systems for Real Estate | Speed-to-Lead & Database Reactivation",
  description: "AI systems that capture every lead, book more showings, and help your team close more deals. Instant response, 24/7 pipeline automation, and database reactivation.",
  keywords: "AI real estate, lead response, real estate automation, CRM integration, database reactivation, lead qualification, real estate AI",
  authors: [{ name: "Motkan", url: siteUrl }],
  creator: "Motkan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Motkan — AI Systems for Real Estate",
    description: "AI systems that capture every lead, book more showings, and help your team close more deals.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Motkan AI Systems for Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Motkan — AI Systems for Real Estate",
    description: "AI systems that capture every lead, book more showings, and help your team close more deals.",
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'><circle cx='20' cy='20' r='18' fill='%23b8543a'/><circle cx='20' cy='20' r='8' fill='%23f2e9d6'/></svg>" />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* Structured Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Motkan",
              url: siteUrl,
              logo: `${siteUrl}/logo.png`,
              description: "AI systems for real estate that capture every lead, book more showings, and help your team close more deals.",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Sales",
                email: "hello@motkan.ai",
                url: siteUrl,
              },
              sameAs: [
                "https://twitter.com/motkan",
                "https://linkedin.com/company/motkan",
              ],
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
