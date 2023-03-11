const express = require("express");
const validator = require("../validation/validationMW");
const bookValidations = require("../validation/bookValidations");
const bookController = require("../controllers/bookController");

const { isBanned } = require("../middlewares/checks");
const { isEmployee } = require("../middlewares/authorizationMw");
const { categories } = require("../Core/Static/categories");

const router = express.Router();

router.route("/categories").get((req, res, next) => {
  res.status(200).json({ data: categories }); // categories for Book Schema
});

router
  .route("/books")
  .get(bookController.getAllBooks)
  .post(bookValidations.postValidator, validator, bookController.addBook);

// permission emp
router
  .route("/books/borrow")
  .post(bookValidations.borrowBookValidator, validator, isBanned, bookController.borrowBook)
  .delete(bookValidations.returnValidator, validator, bookController.returnBorrowedBook);

// permission emp
router
  .route("/books/read")
  .post(bookValidations.readingBookValidator, validator,bookController.readBook)
  .delete(bookValidations.readingBookValidator, validator, bookController.returnReadedBook);


// permission emp
router.route("/books/author/:name").get(bookController.getBooksByAuthor);
router.route("/books/publisher/:name").get(bookController.getBooksByPublisher);
router.route("/books/title/:name").get(bookController.getBooksByTitle);



router.route("/books/available").get(bookController.getAvailableBooks);
router.route("/books/borrowing").get(bookController.getBorrowingBooks);
router.route("/books/late").get(bookController.getLateBooks);
router.route("/books/new").get(bookController.getNewBooks);

//https://gist.github.com/adnan-i/d82a956d67c153b5efc8
//https://devpress.csdn.net/mongodb/63048fae7e6682346619bc31.html
// router.route("/books/mostborrowed/:year").get(bookController.getNewBooks);
// router.route("/books/mostreading/:year").get(bookController.getNewBooks);



/////////////// history???????
// e- Current borrowed books and return date and number of borrowed times for any book.(with warning with late returned books )
router.route("/books/currentborrow").get(bookController.currentBorrowedBooks);

router
  .route("/books/:id")
  .get(bookValidations.getValidator, validator, bookController.getBookByID)
  .patch(bookValidations.patchValidator, validator, bookController.updateBook)
  .delete(bookValidations.deleteValidator, validator, bookController.deleteBook);



// Members
// b- List of reading books in current month , this page will have capability of showing reading books filtered by month and year
// c- List of borrowed books in current month , this page will have capability of showing borrowed books filtered by month and year
// d- New arrived books => /books/new
// f- Search for any book in the library filtered by year , category , publisher , author and availability 
module.exports = router;
