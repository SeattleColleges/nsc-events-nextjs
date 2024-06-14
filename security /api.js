const axios = require('axios');
const validateAndSanitizeUrl = require('./validateUrl');

async function fetchData(externalUrl) {
  try {
    const sanitizedUrl = validateAndSanitizeUrl(externalUrl);
    const response = await axios.get(sanitizedUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
}

module.exports = { fetchData };
