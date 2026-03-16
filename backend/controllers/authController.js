const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  console.log("BODY:", req.body);

  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  console.log("ADMIN:", admin);

  if (!admin) {
    return res.status(400).json({ message: "Admin not found" });
  }

  const match = await bcrypt.compare(password, admin.password);

  console.log("MATCH:", match);

  if (!match) {
    return res.status(400).json({ message: "Wrong password" });
  }

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token });
};
