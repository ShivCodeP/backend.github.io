require("dotenv").config()
const mongoose = require("mongoose")

module.exports = () => {
    return mongoose.connect(`mongodb+srv://naukri:${process.env.MONGODB_PASS}@cluster0.u9tan.mongodb.net/pagination_email?retryWrites=true&w=majority`,{
  
      useCreateIndex: true,
      useNewUrlParser: true, 
      useUnifiedTopology: true
    })
}