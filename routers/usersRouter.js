const express = require("express");
const router = express.Router();

const Users = require("../data/helpers/userDb");

router.get("/", async (req, res) => {
    try {
        const users = await Users.get(req.query)
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts data"});
    }
});

module.exports = router;