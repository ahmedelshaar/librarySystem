const { Router } = require("express");
const validator = require("../validation/authenticationValidation");
const validationMiddleware = require("../validation/validationMW");
const { login } = require("../controllers/loginController");
const routes = new Router();

routes.post("/login", validator.loginValidation, validationMiddleware, login);

module.exports = routes;
