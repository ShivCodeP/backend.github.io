const express = require("express");
const User = require("../models/user.model");
const upload = require("../utils/file-upload")
const fs = require("fs");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await User.find().lean().exec();

        return res.send({ users });
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

router.post("/", upload.single("Image"), async (req, res) => {
    try {
        const user = await User.create(
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                profile_pic: req.file.path
            }
        )

        return res.status(201).json({ user })
    } catch (e) {
        return res.status(500).json({ status: "Failed", message: e.message })
    }
})

router.patch("/:id", upload.single("Image"), async (req, res) => {
    try {
        const user_del = await User.findById(req.params.id).lean().exec();
        const path = user_del.profile_pic;
        console.log(req.file.path)

        fs.unlink(path, (err) => {
            if (err) {
                console.error(err)
                return;
            }

            //file removed
        });

        const user = await User.findByIdAndUpdate(req.params.id, { $set: { profile_pic: req.file.path } }, { new: true })

        return res.status(201).json({ user })

    } catch (e) {

        return res.status(500).json({ status: "Failed", message: e.message})

    }
})

router.delete("/:id",async (req, res) => {
    try {
        
        const user = await User.findByIdAndDelete(req.params.id);
        const path = user.profile_pic;

        fs.unlink(path, (err) => {
            if (err) {
                console.error(err)
                return
            }

            //file removed
        });

        return res.send("Deleted Successfully")
    } catch (e) {
        return res.status(500).json({status: "Failed", message: e.message})
    }
})

module.exports = router;