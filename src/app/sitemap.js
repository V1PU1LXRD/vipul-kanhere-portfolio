export default function sitemap() {
  const base = "https://vipulkanhere.vercel.app";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/#about`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/#work`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/#designs`, lastModified: new Date(), priority: 0.6 },
    { url: `${base}/#contact`, lastModified: new Date(), priority: 0.7 },
  ];
}
