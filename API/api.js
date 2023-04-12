const { Router } = require('express');

// swagger Docs
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const routes = new Router();

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Library API',
			version: '1.0.0',
			description: 'A simple Express Library API',
		},
		servers: [
			{
				url: 'http://localhost:' + process.env.PORT,
			},
		],
	},
	apis: ['./Docs/*.js'],
};

const specs = swaggerJSDoc(options);


module.exports = routes.use('/api', swaggerUI.serve, swaggerUI.setup(specs));
