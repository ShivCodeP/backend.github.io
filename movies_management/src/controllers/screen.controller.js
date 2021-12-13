const express = require("express");

const Screen = require("../models/screen.model");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const screens = await Screen.find().lean().exec();

        return res.send({ screens });

    } catch (e) {
        return res.status(500).json({ status: "Failed", message: e.message })
    }
})

router.post("/", async (req, res) => {
    try {
        const screen = await Screen.create(req.body);

        return res.status(201).json({ screen })
    } catch (e) {
        return res.status(500).json({ status: "Failed", message: e.message })
    }
})

module.exports = router;