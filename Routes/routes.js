module.exports = app => {
  const catController = require("../Controller/category.controller.js");
  const storeController = require("../Controller/store.controller.js");
  const productController = require("../Controller/product.controller.js");
  const addController = require("../Controller/add.controller.js");

 
  ////Add Routes

  //separated routes to create objects 
  //(Due Upload image file we need use router inside the controller !)
  app.use("/create",addController);



  ////Category Routes 

  // Create a new Category(old)
  // app.post("/createCategory", catController.create);

  // Retrieve all Categories
  app.get("/categories", catController.findAll);

  // Retrieve a single category with categoryId
  app.get("/categories/:categoryId", catController.findOne);

  // Update a category with categoryId
  app.put("/categories/:categoryId", catController.update);

  // Delete a Category with categoryId
  app.delete("/categories/:categoryId", catController.delete);

  // Delete All Categories
  app.delete("/delete/categories", catController.deleteAll);


  
  ////Store Routes
  
  // // Create a new Store(old)
  // app.post("/createStore", storeController.create);

  // Retrieve all Stores
  app.get("/stores", storeController.findAll);

  // Retrieve all Categories for stores
  app.get("/categoriesForEachStore/:storeId", storeController.categoriesForEachStore);

  // Retrieve a single Store with storeId
  app.get("/stores/:storeId", storeController.findOne);

  // Update a Store with storeId
  app.put("/stores/:storeId", storeController.update);

  // Delete a Store with storeId
  app.delete("/stores/:storeId", storeController.delete);

  // Delete All Stores
  app.delete("/delete/stores", storeController.deleteAll);



   ////Product Routes
  
  // // Create a new Product(old)
  // app.post("/createProduct", productController.create);

  // Retrieve all Products
  app.get("/products", productController.findAll);

  // Retrieve a single Store with productId
  app.get("/products/:productId", productController.findOne);

  // Update a Store with productId
  app.put("/products/:productId", productController.update);

  // Delete a Store with productId
  app.delete("/products/:productId", productController.delete);

  // Delete All Products
  app.delete("/delete/products", productController.deleteAll);


};