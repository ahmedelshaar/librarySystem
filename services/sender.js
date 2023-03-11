const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("../models/managersModel");
const managersSchema = mongoose.model("managers");

// bcrybt
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

module.exports = async () => {
  let count = await managersSchema.countDocuments();
  if (count > 0) {
    return;
  }
  new managersSchema({
    firstName: "super",
    lastName: "admin",
    email: "superadmin@gmail.com",
    password: bcrypt.hashSync("12345678", salt),
    hireDate: Date.now(),
    salary: 5000,
    role: "super-admin",
  }).save();
  new managersSchema({
    firstName: "admin",
    lastName: "role",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("12345678", salt),
    hireDate: Date.now(),
    salary: 5000,
    role: "admin",
  }).save();
  new managersSchema({
    firstName: "employee",
    lastName: "role",
    email: "employee@gmail.com",
    password: bcrypt.hashSync("12345678", salt),
    hireDate: Date.now(),
    salary: 5000,
    role: "employee",
  }).save();
};
