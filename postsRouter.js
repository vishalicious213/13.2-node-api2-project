const express = require('express');
const postsRouter = express.Router();
const db = require('./data/db');

postsRouter.get('/', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'The posts information could not be retrieved',
            })
        })
});

module.exports = postsRouter;