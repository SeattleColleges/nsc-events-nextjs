const { URL } = require('url');

function validateAndSanitizeUrl(inputUrl) {
  try {
    const url = new URL(inputUrl);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      throw new Error('Invalid URL protocol');
    }
    const allowedDomains = ['example.com', 'anotherdomain.com'];
    if (!allowedDomains.includes(url.hostname)) {
      throw new Error('Domain not allowed');
    }
    return url.href;
  } catch (error) {
    throw new Error(`Invalid URL: ${error.message}`);
  }
}

module.exports = validateAndSanitizeUrl;
