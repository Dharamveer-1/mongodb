
const User=require('./userModel')
add=(req,res)=>{
    let userobj=new User()
    userobj.name=req.body.name
    userobj.email=req.body.email
    userobj.password=req.body.password
    userobj.save()
    .then((saveData)=>{
            res.send({
                status:true,
                message:"User added successfull",
                data:saveData
            })
    })
    .catch((err)=>{
            res.send({
                status:false,
                message:"Internal server error",
                error:err.message
            })
    })
}
module.exports={ add }