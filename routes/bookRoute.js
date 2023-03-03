const express = require("express");
const validator = require("../validation/validationMW");
const bookValidations = require("../validation/bookValidations");
const bookController=require("../controllers/bookController");
const router = express.Router();

const {categories} = require("../Core/Static/categories");

router.route("/books")
    
    .get(bookController.getAllBooks)
    .post(bookValidations.postValidator,validator,bookController.addClass)
    .patch(bookValidations.patchValidator,validator,bookController.updateClass)
    .delete(bookValidations.deleteValidator,validator,bookController.deleteBook)

router.route("/books/:id")

    .get(bookValidations.getValidator,validator,bookController.getBookByID)
    .patch(bookValidations.patchValidator,validator,bookController.updateClass)
    .delete(bookValidations.deleteValidator,validator,bookController.deleteBook)

router.route("/categories").get(
    (request,response,next)=>{
        response.status(200).json({data:categories}) // categories from Book Schema
    }
)

module.exports = router;
