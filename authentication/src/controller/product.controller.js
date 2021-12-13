const express = require("express");

const router = express.Router();

const Product = require("../model/product.model");

const authenticate = require("../middlewares/authenticate")

router.post("/", authenticate, async (req, res) => {
    try {
        const user = req.user;

        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            image_urls: ["www.google.com"],
            user: user.user._id,
        });

        return res.send({ product });
    }

    catch (e) {
        res.status(500).json({ status: "failed", message: e.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const products = await Product.find().lean().exec();
        res.send(products);
    }
    catch (e) {
        res.status(500).json({ message: e.message })
    }
})


module.exports = router;