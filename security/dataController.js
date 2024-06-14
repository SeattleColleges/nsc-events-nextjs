//A10
const { fetchData } = require('../security/api');

/**
 * Controller function to handle incoming requests for data.
 * Validates the external URL and fetches data.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
async function getData(req, res) {
  const externalUrl = req.body.url; // Assume URL is sent in the request body

  try {
    const data = await fetchData(externalUrl);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { getData };
