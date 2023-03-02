const { check } = require("express-validator");
exports.loginValidation = [
    check("email").isEmail()
    .normalizeEmail()
    .withMessage(" not valid email"),

    check("password").isAlphanumeric()
    .withMessage(" should be any char")
    .isLength({min:5})
    .withMessage("min 5 chars")
    .matches(/\d/)
    .withMessage('must contain a number'),
];