const express = require("express");
const Admin = require("../models/admin.model");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const admin = await Admin.create(req.body);

        return res.status(201).send(admin);
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

router.get("/", async (req, res) => {
    try {
        const admins = await Admin.find().populate("user_ids").lean().exec();

        return res.send({admins})
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

module.exports = router;
