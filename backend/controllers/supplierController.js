const Supplier = require("../models/Supplier");

exports.getSuppliers = async (req, res) => {
  const suppliers = await Supplier.find();

  res.json(suppliers);
};

exports.createSupplier = async (req, res) => {
  const { name, phone, address, productType } = req.body;

  const supplier = await Supplier.create({
    name,
    phone,
    address,
    productType,
  });

  res.json(supplier);
};

exports.updateSupplier = async (req, res) => {
  const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(supplier);
};

exports.deleteSupplier = async (req, res) => {
  await Supplier.findByIdAndDelete(req.params.id);

  res.json({ message: "Deleted" });
};
