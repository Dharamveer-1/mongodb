const Category = require("./categoryModel");

const addCategory = (req, res) => {
  var validationerror = [];
  if (!req.body.categoryName) 
    validationerror.push("categoryName is required");
  if (!req.body.description) 
    validationerror.push("description is required");
  if (validationerror.length) {
    res.send({
      status: false,
      message: "validation error occur",
      error: validationerror,
    });
  } else {
    const categoryObj = Category();
    categoryObj.categoryName = req.body.categoryName;
    categoryObj.description = req.body.description;
    categoryObj.categoryImage = req.body.categoryImage;
    categoryObj
      .save()
      .then((saveData) => {
        res.send({
          status: true,
          message: "data added successful!",
          data: saveData,
        });
      })
      .catch((err) => {
        res.send({
          status: false,
          message: "Internal error occur",
          error: err.message,
        });
      });
  }
};

module.exports = { addCategory };