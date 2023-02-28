const { Router } = require("express");
const {login} = require("../controllers/loginController");
const routes = new Router();

routes.post('/login', login)


module.exports = routes;
