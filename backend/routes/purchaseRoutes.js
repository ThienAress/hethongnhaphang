const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const { createPurchase } = require("../controllers/purchaseController");

router.post("/", auth, createPurchase);

module.exports = router;
