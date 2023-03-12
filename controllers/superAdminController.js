const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("../models/managersModel");
const managersSchema = mongoose.model("managers");
const path = require("path");
const fs = require("fs");
const sendMails = require("../services/sendMails");

// bcrybt
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

// Get all Admins
exports.getAllSuperAdmins = (req, res, next) => {
  managersSchema
    .find({ role: "super-admin" })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      next(err);
    });
};

// Get Admin by id
exports.getSuperAdminById = (req, res, next) => {
  managersSchema
    .findOne({
      _id: req.params.id,
      role: "super-admin",
    })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      next(err);
    });
};

// Add new admin
exports.addSuperAdmin = (req, res, next) => {
  const newAdmin = new managersSchema({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),
    hireDate: req.body.hireDate,
    salary: req.body.salary,
    role: "super-admin",
  });
  newAdmin
    .save()
    .then((data) => {
      // send email with user credentials 
      sendMails( req.body.email, req.body.firstName,req.body.password);
      res.status(201).json({ data });
    })
    .catch((err) => {
      next(err);
    });
};

// Update admin data
exports.updateSuperAdmin = (req, res, next) => {
  managersSchema
    .findOne({
      _id: req.body.id,
      role: "super-admin",
    })
    .then((data) => {
      if (!data) {
        throw new Error("Admin not found");
      } else {
        let hashedPass = req.body.password ? bcrypt.hashSync(req.body.password, salt) : req.body.password;
        if (req.file && data.image) {
          fs.unlinkSync(path.join(__dirname, "..", "images", `${data.image}`));
        }
        return managersSchema.updateOne(
          {
            _id: req.body.id,
          },
          {
            $set: {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: hashedPass,
              birthDate: req.body.birthDate,
              salary: req.body.salary,
              image: req.file?.filename,
              role: req.body.role,
            },
          }
        );
      }
    })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => next(err));
};

// Delete admin
exports.deleteSuperAdmin = (req, res, next) => {
  managersSchema
    .find({ role: "super-admin" })
    .then((data) => {
      if (data.length == 1) {
        throw new Error("You can't delete the last super admin");
      }
      return managersSchema.findOne({ _id: req.body.id, role: "super-admin" });
    })
    .then((data) => {
      if (!data) {
        throw new Error("Admin not found");
      } else { 
        if (data.image) {
          fs.unlinkSync(path.join(__dirname, "..", "images", `${data.image}`));
        }
        return managersSchema.deleteOne({ _id: req.body.id });
      }
    })
    .then(() => {
      res.status(200).json({ data: "Deleted" });
    })
    .catch((err) => {
      next(err);
    });
};
