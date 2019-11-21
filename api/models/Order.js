const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  userId: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema, "orders");
