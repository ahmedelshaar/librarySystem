const { request, response } = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
// bcrybt
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

require("../models/managersModel");
require("../models/memberModel");
const ManagersSchema = mongoose.model("managers");
const MemberSchema = mongoose.model("members");

const checkMailAndPassword = async (model, request, response, next) => {
  try {
    let data = await model.findOne({ email: request.body.email });
    if (data == null) {
      throw new Error("this user is not found");
    } else {
      let matched = await bcrypt.compare(request.body.password, data.password);
      if (!matched) throw new Error("either mail or password is wrong");
    }
    return data;
  } catch (error) {
    next(error);
  }
};

const createToken = (userData) => {
  const data = {
    id: userData._id,
    email: userData.email,
    role: userData.role,
  };
  if (userData.role == undefined) {
    data["role"] = "member";
    data["last_login"] = userData.last_login;
  }
  const accessToken = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "24h" });

  // create refresh token
  const refreshToken = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "7d" });
  return { accessToken, refreshToken };
};

exports.loginAdministration = async (request, response, next) => {
  try {
    const userData = await checkMailAndPassword(ManagersSchema, request, response, next);
    if (userData) {
      if (userData.image == undefined) response.status(400).json({ message: "You should Complete Your data" });
      const { accessToken, refreshToken } = await createToken(userData);
      const hashToken = await bcrypt.hash(refreshToken, salt);
      await ManagersSchema.updateOne({ _id: userData._id }, { $set: { token: hashToken } });
      response.status(200).json({ accessToken, refreshToken });
    }
  } catch (error) {
    next(error);
  }
};

exports.login = async (request, response, next) => {
  try {
    const userData = await checkMailAndPassword(MemberSchema, request, response, next);
    if (userData) {
      if (userData.image == undefined) response.status(400).json({ message: "you should Complete Your data" });
      const { accessToken, refreshToken } = createToken(userData);
      const hashToken = await bcrypt.hash(refreshToken, salt);
      await MemberSchema.updateOne({ _id: userData._id }, { $set: { token: hashToken, last_login: Date.now() } });
      response.status(200).json({ accessToken, refreshToken });
    }
  } catch (error) {
    next(error);
  }
};

exports.activationAdministration = async (request, response, next) => {
  try {
    const userData = await checkMailAndPassword(ManagersSchema, request, response, next);
    if (userData) {
      if (userData.image != undefined) {
        response.status(400).json({ message: "Your data is Complete Please Login" });
      } else {
        await ManagersSchema.updateOne(
          { _id: userData._id },
          {
            $set: {
              image: request.file.filename,
              password: bcrypt.hashSync(request.body.newpassword, salt),
              birthDate: request.body.birthDate,
            },
          }
        );
        response.status(200).json({ msg: "login!!!" });
      }
    }
  } catch (error) {
    next(error);
  }
};

exports.activation = async (request, response, next) => {
  try {
    const userData = await checkMailAndPassword(MemberSchema, request, response, next);
    if (userData) {
      if (userData.image != undefined) {
        response.status(400).json({ message: "Your data is Complete Please Login" });
      } else {
        await MemberSchema.updateOne(
          { _id: userData._id },
          {
            $set: {
              image: request.file.filename,
              password: bcrypt.hashSync(request.body.newpassword, salt),
              address: request.body.address,
              phone_number: req.body.phone_number,
              birth_date: req.body.birth_date,
            },
          }
        );
      }
      response.status(200).json({ msg: "login!!!" });
    }
  } catch (error) {
    next(error);
  }
};
