const express = require("express");
const Product = require("../models/product.model");

const router = express.Router();

const upload = require("../utils/file-upload");

router.get("/", async (req, res) => {
    try {
        const products = await Product.find().lean().exec();

        return res.send({ products });
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" })
    }
})

router.post("/", upload.single("productImages"), async (req, res) => {
    try {
        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            image_url: req.file.path,
        })

        return res.status(201).json({data: product})
    } catch(e) {
    
        return res.status(500).json({ message: e.message, status: "Failed" })
        
    }
})

router.post("/multiple",upload.array("productImages"),async (req, res) => {
    try {
        const files = req.files.map(file => file.path);
        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            image_url: files,
        })

        return res.status(201).json({data: product})
    } catch(e) {
    
        return res.status(500).json({ message: e.message, status: "Failed" })
        
    }
})

module.exports = router;
