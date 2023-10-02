const _ = require('lodash');

// Function to analyze blog data and calculate statistics
function analyzeBlogData(blogData) {

function analyzeBlogData(blogData) {
  const totalBlogs = blogData.blogs.length;
  const longestTitleBlog = _.maxBy(blogData.blogs, blog => blog.title.length);
  const privacyBlogs = blogData.blogs.filter(blog => blog.title.toLowerCase().includes('privacy'));
  const uniqueTitles = _.uniqBy(blogData.blogs, 'title');

  return {
    totalBlogs,
    longestTitle: longestTitleBlog ? longestTitleBlog.title : '',
    privacyBlogs: privacyBlogs.length,
    uniqueTitles: uniqueTitles.map(blog => blog.title),
  };
}

}

// Create a memoized version of the analyzeBlogData function with a caching period of 10 minutes (600,000 milliseconds)
const memoizedAnalyzeBlogData = _.memoize(analyzeBlogData, (blogData) => 'cachedResult', 600000);

// Create a memoized version of the blog search function with a caching period of 10 minutes (600,000 milliseconds)
const memoizedSearchBlogs = _.memoize((blogData, searchQuery) => {
  // Filter the blogs based on the search query (case-insensitive)
  return blogData.blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, (blogData, searchQuery) => `cachedResult-${searchQuery}`, 600000);

module.exports = { memoizedAnalyzeBlogData, memoizedSearchBlogs };









