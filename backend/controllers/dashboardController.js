const Product = require("../models/Product");
const InventoryLog = require("../models/InventoryLog");

exports.getDashboard = async (req, res) => {
  const products = await Product.find();

  const totalProducts = products.length;

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

  const inventoryValue = products.reduce(
    (sum, p) => sum + p.stock * (p.price || 0),
    0,
  );

  const lowStock = products.filter((p) => p.stock < 5);

  const recentStock = await InventoryLog.find()
    .populate("product")
    .sort({ createdAt: -1 })
    .limit(5);

  // TOP PRODUCTS
  const topProducts = await InventoryLog.aggregate([
    {
      $group: {
        _id: "$product",
        total: { $sum: "$quantity" },
      },
    },
    {
      $sort: { total: -1 },
    },
    {
      $limit: 5,
    },
  ]);

  const populatedTop = await Product.populate(topProducts, {
    path: "_id",
    select: "name",
  });

  const cleanTopProducts = populatedTop.filter((p) => p._id !== null);

  res.json({
    totalProducts,
    totalStock,
    inventoryValue,
    lowStock,
    recentStock,
    topProducts: populatedTop,
  });
};
