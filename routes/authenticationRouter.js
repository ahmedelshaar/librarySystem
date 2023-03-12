const { Router } = require("express");
const validator = require("../validation/authenticationValidation");
const validationMiddleware = require("../validation/validationMW");
const { login, loginAdministration, activation, activationAdministration } = require("../controllers/loginController");
const saveImage = require("../services/saveImage");
const routes = new Router();

routes.post("/login/administration", validator.loginValidation, validationMiddleware, loginAdministration);
routes.post("/login", validator.loginValidation, validationMiddleware, login);
routes.post("/activation", saveImage("firstImage"), validator.activation, validationMiddleware, activation);
routes.post(
  "/activation/administration",
  saveImage("firstImage"),
  validator.activationAdministration,
  validationMiddleware,
  activationAdministration
);

module.exports = routes;
