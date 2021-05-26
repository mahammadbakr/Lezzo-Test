const sqlDatabase = require("./database.js");

// Constructor
const Product = function(product) {
  this.name = product.name;
  this.brand = product.brand,
  this.color = product.color,
  this.price = product.price,
  this.description = product.description;
  this.image = product.image
};

Product.create = (newProduct, result) => {
    sqlDatabase.query("INSERT INTO products SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    // console.log("created product: ", { id: res.insertId, ...newProduct});
    result(null, { id: res.insertId, ...newProduct });
  });
};

Product.findById = (productId, result) => {
    sqlDatabase.query(`SELECT * FROM products WHERE id = ${productId}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
    //   console.log("Founded product is : ", res[0]);
      result(null, res[0]);
      return;
    }

    // product Not founded by id
    result({ kind: "not_found" }, null);
  });
};

Product.getAll = result => {
    //"SELECT a.id, a.name, a.brand, a.color, a.description, a.image, a.price FROM products ;"
    sqlDatabase.query("SELECT * FROM products ;", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log("products: ", res);
    result(null, res);
  });
};

Product.updateById = (id, product, result) => {
    sqlDatabase.query(
    "UPDATE products SET name = ?, brand = ?, color = ?, description = ?, image = ?, price = ? WHERE id = ?",
    [product.name, product.brand, product.color,product.description,product.image,product.price, id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // product Not founded by id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated product is: ", { id: id, ...product });
      result(null, { id: id, ...product });
    }
  );
};

Product.remove = (id, result) => {
    sqlDatabase.query("DELETE FROM products WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // product Not founded by id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted products by id: ", id);
    result(null, res);
  });
};

Product.removeAll = result => {
    sqlDatabase.query("DELETE FROM products", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    // console.log(`Deleted products: ${res.affectedRows}`);
    result(null, res);
  });
};

module.exports = Product;
