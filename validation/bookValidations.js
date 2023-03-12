const { body,param,buildCheckFunction,query } = require("express-validator");
const {categories} = require("../Core/Static/categories");

// function to check in params and body it has to exist in one of them
const checkBodyAndParams = buildCheckFunction(['params','body']);

exports.getValidator = exports.deleteValidator = [
    param("id").isInt().withMessage("Id should be Number").toInt()
];

exports.postValidator = [
    // Strings
    body("title").isString().withMessage("title should be String").trim(),
    body("author").isString().withMessage("author should be String").trim(),
    body("publisher").isString().withMessage("publisher should be String").trim(),
    body("category").isIn(categories).withMessage(`Category should be in [${categories}]`).trim(),
    // Date
    body("publishingDate").isISO8601().withMessage("PublishingDate should be A valid Date").toDate(),
    // Numbers
    body("edition").isInt({min:1}).withMessage("Edition should be Number").toInt(),
    body("pages").isInt({min:1}).withMessage("Edition should be Number").toInt(),
    body("noOfCopies").isInt({min:1}).withMessage("NoOfCopies should be Number").toInt(),
    body("shelfNo").isInt({min:1}).withMessage("shelfNo should be Number").toInt(),
];

exports.patchValidator =[
    param("id").isInt().withMessage("ID should be Number").toInt(),
    ...[exports.postValidator.map(elem=>elem.optional())]
];

exports.borrowBookValidator = [
    body("member_id").isInt().withMessage("Member ID should be Number").toInt(),
    body("book_id").isInt().withMessage("Book ID should be Number").toInt(),
    body("expectedDate").isISO8601().withMessage("expectedDate should be A valid Date").toDate(),
];
exports.returnValidator = [
    body("member_id").isInt().withMessage("Member ID should be Number").toInt(),
    body("book_id").isInt().withMessage("Book ID should be Number").toInt(),
];

exports.readingBookValidator = [
    body("member_id").isInt().withMessage("Member ID should be Number").toInt(),
    body("book_id").isInt().withMessage("Book ID should be Number").toInt(),
];
exports.searchBookValidator = [
    query("author").isString().withMessage("author Must Be String").trim(),
    query("publisher").isString().withMessage("publisher Must Be String").trim(),
    query("category").isString().withMessage("Category Must Be String").trim(),
    query("year").isInt({ min: 0, max: 9999 }).withMessage("year Must Be Intger").toInt(),
    // query("available").isBoolean().withMessage("year Must Be Boolean"),

];









