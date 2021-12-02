const express = require("express");

const Book = require("../models/book.model");

const router = express.Router();

router.get("/", async (req, res) => {

    try {
        const books = await Book.find().lean().exec();

        return res.send(books);
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }

})

//find the books that are checkout

router.get("/checkout", async (req, res) => {
    try {
        const books = await Book.find({"checkout": {$eq: true}}).lean().exec();

        return res.send(books);
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

//find books written by an author

router.get("/:id", async (req, res) => {
    try {
        const books = await Book.find({}).populate("author_ids").lean().exec();

        let result = [];

        const ans = books.forEach((book) => {

            book.author_ids.forEach((author) => {
                
                if(author._id == req.params.id) {

                    result.push(book)

                }
            })  
        
        })

        return res.send(result)
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

router.post("/", async (req, res) => {
    try {
        const book = await Book.create(req.body);

        return res.status(201).send(book);
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

router.patch("/:id", async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        .lean().exec();

        return res.send(book)
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id).lean().exec();

        return res.send("Deleted Successfully")
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

module.exports = router;

