const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
  },

  address: {
    type: String,
  },

  productType: {
    type: String,
  },
});

module.exports = mongoose.model("Supplier", supplierSchema);
