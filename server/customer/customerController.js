const Customer = require("./customerModel");
const User = require("../userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt=require('jsonwebtoken')
const privatekey="@#54363@#$$#55"
register = (req, res) => {
  var validationerror = [];
  if (!req.body.name) validationerror.push("name is required");
  if (!req.body.email) validationerror.push("email is required");
  if (!req.body.password) validationerror.push("password is required");
  if (!req.body.contact) validationerror.push("contact is required");
  if (!req.body.address) validationerror.push("address is required");
  if (validationerror.length > 0) {
    res.send({
      status: 420,
      success: false,
      message: "Validation error",
      error: validationerror,
    });
  } else {
    User.findOne({ email: req.body.email })
      .then((userData) => {
        if (!userData) {
          let userObj = new User();
          userObj.name = req.body.name;
          userObj.email = req.body.email;
          userObj.password = bcrypt.hashSync(req.body.password, saltRounds);
          userObj.save().then((saveCustomer) => {
            let customerObj = new Customer();
            customerObj.name = req.body.name;
            customerObj.email = req.body.email;
            (customerObj.password = bcrypt.hashSync(
              req.body.password,
              saltRounds
            )),
              (customerObj.contact = req.body.contact);
            customerObj.address = req.body.address;
            customerObj.userId = saveCustomer._id;
            customerObj
              .save()
              .then((customerData) => {
                res.send({
                  status: 200,
                  success: true,
                  message: "Customer register success",
                  data: customerData,
                });
              })
              .catch((err) => {
                res.send({
                  status: 500,
                  success: false,
                  message: "Internal server error",
                  error: err.message,
                });
              });
          });
        } else {
          res.send({
            status: 400,
            success: false,
            message: "Record is already exist",
          });
        }
      })
      .catch((err) => {
        res.send({
          status: 500,
          success: false,
          message: "Internal server error",
          error: err.message,
        });
      });
  }
};
login=(req,res)=>{
  var validationerror=[]
  if(!req.body.email)
    validationerror.push("email is required")
  if(!req.body.password)
    validationerror.push("password is required")
  if(validationerror.length){
    res.send({
      status:404,
      success:false,
      message:"validation error occur",
      error:validationerror
    })
  }
  else{
    User.findOne({email:req.body.email})
    .then(userdata=>{
      if(!userdata){
        res.send({
          status:420,
          success:false,
          message:"Invalid email",
        })
      }
      else{
        bcrypt.compare(req.body.password,userdata.password,function(err,data){
          if(!data){
            res.send({
              status:420,
              success:false,
              message:"Invalid Password"
            })
          }
          else{
            var tokenObj={
              _id:userdata._id,
              name:userdata.name,
              email:userdata.email,
              userType:userdata.userType
            }
            var token=jwt.sign(tokenObj,privatekey)
            res.send({
              status:200,
              success:true,
              message:"Login Sucessfully !!",
              token:token,
              data:userdata
            })
          }
        })
      }
    })
    .catch(err=>{
      res.send({
        status:500,
        success:false,
        message:"Internal server error",
        error:err.message
      })
    })
  }
}
getall=(req,res)=>{
  User.find()
  .then(userdata=>{
    res.send({
      status:200,
      success:true,
      message:"User loaded",
      data:userdata
    })
  })
  .catch(err=>{
    res.send({
      status:500,
      success:false,
      message:"Internal server error",
      error:err.message
    })
  }
  )
}
module.exports = { register,login, getall};
