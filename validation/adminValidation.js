const { body } = require("express-validator");

//Validation for adding admin
exports.validateAddAdmin = [
  body("firstName").isLength({ min: 1 }).isString().withMessage(" Must be at least 1 characters long String"),
  body("lastName").isLength({ min: 1 }).isString().withMessage(" Must be at least 1 characters long String"),
  body("email").isEmail().withMessage(" Must be a valid email"),
  body("password").isLength({ min: 4 }).withMessage(" Must be at least 4 characters long"),
  body("birthDate").isDate().withMessage(" Must be a valid date"),
  body("hireDate").isDate().withMessage(" Must be a valid date"),
  body("salary").isLength({ min: 1 }).isInt().withMessage(" Must be an Integer"),
  body("image").optional().isString().withMessage(" Must be at least 1 characters long String"),
  body("role").isIn(["super-admin", "admin"]).withMessage("Enter a Valid role"),
];

//Validation for updating admin
exports.validateUpdateAdmin = [
  body("firstName").optional().isLength({ min: 1 }).isString().withMessage(" Must be at least 1 characters long String"),
  body("lastName").optional().isLength({ min: 1 }).isString().withMessage(" Must be at least 1 characters long String"),
  body("email").optional().isEmail().withMessage(" Must be a valid email"),
  body("password").optional().isLength({ min: 4 }).withMessage(" Must be at least 4 characters long"),
  body("birthDate").optional().isDate().withMessage(" Must be a valid date"),
  body("hireDate").optional().isDate().withMessage(" Must be a valid date"),
  body("salary").optional().isLength({ min: 1 }).isInt().withMessage(" Must be an Integer"),
  body("image").optional().isString().withMessage(" Must be at least 1 characters long String"),
  body("role").optional().isIn(["super-admin", "admin"]).withMessage("Enter a Valid role"),
];

//