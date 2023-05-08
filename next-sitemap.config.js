/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_NEXT_BASE || 'https://example.com',
  generateRobotsTxt: true, // (optional)
  // ...other options
}
