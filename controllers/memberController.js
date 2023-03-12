const mongoose = require("mongoose");
require("./../models/memberModel");

const bcrypt = require("bcrypt");
const saltRound = 10;
const salt = bcrypt.genSaltSync(saltRound);
const MemberSchema = mongoose.model("members");
const path = require("path");
const fs = require("fs");

exports.getAllMembers = (req, res, next) => {
  MemberSchema.find({})
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getMembers = (req, res, next) => {
  MemberSchema.findById(req.params.id)
    .then((data) => {
      // console.log(data + "Hi");
      if (data == null) {
        next(new Error("Member Not Found"));
      } else {
        res.status(200).json({ data });
      }
    })
    .catch((error) => {
      next(error);
    });
};

exports.searchByName = (req, res, next) => {
  MemberSchema.find({ full_name: { $regex: "^" + req.body.full_name } })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      next(err);
    });
};

exports.addMember = (req, res, next) => {
  new MemberSchema({
    full_name: req.body.full_name,
    password: bcrypt.hashSync(req.body.password, salt),
    email: req.body.email,
  })
    .save()
    .then((data) => {
      res.status(201).json({ success: true, data: data });
    })
    .catch((error) => {
      if (error.message.includes("E11000")) {
        error.message = "This Email Allready Exists";
      }
      next(error);
    });
};

exports.updateMember = (req, res, next) => {
  MemberSchema.findOne({
    _id: req.body.id,
  }).then((data) => {
    if (!data) {
      next(new Error("Member Not Found"));
    } else {
      let hashedPass = req.body.password ? bcrypt.hashSync(req.body.password, salt) : req.body.password;
      if (req.body.id != req.id) {
        let error = new Error("Not Authenticated");
        error.status = 401;
        next(error);
      }
      if (req.file && req.file.path && data.image != null) {
        try {
          if (fs.existsSync(path.join(__dirname, "..", "images", `${data.image}`))) {
            fs.unlinkSync(path.join(__dirname, "..", "images", `${data.image}`));
          }
        } catch (error) {
          next(error);
        }
      }
      return MemberSchema.updateOne(
        {
          _id: req.body.id,
        },
        {
          $set: {
            full_name: req.body.full_name,
            password: hashedPass,
            image: req.file.filename,
            phone_number: req.body.phone_number,
            birth_date: req.body.birth_date, // year-month-day => 1996-02-01
            address: req.body.address,
          },
        }
      )
        .then((data) => {
          res.status(200).json({ data: "Updated" });
        })
        .catch((error) => {
          next(error);
        });
    }
  });
};

exports.deleteMember = (req, res, next) => {
  MemberSchema.findOne({
    _id: req.body.id,
  }).then((data) => {
    if (!data) {
      next(new Error("Member Not Found"));
    } else {
      // if (data.image) {
      try {
        if (fs.existsSync(path.join(__dirname, "..", "images", `${data.image}`))) {
          fs.unlinkSync(path.join(__dirname, "..", "images", `${data.image}`));
        }
      } catch (error) {
        next(error);
      }
      // fs.unlinkSync(path.join(__dirname, "..", "images", `${data.image}`));
      // }
      return MemberSchema.deleteOne({ _id: req.body.id })
        .then((data) => {
          res.status(200).json({ data: "Deleted" });
        })
        .catch((error) => {
          next(error);
        });
    }
  });
};
