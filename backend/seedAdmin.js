const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

async function createAdmin() {
  const hash = await bcrypt.hash("123456", 10);

  await Admin.create({
    email: "admin@gmail.com",
    password: hash,
  });

  console.log("Admin created");

  process.exit();
}

createAdmin();
