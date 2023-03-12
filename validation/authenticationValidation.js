const { check } = require("express-validator");
exports.loginValidation = [
  check("email").isEmail().withMessage(" not valid email"),

  check("password")
    .isAlphanumeric()
    .withMessage(" should be any char")
    .isLength({ min: 8 })
    .withMessage("min 5 chars")
    .matches(/\d/)
    .withMessage("must contain a number"),
];

exports.activationAdministration = [
  check("email").isEmail().withMessage(" not valid email"),
  check("password").isLength({ min: 8 }).withMessage(" not valid password"),
  check("newpassword").isLength({ min: 8 }).withMessage(" not valid newpassword"),
  check("birthDate").isDate().withMessage("Not valid birthDate"),
];

exports.activation = [
  check("email").isEmail().withMessage(" not valid email"),
  check("password").isLength({ min: 8 }).withMessage(" not valid password"),
  check("newpassword").isLength({ min: 8 }).withMessage(" not valid newpassword"),
  check("birthDate").isDate().withMessage("Not valid birthDate"),
];