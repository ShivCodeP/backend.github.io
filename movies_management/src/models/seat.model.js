const { Schema, model } = require("mongoose");

const seatSchema = new Schema({
    available: { type: Number, required: true },
    show:
    {
        type: Schema.Types.ObjectId,
        ref: "show",
        required: true,
    },

},
    {
        versionKey: false,
        timestamps: true,
    })

module.exports = model("seat", seatSchema)