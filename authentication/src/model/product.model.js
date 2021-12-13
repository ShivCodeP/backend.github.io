const {Schema, model} = require("mongoose");

const productSchema = new Schema({
    name: {type:String, required:true},
    price:{type:String, required:true},
    image_urls: [{type:String,requied:true}],
    user: {type:Schema.Types.ObjectId,ref:"user",required:true},
},
{
    versionKey: false,
    timestamps: true,
});

module.exports = new model("product", productSchema);
