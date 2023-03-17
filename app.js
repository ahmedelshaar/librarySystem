const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });
const cors = require('cors');
const logger = require('morgan');

// swagger Docs
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

require('./services/folderValidations');

const authenticator = require('./middlewares/authenticationMw');

// import Routes
const LoginRoute = require('./routes/authenticationRouter');
const superAdminRouter = require('./routes/superAdminRouter');
const adminRouter = require('./routes/adminRouter');
const employeeRouter = require('./routes/employeeRouter');
const bookRouter = require('./routes/bookRouter');
const memberRouter = require('./routes/memberRouter');
require('./services/sender');

const app = express();
// ========= server =========
mongoose.set('strictQuery', true);
mongoose
	.connect(process.env.MongoUrl)
	.then(() => {
		console.log('DB connected');
		app.listen(process.env.PORT || 8080, () => console.log(`listening on http://localhost:${process.env.PORT}`));
	})
	.catch((error) => console.log(`DB connection error ${error}`));

//============server=========
app.use(cors());
app.use(logger('dev'));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: false, limit: '2mb' }));

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
	apis: ['./routes/*.js'],
};

const specs = swaggerJSDoc(options);
app.use('/api', swaggerUI.serve, swaggerUI.setup(specs));

//login

app.use(LoginRoute);
app.use(authenticator); // authentication layer
//routing
app.use(superAdminRouter);
app.use(adminRouter);
app.use(employeeRouter);
app.use(memberRouter);
app.use(bookRouter); //  /books and /categories routes

// not found Middleware
app.use((req, res, next) => {
	res.status(404).json({ massage: 'page not found' });
	if (req.file && req.file.path) fs.unlinkSync(req.file.path);
});

// error Middleware
app.use((err, req, res, next) => {
	let status = err.status || 500;
	res.status(status).json({ message: err + '' });
	// Delete Saved files in case of error throwing
	if (req.file && req.file.path) fs.unlinkSync(req.file.path);
});

module.exports = app;
