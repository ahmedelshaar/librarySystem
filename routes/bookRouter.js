const express = require('express');

const validator = require('../validation/validationMW');

const bookValidations = require('../validation/bookValidations');

const bookController = require('../controllers/bookController');

const saveImage = require('../services/saveImage');

const { isBanned } = require('../middlewares/checks');

const { isEmployee, isMember, isAdmin, isMemberOnly } = require('../middlewares/authorizationMw');

const { categories } = require('../Core/Static/categories');

const imageUploader = require("../services/imageUploader");

const router = express.Router();



// Books borrowing/reading log

router.route('/reports').get(bookValidations.dayValidator, validator, isAdmin, bookController.log);



router

	.route('/books')

	// .all(isEmployee)

	.get(bookController.getAllBooks)

	.post(isEmployee, saveImage('books'),imageUploader,bookValidations.postValidator, validator, bookController.addBook);



router

	.route('/books/author/:name')

	.get(isEmployee, bookValidations.paramName, validator, bookController.getBooksByAuthor);



router

	.route('/books/publisher/:name')

	.get(isEmployee, bookValidations.paramName, validator, bookController.getBooksByPublisher);



router

	.route('/books/title/:name')

	.get(isEmployee, bookValidations.paramName, validator, bookController.getBooksByTitle);



router.route('/books/available').get(isEmployee, bookController.getAvailableBooks);



router.route('/books/borrowing').get(isEmployee, bookController.getBorrowingBooks);



router.route('/books/new').get(isMember, bookController.getNewBooks);



router.route('/books/mostborrowed').get(isEmployee, bookController.mostBorrowedBooks);



router

	.route('/books/mostborrowed/:year')

	.get(isEmployee, bookValidations.paramYear, validator, bookController.mostBorrowedBooks);



router.route('/books/mostreading').get(isEmployee, bookController.mostReadingBooks);



router

	.route('/books/mostreading/:year')

	.get(isEmployee, bookValidations.paramYear, validator, bookController.mostReadingBooks);



router

	.route('/books/borrow')

	.all(isEmployee)

	.post(bookValidations.borrowBookValidator, validator, isBanned, bookController.borrowBook)

	// return book from borrowing

	.delete(bookValidations.returnValidator, validator, bookController.returnBorrowedBook);



router

	.route('/books/read')

	.all(isEmployee)

	.post(bookValidations.readingBookValidator, validator, bookController.readBook)

	// return book from reading

	.delete(bookValidations.readingBookValidator, validator, bookController.returnReadedBook);



router.route('/books/late').all(isEmployee).get(bookController.getLateBooks);



// e- Current borrowed books and return date and number of borrowed times for any book.(with warning with late returned books )

router.route('/books/currentborrow').all(isMemberOnly).get(bookController.currentBorrowedBooks);



// f- Search for any book in the library filtered by year , category , publisher , author and availability

router.route('/books/search').all(isMember).get(bookController.searchBooks);



router

	.route('/books/search')

	.all(isMember)

	.get(bookValidations.searchBookValidator, validator, bookController.searchBooks);



// c- List of borrowed books in current month , this page will have capability of showing borrowed books filtered by month and year

router.route('/books/history/borrowed').all(isMemberOnly).get(bookController.memberBorrowedBooks);



router

	.route('/books/history/borrowed/:year')

	.all(isMemberOnly)

	.get(bookValidations.paramYear, validator, bookController.memberBorrowedBooks);



router

	.route('/books/history/borrowed/:year/:month')

	.all(isMemberOnly)

	.get(bookValidations.paramYear, validator, bookController.memberBorrowedBooks);



// b- List of reading books in current month , this page will have capability of showing reading books filtered by month and year

router.route('/books/history/reading').all(isMemberOnly).get(bookController.memberReadingBooks);



router

	.route('/books/history/reading/:year')

	.all(isMemberOnly)

	.get(bookValidations.paramYear, validator, bookController.memberReadingBooks);



router

	.route('/books/history/reading/:year/:month')

	.all(isMemberOnly)

	.get(bookValidations.paramYear, validator, bookController.memberReadingBooks);



router

	.route('/books/:id')

	.all(isEmployee)

	.get(bookValidations.getValidator, validator, bookController.getBookByID)

	.patch(bookValidations.patchValidator, validator, bookController.updateBook)

	.delete(bookValidations.deleteValidator, validator, bookController.deleteBook);



module.exports = router;

