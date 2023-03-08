const express = require("express");
const validator = require("../validation/validationMW");
const bookValidations = require("../validation/bookValidations");
const bookController=require("../controllers/bookController");
const router = express.Router();

const {categories} = require("../Core/Static/categories");

router.route("/books")
    
    .get(bookController.getAllBooks)
    .post(bookValidations.postValidator,validator,bookController.addBook)
    // .patch(bookValidations.patchValidator,validator,bookController.updateBook)      // in case id was in body not params
    // .delete(bookValidations.deleteValidator,validator,bookController.deleteBook)    // in case id was in body not params

router.route("/books/:id")

    .get(bookValidations.getValidator,validator,bookController.getBookByID)
    .patch(bookValidations.patchValidator,validator,bookController.updateBook)      // more priorty than body
    .delete(bookValidations.deleteValidator,validator,bookController.deleteBook)    // more priorty than body

router.route("/categories").get(
    (request,response,next)=>{
        response.status(200).json({data:categories}) // categories for Book Schema
    }
)
// ###### Emp 
// F
// books/author/:author
// books/publisher/:publisher
// books/title/:title

//g /books/availbe
//g /books/borrowed

// h /books/new
// h /books/mostborrowed + /:_year
// h /books/mostreading + /:_year
// 



// /members/:id/books
module.exports = router;
