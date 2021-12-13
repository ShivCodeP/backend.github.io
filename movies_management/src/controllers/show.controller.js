const express = require("express");

const Show = require("../models/show.model");

const router = express.Router();

router.get("/", async (req, res) => {

    try {
        const shows = await Show.find().lean().exec();

        return res.send({ shows });

    } catch (e) {
        return res.status(500).json({ status: "Failed", message: e.message });
    }

})

router.get("/:id", async (req, res) => {

    try {
        const shows = await Show.find().lean().exec();
        const ans = [];

        shows.forEach((show) => {
            show.movie.forEach((m) => {
                if (m == req.params.id) {
                    ans.push(show);
                }
            })
        })

        return res.send({ ans })

    } catch (e) {
        return res.status(500).json({ status: "Failed", message: e.message });
    }

})

router.get("/nearest/", async (req, res) => {
    try {
        const loc_find = req.query.location;
    
        const shows = await Show.find().lean().populate("screen").populate("theatre").exec();
        const ans = [];
    
        shows.forEach((show) => {
            show.screen.forEach((sc) => {
                sc.theatre.forEach((th) => {
                    if (th.location == loc_find) {
    
                        ans.push(show);
    
                    }
                })
            })
        })
    
        return res.send({ ans })

    } catch (e) {
        return res.status(500).json({ status: "Failed", message: e.message });
    }

})

module.exports = router;
