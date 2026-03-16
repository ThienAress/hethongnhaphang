const express = require("express");

const router = express.Router();

const {
  stockIn,
  stockOut,
  getLogs,
} = require("../controllers/inventoryController");

const auth = require("../middleware/authMiddleware");
router.get("/logs", auth, getLogs);

router.post("/stock-in", auth, stockIn);
router.post("/out", stockOut);

module.exports = router;
