const Category = require("../Models/category.model.js");

const router = require('express').Router();
const upload = require("../Middleware/upload.middleware");


// Create New Categoty Using file path
router.post('/category',upload.single("file"),async  function  (req, res, next) {
    // Validate request
    if (req.body == "" || req.body == null || req.body == {} || !req.body) {
     res.status(400).send({
       message: "Content can not be empty!"
     });
   }
   
   if (req.file == null || req.file == "" || req.file == {} || !req.file) {
     res.status(400).send({
       message: "Please upload an image!"
     });
    }
   
   // Create a Category
   const category = new Category({
     name: req.body.name,
     description: req.body.description,
     image: req.file,
     storeId: req.body.storeId
   });
   
   // Save Category in the database
   Category.create(category, (err, data) => {
     if (err)
       res.status(500).send({
         message:
           err.message || "Some error occurred while creating the Category."
       });
     else res.send(data);
   });
   })
   


// Create New Product Using file path
router.post('/product',upload.single("file"),async  function  (req, res, next) {
    // Validate request
    if (req.body == "" || req.body == null || req.body == {} || !req.body) {
     res.status(400).send({
       message: "Content can not be empty!"
     });
   }
   
   if (req.file == null || req.file == "" || req.file == {} || !req.file) {
     res.status(400).send({
       message: "Please upload an image!"
     });
    }
   
  
    // Create a Product
    const product = new Product({
      name: req.body.name,
      brand: req.body.brand,
      color: req.body.color,
      image: req.file,
      description: req.body.description,
      price: req.body.price
    });
  
    // Save Product in the database
    Product.create(product, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Product."
        });
      else res.send(data);
    });
   })
  



// Create New Store Using file path
router.post('/store',upload.single("file"),async  function  (req, res, next) {
    // Validate request
    if (req.body == "" || req.body == null || req.body == {} || !req.body) {
     res.status(400).send({
       message: "Content can not be empty!"
     });
   }
   
   if (req.file == null || req.file == "" || req.file == {} || !req.file) {
     res.status(400).send({
       message: "Please upload an image!"
     });
    }
   
     // Create a Store
     const store = new Store({
      name: req.body.name,
      location: req.body.location,
      image: req.file
    });
  
    // Save Store in the database
    Store.create(store, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Store."
        });
      else res.send(data);
    });
   })
  


module.exports = router;