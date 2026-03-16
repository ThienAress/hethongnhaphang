const Product = require("../models/Product");
const InventoryLog = require("../models/InventoryLog");

// nhập kho thủ công (nếu cần)
exports.stockIn = async (req, res) => {
  try {
    const { productId, quantity, note } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.stock += Number(quantity);

    await product.save();

    const log = await InventoryLog.create({
      product: productId,
      type: "IN",
      quantity: Number(quantity),
      note,
    });

    const populatedLog = await InventoryLog.findById(log._id).populate(
      "product",
      "name",
    );

    res.json(populatedLog);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.stockOut = async (req, res) => {
  try {
    const { productId, quantity, note } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        message: "Không đủ tồn kho",
      });
    }

    // giảm tồn kho
    product.stock -= Number(quantity);

    await product.save();

    // tạo log xuất kho
    const log = await InventoryLog.create({
      product: productId,
      type: "OUT",
      quantity: Number(quantity),
      note: note || "Xuất hàng",
    });

    const populatedLog = await InventoryLog.findById(log._id).populate(
      "product",
      "name",
    );

    res.json(populatedLog);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// lấy lịch sử kho
exports.getLogs = async (req, res) => {
  try {
    const logs = await InventoryLog.find()
      .populate("product", "name")
      .sort({ createdAt: -1 });

    res.json(logs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
