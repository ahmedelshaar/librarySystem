const { body, param } = require('express-validator');

exports.postValidation = [
	body('full_name')
		.isAlpha('en-US', { ignore: ' ' })

		.withMessage(' Must be a letters only')
		.isLength({ min: 3 })
		.withMessage('full name  min Length must 3 or more')
		.trim(),
	body('email').isEmail().withMessage('Invalid Email').normalizeEmail().trim(),
	body('password')
		.isLength({ min: 8 })
		.withMessage(' Must be at least 8 characters long')
		.matches(/\d/)
		.withMessage('must contain a number'),
];

exports.patchValidation = [
	body('email').optional().isEmail().withMessage('Invalid Email').normalizeEmail().trim(),
	body('full_name').optional().isString().withMessage('Invalid Name'),
	body('password')
		.optional()
		.isLength({ min: 8 })
		.withMessage(' Must be at least 8 characters long')
		.matches(/\d/)
		.withMessage('must contain a number'),
	body('image').optional().isString().withMessage('Invalid image'),
	body('phone_number').optional().isMobilePhone().withMessage('Invalid Phone Number'),
	body('birth_date').optional().isDate().withMessage('Invalid Date').toDate(),
	body('address').optional().isObject().withMessage('Address is Invalid'),
	body('address.city').optional().isString().withMessage('Invalid City'),
	body('address.street').optional().isString().withMessage('Invalid Street'),
	body('address.building').optional().isInt().withMessage('Invalid Building Number'),
];

exports.checkId = [param('id').isNumeric().withMessage('Invalid Member ID')];

exports.validateSearchMember = [
	body('full_name').optional().isString().withMessage('Invalid Name'),
	body('email').optional().isString().withMessage('Invalid Email').normalizeEmail().trim(),
];
