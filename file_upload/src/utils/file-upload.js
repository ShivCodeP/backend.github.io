const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
    destination: function (req,file,callback) {
        callback(null,path.join(__dirname,"../upload"));
    },
    filename: function (req,file,callback) {
        callback(null,new Date().toISOString() + file.originalname);
    },
});

const filefilter = function(req,file,callback) {
    if(file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
        callback(null,true);
    } else {
        callback(null,false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024*1024*5,
    },
    filefilter: filefilter,
});

module.exports = upload;