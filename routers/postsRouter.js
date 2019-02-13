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

module.exports = router;