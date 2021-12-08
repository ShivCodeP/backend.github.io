const express = require("express");
const Gallery = require("../models/gallery.model")
const upload = require("../utils/file-upload");
const fs = require('fs')

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const galleries = await Gallery.find().populate("user_id").lean().exec();

        return res.send({ galleries })
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

router.post("/", upload.array("Images"), async (req, res) => {
    try {
        const files = req.files.map(file => file.path);

        const profile = await Gallery.create({
            pictures: files,
            user_id: req.body.user_id,
        })

        return res.status(201).json({ profile })
    } catch (e) {
        return res.status(500).json({ status: "Failed", message: e.message })
    }

})

router.patch("/:id", async (req, res) => {
    try {
        const photo_to_delete = req.body.path

        const gallery = await Gallery.findById(req.params.id).lean().exec();

        const photos = [];
        gallery.pictures.forEach((path) => {
            photo_to_delete.forEach((del) => {
                if (del != path) {
                    photos.push(path);
                }
            });
        });

        photo_to_delete.forEach((path) => {

            fs.unlink(path, (err) => {
                if (err) {
                    console.error(err)
                    return
                }

                //file removed
            });
        });

        const ans = await Gallery.updateOne(req.params.id, { $set: { pictures: photos } }, { new: true });

        return res.status(201).send({ gallery: ans });
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const gallery_del = await Gallery.findById(req.params.id).lean().exec();
        console.log(gallery_del)
        gallery_del.pictures.forEach((path) => {
            fs.unlink(path, (err) => {
                if (err) {
                    console.error(err)
                    return
                }

                //file removed
            });
        });
        
        const gallery = await Gallery.findByIdAndDelete(req.params.id);

        return res.status(201).send("Deleted Successfully")
    } catch (e) {
        return res.status(500).json({ status: "Failed", message: e.message })
    }
})

module.exports = router;