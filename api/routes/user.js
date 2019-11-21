const express = require("express");
const router = express.Router();
const { login, signup, deleteUser } = require("../controller/user");

router.post("/signup", signup);

router.post("/login", login);

router.delete("/:userId", deleteUser);

module.exports = router;
