// const sqlDatabase = require("./database.js");

// Constructor
const Store = function(store) {
  this.name = store.name;
  this.location = store.location;
  this.categories = store.categories;
  this.products = store.products;
};

module.exports = Store;