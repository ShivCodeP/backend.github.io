const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
    name: { type: String, required: true },
    actors: [
        {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true
        }
    ],
    languages: [
        { type: String, required: true }
    ],
    directors: [
        {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true
        }
    ],
    poster_url: { type: String, required: true }
},
    {
        versionKey: false,
        timestamps: true,
    })

module.exports = model("movie", movieSchema);