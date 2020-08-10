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

// /:id response handlers

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

// THIS IS NOT WORKING
postsRouter.put('/:id', (req, res) => {
    try{
        if (!req.body.title || !req.body.contents) {
            return res.status(400).json({
                message: "Please provide title and contents for the post."
            })
        }
        db.update(req.params.id, req.body)
        .then((post) => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
    }
        // .catch((error) => {
        //     console.log(error)
        //     res.status(500).json({
        //         message: "The post information could not be modified."
        //     })
        // })
    catch{
        res.status(500).json({
            message: "The post information could not be modified."
        })
    }
});

postsRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
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
                message: 'The post could not be removed',
            })
        })
});

// /:id/comments response handlers

postsRouter.get('/:id/comments', (req, res) => {
    const postId = req.params.id;
    db.findPostComments(postId)
        .then(comments => {
            if (postId) {
                res.status(200).json(comments)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist",
                })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'The comments information could not be retrieved',
            })
        })
});

module.exports = postsRouter;