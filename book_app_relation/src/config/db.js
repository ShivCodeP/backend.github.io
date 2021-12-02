const mongoose = require('mongoose');


module.exports = () => {
    return mongoose.connect("mongodb://localhost:27017/test",{
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};