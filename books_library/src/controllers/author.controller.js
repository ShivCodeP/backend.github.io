const express = require("express");

const router = express.Router();

const Author = require('../models/author.model')

router.get("/", async (req, res) => {

    try {

        const author = await Author.find().lean().exec();

        return res.send({ author })

    } catch(e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }

})

module.exports = router;