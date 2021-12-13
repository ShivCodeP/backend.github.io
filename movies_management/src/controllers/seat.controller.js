const express = require("express");

const Seat = require("../models/seat.model");

const router = express.Router();

router.get("/:id", async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id).lean().exec();

        return res.send({available : seat.available});

    } catch (e) {
        return res.status(500).json({ status: "Failed", message: e.message });
    }
})

router.post("/:id", async (req, res) => {
    try {
        const seat_require = req.query.seat;

        const show = await Show.findById(req.params.id).lean().exec();
        if(show.available >= seat_require) {
           const updated_seat = show.available-seat_require;

           const update = await Show.findByIdAndUpdate(req.params.id, {$set: {available: updated_seat}}, {new: true})
           return res.status(500).send("Booked Successfully")
        } else {
            return res.status(400).send("Seat is not available as per your requirement ")
        }

    } catch (e) {
        return res.status(500).json({ status: "Failed", message: e.message });
    }
})

module.exports = router;
