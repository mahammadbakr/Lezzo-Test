module.exports = app => {
    const catController = require("../Controller/category.controller");
  
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


  };