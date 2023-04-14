const fs = require('fs');

const express = require('express');

const mongoose = require('mongoose');

require('dotenv').config({ path: './.env' });

const cors = require('cors');

const logger = require('morgan');

const api = require('./API/api');
const lol = require('./lol');




require('./services/folderValidations');



const authenticator = require('./middlewares/authenticationMw');



// import Routes

const LoginRoute = require('./routes/authenticationRouter');

const superAdminRouter = require('./routes/superAdminRouter');

const adminRouter = require('./routes/adminRouter');

const employeeRouter = require('./routes/employeeRouter');

const bookRouter = require('./routes/bookRouter');

const memberRouter = require('./routes/memberRouter');

// require('./services/sender');
const bookController = require('./controllers/bookController');
const { categories } = require('./Core/Static/categories');
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


// console.log(cloudinary.config());



app.use(cors());

app.use(logger('dev'));

app.use(express.json({ limit: '2mb' }));

app.use(express.urlencoded({ extended: false, limit: '2mb' }));



// SWAGGER API

app.use(lol);
app.use(api);

// get request to /books use get All Books
app.get('/categories', (req, res, next) => {

	res.status(200).json({ data: categories });

});
app.get('/books', bookController.getPublicBooks);
app.get('/book/:id', bookController.getPublicBookByID);
app.get('/latest', bookController.getLatestBooks);


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

	res.status(status).json({ message: {"error":err + ''} });

	// Delete Saved files in case of error throwing

	if (req.file && req.file.path) fs.unlinkSync(req.file.path);

});



module.exports = app;

