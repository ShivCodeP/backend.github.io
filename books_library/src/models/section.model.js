const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
    section_name: { type: String, required: true},
    book_ids: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "book",
            required: true,
        }
    ]
})

module.exports = mongoose.model("section",sectionSchema)