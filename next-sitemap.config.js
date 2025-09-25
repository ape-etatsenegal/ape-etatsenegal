/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ape-etatsenegal.com', // Domaine officiel
  generateRobotsTxt: true,                // Génère automatiquement robots.txt
  sitemapSize: 5000,
  changefreq: 'weekly',                   // Mise à jour hebdomadaire
  priority: 0.7,
  exclude: ["/admin", "/private"],        // Exemple de pages à exclure
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/private"], // Bloque certaines pages sensibles
      },
    ],
    additionalSitemaps: [
      'https://ape-etatsenegal.com/sitemap.xml', // Sitemap principal
    ],
  },
};
