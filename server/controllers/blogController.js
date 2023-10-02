
const express = require('express');
const router = express.Router();
const { fetchBlogData } = require('../middleware/blogMiddleware');
const { memoizedAnalyzeBlogData, memoizedSearchBlogs } = require('../utils/blogUtils');

// Define a route for fetching and analyzing blog data
router.get('/blog-stats', fetchBlogData, (req, res) => {
  const statistics = memoizedAnalyzeBlogData(req.blogData);
  res.json(statistics);
});



// Define a route for searching blogs
router.get('/blog-search', fetchBlogData, (req, res) => {
  // Get the search query parameter from the request
  const searchQuery = req.query.query;

  // Check if the search query is provided
  if (!searchQuery) {
    return res.status(400).json({ error: 'Search query parameter (query) is required.' });
  }

  const cachedResults = memoizedSearchBlogs(req.blogData, searchQuery);

//   if (cachedResults.length > 0) {
//     console.log(`Cached results found for query: "${searchQuery}"`);
//   }
  
  // Respond with the cached or newly searched blogs
  res.json(cachedResults);
});

module.exports = router;


