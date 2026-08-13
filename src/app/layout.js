import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import Preloader from "@/components/ui/Preloader";
import SectionDots from "@/components/ui/SectionDots";
import SectionCounter from "@/components/ui/SectionCounter";
import ImagePreview from "@/components/ui/ImagePreview";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Vignette from "@/components/ui/Vignette";
import Grain from "@/components/ui/Grain";

export const metadata = {
  title: "Vipul Kanhere — Creative Developer",
  description:
    "Young creative developer based in Pimpri, India, building quiet, beautiful web experiences for studios, founders, and brands that care about craft.",
  keywords: [
    "creative developer",
    "portfolio",
    "web design",
    "frontend",
    "India",
    "React",
    "Next.js",
    "Vipul Kanhere",
  ],
  authors: [{ name: "Vipul Kanhere" }],
  openGraph: {
    title: "Vipul Kanhere — Creative Developer",
    description:
      "Young creative developer based in Pimpri, India, building quiet, beautiful web experiences.",
    type: "website",
    url: "https://vipulkanhere.vercel.app",
    siteName: "Vipul Kanhere — Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vipul Kanhere — Creative Developer",
    description:
      "Young creative developer based in Pune, India, building quiet, beautiful web experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500&display=swap"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='24' fill='%230a0a0a'/><text x='50' y='66' text-anchor='middle' font-family='Georgia, serif' font-style='italic' font-size='48' fill='%23f5f1ea'>VK</text><circle cx='78' cy='30' r='7' fill='%23ff4d00'/></svg>"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Vipul Kanhere",
              jobTitle: "Creative Developer",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Pimpri",
                addressRegion: "Maharashtra",
                addressCountry: "IN",
              },
              email: "vipul.kanhere@gmail.com",
              url: "https://vipulkanhere.vercel.app",
              sameAs: [
                "https://github.com/V1PU1LXRD",
                "https://www.linkedin.com/in/vipul-kanhere-903b8033a/",
              ],
            }),
          }}
        />
      </head>
      <body className="bg-bg text-fg font-sans min-h-screen">
        <div className="ambient" aria-hidden="true" />
        <Vignette />
        <Grain />
        <SmoothScroll />
        <Cursor />
        <ScrollProgress />
        <Preloader />
        <SectionDots />
        <SectionCounter />
        <ImagePreview />
        <a
          href="#home"
          className="skip-link sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:bg-accent focus:text-bg focus:px-4 focus:py-2 focus:rounded-sm focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
