const { body, param, buildCheckFunction } = require("express-validator");
const checkBodyAndParams = buildCheckFunction(["params", "body"]);

// Get Validator
exports.validateGetById = [checkBodyAndParams("id").isInt().withMessage("Id should be Number").toInt()];

//Validation for adding admin
exports.validateAddAdmin = [
  body("firstName").isLength({ min: 1 }).isString().withMessage(" Must be at least 1 characters long String"),
  body("lastName").isLength({ min: 1 }).isString().withMessage(" Must be at least 1 characters long String"),
  body("email").isEmail().withMessage(" Must be a valid email"),
  body("password").isLength({ min: 4 }).withMessage(" Must be at least 4 characters long"),
  body("birthDate").isDate().withMessage(" Must be a valid date").toDate(),
  body("hireDate").isDate().withMessage(" Must be a valid date").toDate(),
  body("salary").isLength({ min: 1 }).isInt().withMessage(" Must be an Integer").toInt(),
  body("image").optional().isString().withMessage(" Must be an Image"),
  body("role").isIn(["super-admin", "admin"]).withMessage("Enter a Valid role"),
];

//Validation for updating admin
exports.validateUpdateAdmin = [
  body("firstName").optional().isLength({ min: 1 }).isString().withMessage(" Must be at least 1 characters long String"),
  body("lastName").optional().isLength({ min: 1 }).isString().withMessage(" Must be at least 1 characters long String"),
  body("email").optional().isEmail().withMessage(" Must be a valid email"),
  body("password").optional().isLength({ min: 4 }).withMessage(" Must be at least 4 characters long"),
  body("birthDate").optional().isDate().withMessage(" Must be a valid date").toDate(),
  body("hireDate").optional().isDate().withMessage(" Must be a valid date").toDate(),
  body("salary").optional().isLength({ min: 1 }).isInt().withMessage(" Must be an Integer").toInt(),
  body("image").optional().isString().withMessage(" Must be an Image"),
  body("role").optional().isIn(["super-admin", "admin"]).withMessage("Enter a Valid role"),
];
