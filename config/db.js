const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/MONGODB')
.then(()=>{
    console.log("DB Connection");
    
})
.catch((err)=>{
    console.log(err);
    
})