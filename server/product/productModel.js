const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    autoId:{type:Number,default:null},
    productName: {type:String, default:'null'},
    price:{type:Number, default:'null'},
    description: {type:String, default:'null'},
    categoryId:{type:mongoose.Schema.ObjectId,default:"null",ref:'category'},
    status: {type:Boolean, default:true},
    createAt: {type:Date, default:Date.now()},

});
module.exports = mongoose.model('product', productSchema);

