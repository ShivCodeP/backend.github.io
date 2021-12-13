require("dotenv").config();
const mongoose = require("mongoose");

module.exports = async (req, res) => {
    return mongoose.connect(`mongodb+srv://naukri:${process.env.MONGODB_PASS}@cluster0.u9tan.mongodb.net/movie_management?retryWrites=true&w=majority`);

}