const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", 
        required: true,
    },
    roll_id: { type: Number, required: true },
    batch: { type: String, required: true },
    evaluation_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "evaluation",
            required: false,
        }
    ],
    marks: { type: Number, required: true }
},{
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model("student", studentSchema);