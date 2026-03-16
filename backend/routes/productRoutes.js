const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getInventory,
} = require("../controllers/productController");

router.get("/", auth, getProducts);
router.post("/", auth, createProduct);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);
router.get("/inventory", getInventory);

module.exports = router;
