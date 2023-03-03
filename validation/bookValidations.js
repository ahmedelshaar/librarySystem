const { body,param,buildCheckFunction } = require("express-validator");
const {categories} = require("../Core/Static/categories");

const checkBodyAndParams = buildCheckFunction(['params','body']);


exports.getValidator = exports.deleteValidator = [
    checkBodyAndParams("id").isInt().withMessage("Id should be Number").toInt()
];

exports.postValidator = [
    // Strings
    body("title").isString().withMessage("title should be String"),
    body("auther").isString().withMessage("auther should be String"),
    body("publisher").isString().withMessage("publisher should be String"),
    body("Category").isIn(categories).withMessage(`Category should be in [${categories}]`),
    // Numbers
    body("PublishingDate").isISO8601().withMessage("PublishingDate should be A valid Date").toDate(),
    body("Edition").isInt({min:1}).withMessage("Edition should be Number").toInt(),
    body("NoOfCopies").isInt({min:1}).withMessage("NoOfCopies should be Number").toInt(),
    body("shelfNo").isInt({min:1}).withMessage("shelfNo should be Number").toInt(),
    // Boolean
    body("Avilable").optional().isBoolean().withMessage("Avilable should be Boolean").toBoolean(),
    // body("Avilable").isBoolean().withMessage("Avilable should be Boolean").toBoolean(),
    
];

exports.patchValidator =[
    checkBodyAndParams("id").isInt().withMessage("ID should be Number").toInt(),
    ...[exports.postValidator.map(elem=>elem.optional())]
];