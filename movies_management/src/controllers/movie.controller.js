const express = require("express");

const Movie = require("../models/movie.model");

const router = express.Router();

router.post("/", async (req, res) => {
    try {

        const movie = await Movie.create(req.body);

        return res.status(201).json({ movie })

    } catch (e) {
        return res.status(500).json({ status: "Failed", message: e.message });
    }
})

router.get("/", async (req, res) => {
    try {
        const actor = req.query.actor;

        if (!actor) {
            const movies = await Movie.find().lean().exec();

            return res.send({ movies })
        }

        const movies = await Movie.find().lean().exec();
        const ans = [];

        movies.forEach((movie) => {
            movie.actors.forEach((ac) => {
                if (ac == actor) {

                    ans.push(movie);

                }
            })
        })

        return res.send({ ans });

    } catch (e) {
        return res.status(500).json({ status: "Failed", message: e.message });
    }
})

module.exports = router;