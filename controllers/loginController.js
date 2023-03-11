const { request, response } = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const saveImage = require("../services/saveImage");
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
  const accessToken = jwt.sign(
    {
      id: userData._id,
      email: userData.email,
      role: userData.role,
    },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  );

  // create refresh token
  const refreshToken = jwt.sign(
    {
      id: userData._id,
      email: userData.email,
      role: userData.role,
    },
    process.env.SECRET_KEY,
    { expiresIn: "7d" }
  );
  return { accessToken, refreshToken };
};

exports.loginAdministration = async (request, response, next) => {
  try {
    const userData = await checkMailAndPassword(ManagersSchema, request, response, next);
    if (userData) {
      if (userData.image == undefined) response.status(400).json({ message: "You should Complete Your data" });
      const { accessToken, refreshToken } = createToken(userData);
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
      await MemberSchema.updateOne({ _id: userData._id }, { $set: { token: hashToken } });
      response.status(200).json({ accessToken, refreshToken });
    }
  } catch (error) {
    next(error);
  }
};

exports.setData = async (request, response, next) => {
  try {
    const userData = await checkMailAndPassword(ManagersSchema, request, response, next);
    if (userData) {
      if (userData.image != undefined) response.status(400).json({ message: "Your data is Complete Please Login" });
      ManagersSchema.updateOne(
        { _id: userData._id },
        { $set: { image: request.file.path, password: bcrypt.hashSync(request.body.newpassword, salt) } }
      );
      const { accessToken, refreshToken } = createToken(userData);
      const hashToken = await bcrypt.hash(refreshToken, salt);
      await ManagersSchema.updateOne({ _id: userData._id }, { $set: { token: hashToken } });
      response.status(200).json({ accessToken, refreshToken });
    }
  } catch (error) {
    next(error);
  }
};
