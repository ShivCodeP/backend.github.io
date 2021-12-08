const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect("mongodb+srv://naukri:naukri@cluster0.u9tan.mongodb.net/validation?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};

module.exports = connect;
