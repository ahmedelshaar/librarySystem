const express = require("express");
const validator = require("../validation/validationMW");
const bookValidations = require("../validation/bookValidations");
const bookController = require("../controllers/bookController");

const { isBanned } = require("../middlewares/checks");
const { isEmployee ,isMember,isAdmin,isMemberOnly } = require("../middlewares/authorizationMw");
const { categories } = require("../Core/Static/categories");

const router = express.Router();

router.route("/categories").get((req, res, next) => {
  res.status(200).json({ data: categories }); // categories for Book Schema
});
// reports
router.route("/reports").get(bookValidations.dayValidator, validator,isAdmin,bookController.log); // categories for Book Schema

const log = (req,res,next)=>{
  console.log("query",req.query);
  console.log("body",req.body);
  console.log("params",req.params);
  next()

}

router
  .route("/books")
  .all(isEmployee)
  //E
  .get(bookController.getAllBooks) 
  .post(bookValidations.postValidator, validator, bookController.addBook);

// F
router.route("/books/author/:name").get(bookValidations.paramName, validator,isEmployee,bookController.getBooksByAuthor);
router.route("/books/publisher/:name").get(bookValidations.paramName, validator,isEmployee,bookController.getBooksByPublisher);
router.route("/books/title/:name").get(bookValidations.paramName, validator,isEmployee,bookController.getBooksByTitle);

//G
router.route("/books/available").get(isEmployee,bookController.getAvailableBooks);
router.route("/books/borrowing").get(isEmployee,bookController.getBorrowingBooks);

//H   +  /new Member //D
router.route("/books/new").get(isMember,bookController.getNewBooks);

router.route("/books/mostborrowed/:year").get(log,bookValidations.paramYear, validator,isEmployee,bookController.mostBorrowedBooks);
router.route("/books/mostborrowed").get(isEmployee,bookController.mostBorrowedBooks);
router.route("/books/mostreading").get(isEmployee,bookController.mostReadingBooks);
router.route("/books/mostreading/:year").get(bookValidations.paramYear, validator,isEmployee,bookController.mostReadingBooks);


// I + K
router
  .route("/books/borrow") 
  .all(isEmployee)
  .post(bookValidations.borrowBookValidator, validator, isBanned, bookController.borrowBook)
  .delete(bookValidations.returnValidator, validator, bookController.returnBorrowedBook);

//J
router
  .route("/books/read")
  .all(isEmployee)
  .post(bookValidations.readingBookValidator, validator,bookController.readBook)
  .delete(bookValidations.readingBookValidator, validator, bookController.returnReadedBook); // return book from reading

//L
router.route("/books/late")
  .all(isEmployee)
  .get(bookController.getLateBooks);





// Members


/////////////// history???????
// e- Current borrowed books and return date and number of borrowed times for any book.(with warning with late returned books )
router.route("/books/currentborrow")
  .all(isMemberOnly)
  .get(bookController.currentBorrowedBooks);
// f- Search for any book in the library filtered by year , category , publisher , author and availability
router.route("/books/search")
  .all(isMember)
  .get(log,bookValidations.searchBookValidator,log, bookController.searchBooks);

// c- List of borrowed books in current month , this page will have capability of showing borrowed books filtered by month and year
router.route("/books/history/borrowed").all(isMemberOnly).get(bookController.memberBorrowedBooks);
router.route("/books/history/borrowed/:year").all(isMemberOnly).get(bookValidations.paramYear,bookController.memberBorrowedBooks);
router.route("/books/history/borrowed/:year/:month").all(isMemberOnly).get(bookValidations.paramYear,bookController.memberBorrowedBooks);

// b- List of reading books in current month , this page will have capability of showing reading books filtered by month and year
router.route("/books/history/reading").all(isMemberOnly).get(bookController.memberReadingBooks);
router.route("/books/history/reading/:year").all(isMemberOnly).get(bookValidations.paramYear, bookController.memberReadingBooks);
router.route("/books/history/reading/:year/:month").all(isMemberOnly).get(bookValidations.paramYear,bookController.memberReadingBooks);



router
  .route("/books/:id")
  .all(isEmployee)
  .get(bookValidations.getValidator, validator, bookController.getBookByID)
  .patch(bookValidations.patchValidator, validator, bookController.updateBook)
  .delete(bookValidations.deleteValidator, validator, bookController.deleteBook);


module.exports = router;



//https://gist.github.com/adnan-i/d82a956d67c153b5efc8
//https://devpress.csdn.net/mongodb/63048fae7e6682346619bc31.html