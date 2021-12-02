const express = require("express");

const Section = require("../models/section.model");

const router = express.Router();

router.get("/", async (req, res) => {
 
    try {
        const sections = await Section.find().populate("book_ids").lean().exec();
    
        return res.send(sections)
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
    
})
router.get("/notcheckout/", async (req, res) => {
 
    try {
        const sections = await Section.find().populate("book_ids").lean().exec();

        let books = [];

        sections.forEach((section) => {
            
            section.book_ids.forEach((book) => {
                if(book.checkout == false) {
                    console.log(book)
                    books.push(book);
                }
            })
        })
    
        return res.send(books)
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
    
})

router.get("/:id", async (req, res) => {
 
    try {
        const sections = await Section.find().populate("book_ids").lean().exec();

        const books = [];

        sections.forEach((section) => {
            section.book_ids.forEach((book) => {
                 book.author_ids.forEach((author) => {
                     if(author == req.params.id) {
                         books.push(book)
                     }
                 })
            })            
        })
    
        return res.send(books)
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
    
})

router.post("/", async (req, res) => {
    try {
        const section = await Section.create(req.body);

        return res.status(201).send(section);
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

router.patch("/:id", async (req, res) => {
    try {
        const section = await Section.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
        }).lean().exec();
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const section = await Section.findByIdAndDelete(req.params.id).lean().exec();

        return res.send("Deleted Successfully")
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

module.exports = router;