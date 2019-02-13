const express = require("express");
const router = express.Router();

const Users = require("../data/helpers/userDb");

router.get("/", async (req, res) => {
    try {
        const users = await Users.get(req.query)
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: "Error fetching users data"});
    }
});

router.get("/:id", async (req, res) => {
    try {
        const user = await Users.getById(req.params.id)
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ message: "Could not find user with that id!"})
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching user data"})
    }
})

router.post("/", checkUpper(), async (req, res) => {
    newUser = req.body
    if (!newUser.name) {
        res.status(400).json({ errorMessage: "Please provide name for the user." })
    } else {
        try {
            const user = await Users.insert(newUser)
            res.status(201).json(user)
       } catch (error) {
           console.log(error)
           res.status(500).json({ error: "There was an error while saving the user to the database" })
       }
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const user = await Users.remove(req.params.id)
        if (user) {
            res.status(200).json({ message: "user has been removed!"})
        } else {
            res.status(404).json({ message: "Could not find user with that id"})
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting the user"})
    }
})

router.put("/:id", async (req, res) => {
    const newUser = req.body
    if (!newUser.name) {
        res.status(400).json({ errorMessage: "Please provide text for the user" })
    } else {
        try {
            const user = await Users.update(req.params.id, newUser)
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: "Could not find user with that id"})
            }
        } catch (error) {
            res.status(500).json({ message: "Error updating the user"})
        }
    }
})

//functions:
function checkUpper() {
    return function(req, res, next) {
        const nameList = req.body.name.split(" ");
        const capitalizedList = nameList.map(name => {
            return name.charAt(0).toUpperCase() + name.slice(1)
        })
        capitalizedName = capitalizedList.join(" ");
        if (req.body.name === capitalizedName) {
            next ()
    } else {
        res.status(400).json({ error: "Make sure to capitalize your name"})
    }
    }
}

module.exports = router;