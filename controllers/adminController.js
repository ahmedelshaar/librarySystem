const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("./../models/adminAndEmpModel");
const adminAndEmpSchema = mongoose.model("adminAndEmp");

// Get all Admins
exports.getAllAdmins = (req, res, next) => {
  adminAndEmpSchema
    .find({ role: "admin" })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      next(err);
    });
};

// Add new admin
exports.addAdmin = (req, res, next) => {};

// Update admin
exports.updateAdmin = (req, res, next) => {};

// Delete admin
exports.deleteAdmin = (req, res, next) => {
  adminAndEmpSchema
    .deleteOne({ _id: req.body.id })
    .then((data) => {
      if (data.deletedCount == 0) {
        throw new Error("Admin not found");
      } else {
        res.status(200).json({ data });
      }
    })
    .catch((err) => {
      next(err);
    });
};

// Get Admin by First Name
exports.getAdminByFirstName = (req, res, next) => {};
