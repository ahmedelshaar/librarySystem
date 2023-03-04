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
  managersSchema
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
  if (req.role == "admin" && req.params.id == req.id) {
    managersSchema
      .findOne({
        _id: req.params.id,
      })
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((err) => {
        next(err);
      });
  } else if (req.role == "super-admin" && req.params.id) {
    managersSchema
      .findOne({
        _id: req.params.id,
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
    image: req.file.filename, //should be deleted
    role: "admin",
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
        let hashedPass = req.body.password ? bcrypt.hashSync(req.body.password, salt) : req.body.password;
        // if (req.role == "admin" && req.body.id == req.id) {
        console.log(req.file);
        if (req.file) {
          console.log(data.image)
          fs.unlinkSync(path.join(__dirname, `../images/admins/${data.image}`));
        }
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
        // } else if (req.role == "super-admin") {
        //   if (req.file) {
        //     fs.unlinkSync(path.join(__dirname, `../images/admins/${data.image}`));
        //   }
        //   return managersSchema.updateOne(
        //     {
        //       _id: req.body.id,
        //     },
        //     {
        //       $set: {
        //         firstName: req.body.firstName,
        //         lastName: req.body.lastName,
        //         email: req.body.email,
        //         password: hashedPass,
        //         birthDate: req.body.birthDate,
        //         salary: req.body.salary,
        //         image: req.file.filename,
        //         role: req.body.role,
        //       },
        //     }
        //   );
        // } else {
        //   throw new Error("You are not allowed to do this action");
        // }
      }
    })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => next(err));
};

// Delete admin
exports.deleteAdmin = (req, res, next) => {
  managersSchema
    .findOne({ _id: req.body.id })
    .then((data) => {
      if (!data) {
        throw new Error("Admin not found");
      } else {
        if (data.image) {
          fs.unlinkSync(path.join(__dirname, `../images/admins/${data.image}`));
        }
        return managersSchema.deleteOne({ _id: req.body.id });
      }
    })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      next(err);
    });
};
