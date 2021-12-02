const mongoose = require("mongoose")

const checkoutSchema = new mongoose.Schema({
    book_ids: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "book",
            required: true,
        }
    
},
{
    versionKey: false,
    timestamps: true,
})

module.exports = mongoose.model("checkout", checkoutSchema)