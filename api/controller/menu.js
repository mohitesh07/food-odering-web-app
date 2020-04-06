const mongoose = require("mongoose");
const Menu = require("../models/Menu");

exports.menuGetAll = (req, res, next) => {
  Menu.find()
    .select("name price _id itemImage")
    .exec()
    .then(docs => {
      //   console.log(docs);
      const response = {
        count: docs.length,
        items: docs.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            itemImage: doc.itemImage,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:8080/menu/" + doc._id
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({
        error: err.message
      });
    });
};

exports.createProduct = (req, res, next) => {
  const menu = new Menu({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    itemImage: req.file.path
  });

  menu
    .save()
    .then(result => {
      res.status(201).json({
        message: "Created item successfully",
        createdItem: {
          name: result.name,
          price: result.price,
          _id: result._id,
          itemImage: result.itemImage,
          request: {
            type: "POST",
            url: "http://localhost:8080/menu/" + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({
        error: err.message
      });
    });
};

exports.getItemById = (req, res, next) => {
  const itemId = req.params.itemId;
  Menu.findById(itemId)
    .select("name price _id itemImage")
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(200).json({
          item: doc,
          request: {
            type: "GET",
            url: "http://localhost:8080/menu" + doc._id
          }
        });
      } else {
        res.status(404).json({
          message: "No valid entry found for provided itemId"
        });
      }
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    });
};

exports.patchById = (req, res, next) => {
  const id = req.params.itemId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Menu.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Product updated",
        request: {
          type: "GET",
          result: result,
          url: "http://localhost:8080/api/menu/" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
};

exports.deleteById = (req, res, next) => {
  const id = req.params.itemId;
  Menu.remove({
    _id: id
  })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Item deleted",
        request: {
          type: "POST",
          url: "http://localhost:8080/menu",
          body: { name: "String", price: "Number" }
        }
      });
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({
        error: err.message
      });
    });
};
