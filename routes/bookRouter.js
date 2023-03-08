const express = require("express");
const validator = require("../validation/validationMW");
const bookValidations = require("../validation/bookValidations");
const bookController = require("../controllers/bookController");
const router = express.Router();

const { categories } = require("../Core/Static/categories");

router
  .route("/books")
  .get(bookController.getAllBooks)
  .post(bookValidations.postValidator, validator, bookController.addBook);

router
  .route("/books/:id")
  .get(bookValidations.getValidator, validator, bookController.getBookByID)
  .patch(bookValidations.patchValidator, validator, bookController.updateBook)
  .delete(bookValidations.deleteValidator, validator, bookController.deleteBook);

router.route("/categories").get((request, response, next) => {
  response.status(200).json({ data: categories }); // categories for Book Schema
});
router.route("/author/:authorName").post(bookController.getBooksByAuthor);
// ###### Emp
// F
// books/author/:author
// books/publisher/:publisher
// books/title/:title

//g /books/gi
//g /books/borrowed

// h /books/new
// h /books/mostborrowed + /:_year
// h /books/mostreading + /:_year
//

// /members/:id/books

// books/:id/:<memberID>

// #MEMbER
// members/:id/readingbooks => filtered by month - year [body]
// members/:id/currentborrowed => filtered by month - year [body]
// /books query string [year , category ,publisher , author and availability]
//  /books 
module.exports = router;
