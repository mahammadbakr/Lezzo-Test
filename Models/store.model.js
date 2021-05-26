const sqlDatabase = require("./database.js");

// Constructor
const Store = function(store) {
  this.name = store.name;
  this.location = store.location;
  this.image = store.image;
};


Store.create = (newStore, result) => {
  sqlDatabase.query("INSERT INTO stores SET ?", newStore, (err, res) => {
  if (err) {
    console.log("Error: ", err);
    result(err, null);
    return;
  }
  // console.log("created Store: ", { id: res.insertId, ...newStore});
  result(null, { id: res.insertId, ...newStore });
});
};


Store.findById = (storeId, result) => {
  sqlDatabase.query(`SELECT * FROM stores WHERE id = ${storeId}`, (err, res) => {
  if (err) {
    console.log("Error: ", err);
    result(err, null);
    return;
  }
  if (res.length) {
  //   console.log("Founded Store is : ", res[0]);
    result(null, res[0]);
    return;
  }
  // store Not founded by id
  result({ kind: "not_found" }, null);
});
};


Store.getAll = result => {
  sqlDatabase.query("SELECT * FROM stores", (err, res) => {
  if (err) {
    console.log("Error: ", err);
    result(null, err);
    return;
  }
  console.log("Stores: ", res);
  result(null, res);
});
};


Store.categoriesForEachStoreById = (storeId, result) => {
    sqlDatabase.query("SELECT a.id, a.name as categoryName, a.image as categoryimage, a.description, a.storeId, b.name as storeName, b.image as storeimage, b.location FROM categories as a INNER JOIN stores as b ON a.storeId = b.id WHERE a.storeId = "+ storeId, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }
      console.log("Stores: ", res);
      result(null, res);
    });
};


Store.updateById = (id, store, result) => {
  sqlDatabase.query(
  "UPDATE stores SET name = ?, location = ?, image = ?, WHERE id = ?",
  [store.name, store.location, store.image, id],
  (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // Store Not founded by id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Updated Store is: ", { id: id, ...store });
    result(null, { id: id, ...store });
  }
);
};


Store.remove = (id, result) => {
  sqlDatabase.query("DELETE FROM stores WHERE id = ?", id, (err, res) => {
  if (err) {
    console.log("Error: ", err);
    result(null, err);
    return;
  }

  if (res.affectedRows == 0) {
    // store Not founded by id
    result({ kind: "not_found" }, null);
    return;
  }
  console.log("Deleted Store by id: ", id);
  result(null, res);
});
};


Store.removeAll = result => {
  sqlDatabase.query("DELETE FROM stores", (err, res) => {
  if (err) {
    console.log("Error: ", err);
    result(null, err);
    return;
  }
  // console.log(`Deleted stores: ${res.affectedRows}`);
  result(null, res);
});
};

module.exports = Store;
