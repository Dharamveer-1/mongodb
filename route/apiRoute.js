const router=require('express').Router()
const userController=require('../server/userController')
const categoryController = require('../server/categoryfolder/categoryController')

router.post('/register',userController.add);
router.post('/addcategory', categoryController.addCategory);


module.exports= router