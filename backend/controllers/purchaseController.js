const Product = require("../models/Product");
const Purchase = require("../models/Purchase");
const InventoryLog = require("../models/InventoryLog");

exports.createPurchase = async (req, res) => {
  try {
    const { supplierId, productId, quantity, price } = req.body;

    const total = quantity * price;

    // tạo purchase
    const purchase = await Purchase.create({
      supplier: supplierId,
      product: productId,
      quantity,
      price,
      total,
    });

    // cập nhật tồn kho
    const product = await Product.findById(productId);

    product.stock += Number(quantity);

    // lưu giá nhập gần nhất
    product.price = Number(price);

    await product.save();

    // tạo inventory log (NHẬP KHO)
    await InventoryLog.create({
      product: productId,
      type: "IN",
      quantity: Number(quantity),
      note: "Nhập hàng",
    });

    res.json(purchase);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
