const mongoose = require("mongoose")

const checkoutSchema = new mongoose.Schema({
    book_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
        required: true,
    }
})

module.exports = mongoose.model("checkout", checkoutSchema)