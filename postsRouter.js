const express = require('express');

const postsRouter = express.Router();

postsRouter.get('/', (req, res) => {
  res.status(200).send('Hello from the GET /posts endpoint');
});

module.exports = postsRouter;