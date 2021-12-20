require("dotenv").config()
const {connect} = require("mongoose");

module.exports = async ()=>{
    return await connect(`mongodb+srv://naukri:${process.env.MONGODB_PASSWORD}@cluster0.u9tan.mongodb.net/authentication?retryWrites=true&w=majority`)
}