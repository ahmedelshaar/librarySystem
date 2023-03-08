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
  const accessToken = jwt.sign(
    {
      id: userData._id,
      email: userData.email,
      role: userData.role,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
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
    // TOOD: get user from dataBase if  exists
    const userData = await checkMailAndPassword(ManagersSchema, request, response, next);
    if (userData) {
      // create refresh token
      const { accessToken, refreshToken } = createToken(userData);

      // TOOD: store refreshToken in dataBase (user Model)
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
    // TOOD: get user from dataBase if  exists
    const userData = await checkMailAndPassword(MemberSchema, request, response, next);
    if (userData) {
      // create refresh token
      const { accessToken, refreshToken } = createToken(userData);
      // TOOD: store refreshToken in dataBase (member Model)
      const hashToken = await bcrypt.hash(refreshToken, salt);
      await MemberSchema.updateOne({ _id: userData._id }, { $set: { token: hashToken } });
      response.status(200).json({ accessToken, refreshToken });
    }
  } catch (error) {
    next(error);
  }
};
