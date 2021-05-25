const Store = require("../Models/store.model.js");

// Create and Save a new Store
exports.create = (req, res) => {
// Validate request
if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Store
  const store = new Store({
    name: req.body.name,
    location: req.body.location
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
};

// Retrieve all Stores from the database.
exports.findAll = (req, res) => {
    Store.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Stores."
          });
        else res.send(data);
      });
};

// Find a single Store with a storeId
exports.findOne = (req, res) => {
    Store.findById(req.params.storeId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Store with id ${req.params.storeId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Store with id " + req.params.storeId
            });
          }
        } else res.send(data);
      });
};

// Update a Store by the storeId
exports.update = (req, res) => {
   // Validate Request
   if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // console.log(req.body);

  Store.updateById(
    req.params.storeId,
    new Store(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Store with id ${req.params.storeId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Store with id " + req.params.storeId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Store with storeId
exports.delete = (req, res) => {
    Store.remove(req.params.storeId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Store with id ${req.params.storeId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Store with id " + req.params.storeId
            });
          }
        } else res.send({ message: `Store deleted successfully!` });
      });
};

// Delete all Stores from the database.
exports.deleteAll = (req, res) => {
    Store.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Stores."
          });
        else res.send({ message: `All Stores were deleted successfully!` });
      });
};