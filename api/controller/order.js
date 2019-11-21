const Order = require("../models/Order");
const Menu = require("../models/Menu");
const mongoose = require("mongoose");

exports.ordersGetAll = (req, res, next) => {
  Order.find()
    .select("item quantity _id userId address time")
    .populate("item", "name")
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            item: doc.item,
            quantity: doc.quantity,
            userId: doc.userId,
            address: doc.address,
            time: doc.time,
            request: {
              type: "GET",
              url: "http://localhost:8080/orders/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({
        error: err.message
      });
    });
};

exports.ordersGetId = (req, res, next) => {
  Order.find({ userId: req.params.userId })
    .select("item quantity _id userId address time")
    .populate("item", "name")
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            item: doc.item,
            quantity: doc.quantity,
            userId: doc.userId,
            address: doc.address,
            time: doc.time,
            request: {
              type: "GET",
              url: "http://localhost:8080/orders/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({
        error: err.message
      });
    });
};

exports.createOrder = (req, res, next) => {
  Menu.findById(req.body.itemId)
    .then(item => {
      if (!item) {
        return res.status(404).json({
          message: "Product not found"
        });
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        item: req.body.itemId,
        userId: req.body.userId,
        address: req.body.address
      });
      return order.save().then(result => {
        res.status(201).json({
          message: "Order stored",
          createdOrder: {
            _id: result._id,
            item: result.item,
            quantity: result.quantity,
            userId: result.userId,
            time: result.time
          },
          request: {
            type: "GET",
            url: "http://localhost:8080/orders/" + result._id
          }
        });
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Item not found",
        error: err.message
      });
    });
};

exports.getById = (req, res, next) => {
  Order.findById(req.params.id)
    .populate("item")
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found"
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:8080/orders"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
};

exports.deleteOrder = (req, res, next) => {
  Order.remove({ _id: req.params.id })
    .exec()
    .then(order => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "http://localhost:8080/orders",
          body: {
            productId: "ID",
            quantity: "Number"
          }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
};
