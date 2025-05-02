const Product = require("./productModel");

const add = async (req, res) => {
  var validationerror = [];
  if (!req.body.productName) validationerror.push("productName is required");
  if (!req.body.productprice) validationerror.push("price is required");
  if (!req.body.productdescription)
    validationerror.push("description is required");
  if (!req.body.status) validationerror.push("status is required");
  if(!req.body.categoryId)
    validationerror.push("categoryId is required")
  if (validationerror.length > 0) {
    res.send({
      status: 420,
      success: false,
      message: "validation error",
      error: validationerror,
    });
  } else {
    let total=await Product.countDocuments()
    let productObj =await Product()
    productObj.productName = req.body.productName;
    productObj.price = req.body.price;
    productObj.description = req.body.description;
    productObj.categoryId=req.body.categoryId;
    productObj
      .save()
      .then((data) => {
        if (!data) {
          res.send({
            status: 404,
            success: false,
            message: "product could not be crated",
            data:data,
          });
        } else {
          res.send({
            status: 200,
            success: true,
            message: "product created is successfully",
            data: data,
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
getallProduct=(req,res)=>{
  Product.find()
  .populate("categoryId")
  .then(productData=>{
      res.send({
          status:200,
          success:true,
          message:"Data is loaded",
          data:productData
      })
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
  singleProduct=(req,res)=>{
     var validationerror=[]
     if(!req.body._id){
      validationerror.push("_id is required")
     }
     if(validationerror.length>0){
      res.send({
        status:420,
        success:false,
        message:"validationerror",
        error:validationerror,
      })
     }
     else{
      Category.findOne({_id:req.body._id})
      .then((data)=>{
        res.send({
          status:200,
          sccess:true,
          message:"Single category is Found",
          data:data
        })
      })
      .catch((err)=>{
        res.send({
          staus:500,
          success:false,
          message:"Interval server error",
          error:err.message
        })
      })

     }
  }

module.exports = { add, getallProduct, singleProduct };
