const mongoose = require("mongoose");

module.exports = () => {
    return mongoose.connect("mongodb+srv://naukri:naukri@cluster0.u9tan.mongodb.net/file_upload?retryWrites=true&w=majority",{
  
    //   useCreateIndex: true,
      useNewUrlParser: true, 
      useUnifiedTopology: true
    })
}

