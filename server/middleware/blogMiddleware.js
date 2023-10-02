
const fetch = require('node-fetch');

// Middleware to fetch blog data from the third-party API
async function fetchBlogData(req, res, next) {
  try {
    const curlCommand = `
      curl --request GET \
      --url https://intent-kit-16.hasura.app/api/rest/blogs \
      --header 'x-hasura-admin-secret: 32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
    `;

    const response = await fetch('https://intent-kit-16.hasura.app/api/rest/blogs', {
      method: 'GET',
      headers: {
        'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
      }
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch blog data');
    }

    const blogData = await response.json();

    req.blogData = blogData;
    next();
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch blog data' });
  }
}

module.exports = { fetchBlogData };









