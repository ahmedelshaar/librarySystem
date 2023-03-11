const { Router } = require("express");
const validator = require("../validation/authenticationValidation");
const validationMiddleware = require("../validation/validationMW");
const { login, loginAdministration, setData } = require("../controllers/loginController");
const saveImage = require("../services/saveImage");
const routes = new Router();

routes.post("/login/administration", validator.loginValidation, validationMiddleware, loginAdministration);
routes.post("/login", validator.loginValidation, validationMiddleware, login);
routes.post("/setData", saveImage("admins"), validator.setData, validationMiddleware, setData)

module.exports = routes;
