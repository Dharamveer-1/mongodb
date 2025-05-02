const router = require("express").Router();
const userController = require("../server/userController");
const categoryController = require("../server/categoryfolder/categoryController");
// const productController = require("../server/product/productController");
// const customerController=require("../server/customer/customerController");

const multer=require("multer");

const categorystorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/categoryimages')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now + '-' + Math.round(Math.random() * 1E9)
      var newname=file.fieldname + '-' + uniqueSuffix+ file.originalname
      req.body['Image']=newname
      cb(null, newname)
    }
  })
  
  const categoryupload = multer({ storage: categorystorage})




router.post("/register", userController.add);
router.post("/addCategory", categoryupload.single('Image'),categoryController.addCategory);
router.post("/category/getall", categoryController.getallCategory);
router.post("/category/getsingle",categoryController.singleCategory);
router.post("/category/update",categoryController.updateCategory);
router.post("/category/delete",categoryController.deleteCategory);

// router.post("/product/add",productController.add);
// router.post("/product/getall",productController.getallProduct);
// router.post("/product/single",productController.singleProduct);
router.post("/customer/register",customerController.register);
router.post("/customer/login",customerController.login);
router.post("/customer/getall",customerController.getall);



 

module.exports = router
