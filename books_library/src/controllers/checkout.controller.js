const express = require("express");

const Checkout = require("../models/checkout.model");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const checkouts = await Checkout.find().lean().exec();
    
        return res.send({ checkouts })

    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

router.post("/", async (req, res) => {
    try {
        const checkout = await Checkout.create(req.body);
    
        return res.status(201).send(checkout); 
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const checkout = await Checkout.findByIdAndDelete(req.params.id).lean().exec();
        
        return res.send("Deleted Successfully")
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

module.exports = router;