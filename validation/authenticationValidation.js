const { check } = require('express-validator');
exports.loginValidation = [
	check('email').isEmail().withMessage(' not valid email').normalizeEmail(),

	check('password')
		.isAlphanumeric()
		.withMessage(' should be any char')
		.isLength({ min: 8 })
		.withMessage('min 8 chars')
		.matches(/\d/)
		.withMessage('must contain a number'),
];

exports.activationAdministration = [
	check('email').isEmail().withMessage(' not valid email'),
	check('password').isLength({ min: 8 }).withMessage(' not valid password'),
	check('newpassword').isLength({ min: 8 }).withMessage(' not valid newpassword'),
	check('birthDate').isDate().withMessage('Not valid birthDate'),
];

exports.activation = [
	check('email').isEmail().withMessage(' not valid email'),
	check('password').isLength({ min: 8 }).withMessage(' not valid password'),
	check('newpassword').isLength({ min: 8 }).withMessage(' not valid newpassword'),
	check('birth_date').isDate().withMessage('Not valid birthDate'),
	check('phone_number').isString().withMessage('Invalid Phone Number'),
	check('image').isString().withMessage('Invalid image'),
	check('address').isObject().withMessage('Address is Invalid'),
	check('address.city').isString().withMessage('Invalid City'),
	check('address.street').isString().withMessage('Invalid Street'),
	check('address.building').isInt().withMessage('Invalid Building Number'),
];
