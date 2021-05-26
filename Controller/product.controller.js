const Product = require("../Models/product.model.js");



// // Create and Save a new product
// exports.create = (req, res) => {
//   //Validate request
//   if (req.body == "" || req.body == null || req.body == {} || !req.body) {
//    res.status(400).send({
//      message: "Content can not be empty!"
//    });
//   }

//   // Create a Product
//   const product = new Product({
//     name: req.body.name,
//     brand: req.body.brand,
//     color: req.body.color,
//     image: req.body.image,
//     description: req.body.description,
//     price: req.body.price
//   });

//   // Save Product in the database
//   Product.create(product, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Product."
//       });
//     else res.send(data);
//   });
// };

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products."
      });
    else res.send(data);
  });
};

// Find a single Product with a productId
exports.findOne = (req, res) => {
    Product.findById(req.params.productId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.productId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Product with id " + req.params.productId
        });
      }
    } else res.send(data);
  });
};

// Update a Product by the productId
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // console.log(req.body);

  Product.updateById(
    req.params.productId,
    new Product(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Product with id ${req.params.productId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Product with id " + req.params.productId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Product with customerId
exports.delete = (req, res) => {
  Product.remove(req.params.productId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.productId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Product with id " + req.params.productId
        });
      }
    } else res.send({ message: `Product deleted successfully!` });
  });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
    Product.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Products."
      });
    else res.send({ message: `All Products were deleted successfully!` });
  });
};
