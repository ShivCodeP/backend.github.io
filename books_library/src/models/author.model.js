const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    book_ids: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "book",
            required: true,
        }
    ]
})

module.exports = mongoose.model("author",authorSchema)