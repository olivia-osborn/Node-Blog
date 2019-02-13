const express = require("express");
const router = express.Router();

const Posts = require("../data/helpers/postDb");

router.get("/", async (req, res) => {
    try {
        const posts = await Posts.get(req.query)
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts data"});
    }
});

router.get("/:id", async (req, res) => {
    try {
        const post = await Posts.getById(req.params.id)
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: "Could not find post with that id!"})
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching post data"})
    }
})

router.post("/", async (req, res) => {
    newPost = req.body
    if (!newPost.text || !newPost.user_id) {
        res.status(400).json({ errorMessage: "Please provide text and user id for the post." })
    } else {
        try {
            const post = await Posts.insert(newPost)
            res.status(201).json(post)
       } catch (error) {
           console.log(error)
           res.status(500).json({ error: "There was an error while saving the post to the database" })
       }
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const post = await Posts.remove(req.params.id)
        if (post) {
            res.status(200).json({ message: "Post has been removed!"})
        } else {
            res.status(404).json({ message: "Could not find post with that id"})
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting the post"})
    }
})

router.put("/:id", async (req, res) => {
    const newPost = req.body
    if (!newPost.text || !newPost.user_id) {
        res.status(400).json({ errorMessage: "Please provide text for the post" })
    } else {
        try {
            const post = await Posts.update(req.params.id, newPost)
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: "Could not find post with that id"})
            }
        } catch (error) {
            res.status(500).json({ message: "Error updating the post"})
        }
    }
})

module.exports = router;