const { Router } = require('express');
const validator = require('../validation/authenticationValidation');
const validationMiddleware = require('../validation/validationMW');
const { login, loginAdministration, activation, activationAdministration } = require('../controllers/loginController');
const saveImage = require('../services/saveImage');
const routes = new Router();

const lol = (req, res, next) => {
	console.log(req.body);
	console.log(req.file);
	next();
};

const saveOnBody = (req, res, next) => {
	if (req.file && req.file.path) req.body.image = req.file.filename;
	next();
};

routes.post('/login/administration', validator.loginValidation, validationMiddleware, loginAdministration);
/**
* @swagger
* /login:
*   get:
*     summary: this is login route
*     description: desc
*     responses:
*       200:
*         good
*/



routes.post('/login', validator.loginValidation, validationMiddleware, login);
routes.post('/activation', saveImage('firstImage'), saveOnBody, validator.activation, validationMiddleware, activation);
routes.post(
	'/activation/administration',
	saveImage('firstImage'),
	validator.activationAdministration,
	validationMiddleware,
	activationAdministration
);

module.exports = routes;
