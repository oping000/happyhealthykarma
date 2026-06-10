// Happy Healthy Karma - Affiliate Redirect Handler
// Route: /api/recommend?slug=anxiety
// This function intercepts clicks and redirects to the correct affiliate link

const { AFFILIATE_ROUTES } = require('../config/affiliateRoutes');

module.exports = function handler(req, res) {
  // Get the slug from the URL (e.g. ?slug=anxiety)
  const { slug } = req.query;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  // If no slug or slug not found in config, redirect to homepage
  if (!slug || !AFFILIATE_ROUTES[slug]) {
    return res.redirect(302, 'https://happyhealthykarma.com');
  }

  // Get the destination URL from config
  const route = AFFILIATE_ROUTES[slug];
  const destination = route.targetUrl;

  // 302 = temporary redirect (important for SEO - tells Google this can change)
  return res.redirect(302, destination);
};
