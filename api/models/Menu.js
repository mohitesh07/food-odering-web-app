const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  itemImage: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Menu", menuSchema, "menu");
