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

postsRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist",
                })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'The post information could not be retrieved',
            })
        })
});

module.exports = postsRouter;