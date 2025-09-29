/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ape-etatsenegal.com', // Ton domaine
  generateRobotsTxt: true,               // Génère aussi robots.txt
  sitemapSize: 5000,                      // Nombre max d'URLs par sitemap
  changefreq: 'daily',
  priority: 0.7,

  // Cette fonction transforme chaque URL
  transform: async (config, url) => {
    return {
      loc: url,                           // URL de la page
      changefreq: config.changefreq,      // Fréquence
      priority: config.priority,          // Priorité
      lastmod: new Date().toISOString(),  // Date de dernière modification
    }
  },

  // URLs supplémentaires à inclure si elles ne sont pas détectées automatiquement
  additionalPaths: async (config) => [
    '/souscris',
    '/documentation',
    '/evenements',
  ],
};
