module.exports = app => {
    const catController = require("../Controller/category.controller.js");
    const storeController = require("../Controller/store.controller.js");

  
    ////Category Routes

    // Create a new Category
    app.post("/createCategory", catController.create);
  
    // Retrieve all Categories
    app.get("/categories", catController.findAll);
  
    // Retrieve a single category with categotyId
    app.get("/categories/:categotyId", catController.findOne);
  
    // Update a category with categotyId
    app.put("/categories/:categotyId", catController.update);
  
    // Delete a Category with categotyId
    app.delete("/categories/:categotyId", catController.delete);
  
    // Delete All Categories
    app.delete("/deleteCategories", catController.deleteAll);


    ////Store Routes
    
    // Create a new Store
    app.post("/createStore", storeController.create);
  
    // Retrieve all Stores
    app.get("/stores", storeController.findAll);
  
    // Retrieve a single Store with storeId
    app.get("/stores/:storeId", storeController.findOne);
  
    // Update a Store with storeId
    app.put("/stores/:storeId", storeController.update);
  
    // Delete a Store with storeId
    app.delete("/stores/:storeId", storeController.delete);
  
    // Delete All Stores
    app.delete("/deleteStores", storeController.deleteAll);
  };