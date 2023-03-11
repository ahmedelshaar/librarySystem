const { body, param } = require("express-validator");

exports.validateGetById = [param("id").isInt().withMessage("Id should be Number")];

exports.validateAddEmployee = [
  body("firstName").isAlpha().isLength({ min: 3 }).withMessage(" Must be at least 3 characters long String"),
  body("lastName").isAlpha().isLength({ min: 3 }).withMessage(" Must be at least 3 characters long String"),
  body("email").isEmail().withMessage(" Must be a valid email"),
  body("password").isLength({ min: 8 }).withMessage(" Must be at least 8 characters long"),
  body("birthDate").isDate().withMessage(" Must be a valid date"),
  body("hireDate").isDate().withMessage(" Must be a valid date"),
  body("salary").isInt({ min: 0 }).withMessage(" Must be an Integer")
];

exports.validateUpdateEmployee = [
  body("id").isInt().withMessage("Id should be Number"),
  body("firstName").optional().isAlpha().isLength({ min: 3 }).withMessage(" Must be at least 3 characters long String"),
  body("lastName").optional().isAlpha().isLength({ min: 3 }).withMessage(" Must be at least 3 characters long String"),
  body("email").optional().isEmail().withMessage("Must be a valid email"),
  body("password").optional().isLength({ min: 8 }).withMessage(" Must be at least 8 characters long"),
  body("birthDate").optional().isDate().withMessage(" Must be a valid date"),
  body("hireDate").optional().isDate().withMessage(" Must be a valid date"),
  body("salary").optional().isInt({min: 0}).withMessage(" Must be an Integer").toInt(),
];

exports.validateSearchEmployee = [
  body("term").isAlpha('en-US', { ignore: ' ' }).withMessage(" Must be Enter First Name"),
];