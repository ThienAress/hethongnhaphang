const Product = require("../models/Product");
const InventoryLog = require("../models/InventoryLog");

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  const id = req.params.id;

  await Product.findByIdAndDelete(id);

  // xóa toàn bộ lịch sử liên quan
  await InventoryLog.deleteMany({
    product: id,
  });

  res.json({
    message: "Product deleted",
  });
};

exports.getInventory = async (req, res) => {
  const products = await Product.find();

  const inventory = products.map((p) => {
    return {
      _id: p._id,
      name: p.name,
      stock: p.stock,
      price: p.price,
      total: p.stock * p.price,
    };
  });

  res.json(inventory);
};
