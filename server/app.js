
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const blogController = require('./controllers/blogController');

app.use('/api', blogController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});









