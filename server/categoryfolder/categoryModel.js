const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    categoryName: {type:String, default:'null'},
    Image: {type:String, default:'no_image.jpg'},
    description: {type:String, default:'null'},
    status: {type:Boolean, default:true},
    createAt: {type:Date, default:Date.now()},
});

module.exports = mongoose.model('category', categorySchema);