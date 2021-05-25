const sqlDatabase = require("./database.js");

// Constructor
const Category = function(category) {
  this.id = category.id;
  this.name = category.name;
};

module.exports = Category;
