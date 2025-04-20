/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.reltroner.com',
    generateRobotsTxt: true, // <== ini penting agar Google tahu bisa crawl
    sitemapSize: 5000,
    changefreq: 'weekly',
    priority: 0.7,
    exclude: ['/api/*', '/404'],
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
    },
  };
  