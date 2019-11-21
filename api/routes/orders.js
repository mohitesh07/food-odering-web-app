const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const {
  ordersGetAll,
  createOrder,
  getById,
  deleteOrder,
  ordersGetId
} = require("../controller/order");

router.get("/", checkAuth, ordersGetAll);

router.get("/user/:userId", checkAuth, ordersGetId);

router.post("/", checkAuth, createOrder);

router.get("/:id", checkAuth, getById);

router.delete("/:id", checkAuth, deleteOrder);

module.exports = router;
