const { param } = require("express-validator");

//Id validation
exports.validateParamInteger = [param("id").isLength({ min: 1 }).isInt().withMessage(" Must be an Integer")];

//Name validation
exports.validateParamName = [param("firstName").isLength({ min: 1 }).isString().withMessage(" Must be at least 1 characters long String")];
