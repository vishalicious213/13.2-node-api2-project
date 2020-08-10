const express = require('express');
const postsRouter = express.Router();
const db = require('./data/db');

// root response handlers

// GET ALL POSTS
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

// CREATE NEW POST - THIS IS NOT WORKING
postsRouter.post('/', (req, res) => {
    let post = req.body;
    
    if(!req.body.title || !req.body.contents){
        res.status(400).json({
            errorMessage: 'Please provide title and contents for the post'
        })
    }

    db.insert(post)
    .then((post) => {
        res.status(201).json(post)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: 'There was an error while saving the post to the database'
        })
    })
});

// /:id response handlers

// GET INDIVIDUAL POST
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

// UPDATE INDIVIDUAL POST - THIS IS NOT WORKING
postsRouter.put('/:id', (req, res) => {
    try{
        if(!req.body.title || !req.body.contents){
            res.status(400).json({
                errorMessage: "Please provide title and contents for the post."
            })
        }
        db.update(req.params.id, req.body)
            .then((post) => {
                res.status(200).json(post)
            })
            .catch((error) => {
                console.log(error)
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            })
    }
    catch{
        res.status(500).json({
            error: "The post information could not be modified."
        })
    }
});

// DELETE INDIVIDUAL POST
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

// GET ALL COMMENTS FOR INDIVIDUAL POST
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