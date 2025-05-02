const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({

    id:{type:Number,default:null},
    name:{type:String,default:null},
    email:{type:String,default:null},
    password:{type:String,default:null},
    userType:{type:Number,default:2}, // admin-1,customer-2
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()}
})
module.exports=new mongoose.model('user',userSchema)