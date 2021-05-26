const sqlDatabase = require("./database.js");

// Constructor
const Category = function(category) {
  this.name = category.name;
  this.description = category.description;
  this.image = category.image;
  this.storeId = category.storeId;
};

Category.create = (newCategory, result) => {
    sqlDatabase.query("INSERT INTO categories SET ?", newCategory, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    // console.log("created category: ", { id: res.insertId, ...newCategory});
    result(null, { id: res.insertId, ...newCategory });
  });
};

Category.findById = (categoryId, result) => {
    sqlDatabase.query(`SELECT a.id, a.name as categoryName, a.description, a.image as categoryImage, a.storeId, b.name as storeName, b.image as storeImage, b.location FROM categories as a INNER JOIN stores as b ON a.storeId=b.id WHERE a.id = ${categoryId}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
    //   console.log("Founded Category is : ", res[0]);
      result(null, res[0]);
      return;
    }

    // category Not founded by id
    result({ kind: "not_found" }, null);
  });
};

Category.getAll = result => {
    sqlDatabase.query("SELECT a.id, a.name, a.description, a.storeId, b.name as storeName, b.location FROM categories as a INNER JOIN stores as b ON a.storeId=b.id ;", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log("categories: ", res);
    result(null, res);
  });
};

Category.updateById = (id, category, result) => {
    sqlDatabase.query(
    "UPDATE categories SET name = ?, description = ?, image = ?, storeId = ? WHERE id = ?",
    [category.name, category.description, category.image, category.storeId, id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // category Not founded by id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated Category is: ", { id: id, ...category });
      result(null, { id: id, ...category });
    }
  );
};

Category.remove = (id, result) => {
    sqlDatabase.query("DELETE FROM categories WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // category Not founded by id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted Category by id: ", id);
    result(null, res);
  });
};

Category.removeAll = result => {
    sqlDatabase.query("DELETE FROM categories", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    // console.log(`Deleted categories: ${res.affectedRows}`);
    result(null, res);
  });
};

module.exports = Category;
