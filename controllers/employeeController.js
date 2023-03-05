const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("../models/managersModel");
const path = require("path");
const fs = require("fs");
const managersSchema = mongoose.model("managers");

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

exports.getAllEmployees = (req, res, next) => {
  managersSchema
  .find({ role: "employee" }, { password: 0 })
  .then((data) => {
    res.status(200).json({ data });
  })
  .catch((err) => {
    next(err);
  });
};

exports.getEmployeeById = (req, res, next) => {
  managersSchema
  .findOne({
    _id: req.params.id,
  }, { password: 0 })
  .then((data) => {
    res.status(200).json({ data: data });
  })
  .catch((err) => {
    next(err);
  });
};

exports.seacrchEmployee = (req, res, next) => {
  managersSchema
  .find({
    $and : [
      { role: "employee" },
      { $or: [
          { firstName: { $regex: req.body.firstName, $options: "i" } },
          { lastName: { $regex: req.body.lastName, $options: "i" } },
        ]
      }
    ]
  }, { password: 0 })
  .then((data) => {
    res.status(200).json({ data });
  })
  .catch((err) => {
    next(err);
  });
};

exports.autoComplete = (req, res, next) => {
  managersSchema
  .find({
    $and : [
      { role: "employee" },
      { $or: [
          { firstName: { $regex: req.body.firstName, $options: "i" } },
          { lastName: { $regex: req.body.lastName, $options: "i" } },
        ]
      }
    ]
  }, { firstName: 1, lastName: 1 })
  .then((data) => {
    res.status(200).json({ data });
  })
  .catch((err) => {
    next(err);
  });
};

exports.addEmployee = (req, res, next) => {
  const newEmployee = new managersSchema({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),
    birthDate: req.body.birthDate,
    hireDate: req.body.hireDate,
    salary: req.body.salary,
    role: "employee",
  });
  newEmployee
  .save()
  .then((data) => {
    res.status(201).json({ data });
  })
  .catch((err) => {
    next(err);
  });
};

exports.updateEmployee = (req, res, next) => {
  managersSchema
    .findOne({
      _id: req.body.id,
      role: "employee"
    })
    .then((data) => {
      if (!data) {
        throw new Error("Employee not found");
      }
      let password = req.body.password ? bcrypt.hashSync(req.body.password, salt) : undefined;

      if (req.role == "employee") {
        if(req.body.id != req.id){
          throw new Error("You can't update other employee");
        }
        delete req.body.salary;
        delete req.body.role;
      }

      if (req.file) {
        fs.unlinkSync(path.join(__dirname, `../images/employee/${data.image}`));
      }

      return managersSchema.updateOne(
        {
          _id: req.body.id,
        },
        {
          $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: password,
            birthDate: req.body.birthDate,
            image: req.file.filename,
            salary: req.body.salary,
            role: req.body.role,
          },
        }
      );
    }).then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteEmployee = (req, res, next) => {
  let count = managersSchema
  .findOne({ _id: req.body.id, role: "employee" }).countDocuments()
  .then((data) => {
    if (!data) {
      throw new Error("Employee not found");
    } else {
      fs.unlinkSync(path.join(__dirname, `../images/employee/${data.image}`));
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