const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("../models/managersModel");
const managersSchema = mongoose.model("managers");
const path = require("path");
const fs = require("fs");

// bcrybt
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

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

// Get Admin by id
exports.getAdminById = (req, res, next) => {
  if (req.role == "admin" && (req.body.id || req.params.id) == req.id) {
    adminAndEmpSchema
      .findOne({
        _id: req.body.id || req.params.id,
      })
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((err) => {
        next(err);
      });
  } else if (req.role == "super-admin" && (req.body.id || req.params.id)) {
    adminAndEmpSchema
      .findOne({
        _id: req.body.id || req.params.id,
      })
      .then((data) => {
        if (!data) {
          throw new Error("Admin not found");
        } else {
          res.status(200).json({ data });
        }
      })
      .catch((err) => {
        next(err);
      });
  } else {
    res.status(401).json({ message: "You didn't enter id or not authorized to see these records" });
  }
};

// Add new admin
exports.addAdmin = (req, res, next) => {
  const newAdmin = new managersSchema({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),
    birthDate: req.body.birthDate,
    hireDate: req.body.hireDate,
    salary: req.body.salary,
    image: req.file.filename, //Why not req.body,image
    role: req.body.role,
  });
  newAdmin
    .save()
    .then((data) => {
      res.status(201).json({ data });
    })
    .catch((err) => {
      next(err);
    });
};

// Update admin data
exports.updateAdmin = (req, res, next) => {
  managersSchema
    .findOne({
      _id: req.body.id,
    })
    .then((data) => {
      if (!data) {
        throw new Error("Admin not found");
      } else {
        let hashedPass = request.body.password ? bcrypt.hashSync(request.body.password, salt) : request.body.password;
        if (request.role == "admin" && request.body.id == request.id) {
          delete req.body.email;
          delete req.body.hireDate;
          delete req.body.salary;
          delete req.body.role;
          if (req.file) {
            fs.unlinkSync(path.join(__dirname, `../images/admins/${data.image}`));
            return managersSchema.updateOne(
              {
                _id: req.body.id,
              },
              {
                $set: {
                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  password: hashedPass,
                  birthDate: req.body.birthDate,
                  image: req.file.filename,
                },
              }
            );
          } else {
            return managersSchema.updateOne(
              {
                _id: req.body.id,
              },
              {
                $set: {
                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  password: hashedPass,
                  birthDate: req.body.birthDate,
                },
              }
            );
          }
        } else if (req.role == "super-admin") {
          delete req.body.hireDate;
          if (req.file) {
            fs.unlinkSync(path.join(__dirname, `../images/admins/${data.image}`));
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
                  image: req.file.filename,
                  role: req.body.role,
                },
              }
            );
          } else {
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
                  role: req.body.role,
                },
              }
            );
          }
        } else {
          throw new Error("You are not allowed to do this action");
        }
      }
    });
};

// Delete admin
exports.deleteAdmin = (req, res, next) => {
  adminAndEmpSchema
    .findOne({ _id: req.body.id })
    .then((data) => {
      if (!data) {
        throw new Error("Admin not found");
      } else {
        fs.unlinkSync(path.join(__dirname, `../images/admins/${data.image}`));
        return managersSchema.deleteOne({ _id: req.body.id });
      }
    })
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
