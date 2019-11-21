const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const {
  menuGetAll,
  createProduct,
  getItemById,
  patchById,
  deleteById
} = require("../controller/menu");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get("/", menuGetAll);

router.post("/", upload.single("itemImage"), checkAuth, createProduct);

router.get("/:itemId", getItemById);

router.patch("/:itemId", checkAuth, patchById);

router.delete("/:itemId", checkAuth, deleteById);

module.exports = router;
