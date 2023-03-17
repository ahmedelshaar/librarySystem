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
*	  post:
*      tags:
*        - user
*      summary: Logs user into the system
*      description: ''
*      operationId: loginUser
*      parameters:
*        - name: email
*          in: query
*          description: The email for login
*          required: false
*          schema:
*            type: string
*        - name: password
*          in: query
*          description: The password for login in clear text
*          required: false
*          schema:
*            type: string
*      responses:
*        '200':
*          description: successful operation
*          headers:
*            X-Rate-Limit:
*              description: calls per hour allowed by the user
*              schema:
*                type: integer
*                format: int32
*            X-Expires-After:
*              description: date in UTC when token expires
*              schema:
*                type: string
*                format: date-time
*          content:
*            application/xml:
*              schema:
*                type: string
*            application/json:
*              schema:
*                type: string
*        '400':
*          description: Invalid username/password supplied
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
