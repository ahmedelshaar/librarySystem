const { body, param } = require("express-validator");

//Validation for adding admin
exports.validateAddAdmin = [
  body("firstName").isString().withMessage(" Must be a String"),
  body("lastName").isString().withMessage(" Must be a String"),
  body("email").isEmail().withMessage(" Must be a valid email"),
  body("password").isLength({ min: 4 }).withMessage(" Must be at least 4 characters long"),
  body("birthDate").isDate().withMessage(" Must be a valid date").toDate(),
  body("hireDate").isDate().withMessage(" Must be a valid date").toDate(),
  body("salary").isInt().withMessage(" Must be an Integer").toInt(),
  body("role").isIn(["super-admin", "admin"]).withMessage("Enter a Valid role"),
];

//Validation for updating admin
exports.validateUpdateAdmin = [
  body("id").isInt().withMessage(" Must be an Integer").toInt(),
  body("firstName").optional().isLength({ min: 1 }).isString().withMessage(" Must be a String"),
  body("lastName").optional().isString().withMessage(" Must be a String"),
  body("email").optional().isEmail().withMessage(" Must be a valid email"),
  body("password").optional().isLength({ min: 4 }).withMessage(" Must be at least 4 characters long"),
  body("birthDate").optional().isDate().withMessage(" Must be a valid date").toDate(),
  body("hireDate").optional().isDate().withMessage(" Must be a valid date").toDate(),
  body("salary").optional().isInt().withMessage(" Must be an Integer").toInt(),
  body("role").optional().isIn(["super-admin", "admin"]).withMessage("Enter a Valid role"),
];

//Validation for Param
exports.validateParam = [param("id").isInt().withMessage(" Must be an Integer").toInt()];
