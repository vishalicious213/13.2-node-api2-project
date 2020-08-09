const express = require('express');
const server = express();
const postsRouter = require('./postsRouter');

server.get('/', (req, res) => {
  res.send('Hello from Express');
});

server.use('/api/posts', postsRouter);

server.listen(5000, () =>
  console.log('Server running on http://localhost:5000'))