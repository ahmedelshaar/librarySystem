const { body, param } = require('express-validator');

exports.validateGetById = [param('id').isInt().withMessage('Id should be Number').toInt()];
const roles = ['super-admin', 'admin', 'employee'];

exports.validateAddManagers = [
	body('firstName')
		.isAlpha()
		.withMessage(' Must be a letters only')
		.isLength({ min: 3 })
		.withMessage('first name min Length must 3 or more')
		.trim(),
	body('lastName')
		.isAlpha()
		.withMessage(' Must be a letters only')
		.isLength({ min: 3 })
		.withMessage('first name min Length must 3 or more')
		.trim(),
	body('email').isEmail().withMessage(' Must be a valid email'),
	// body('password')
	// 	.isLength({ min: 8 })
	// 	.withMessage(' Must be at least 8 characters long')
	// 	.matches(/\d/)
	// 	.withMessage('must contain a number'),
	body('hireDate').isDate().withMessage(' Must be a valid date').toDate(),
	body('salary').isInt({ min: 0 }).withMessage(' Must be an Integer'),
];

exports.validateUpdateManagers = [
	param('id').isInt({ min: 1 }).withMessage('Id should be Number').toInt(),
	body('firstName')
		.optional()
		.isAlpha()
		.withMessage(' Must be a letters only')
		.isLength({ min: 3 })
		.withMessage('first name min Length must 3 or more')
		.trim(),
	body('lastName')
		.optional()
		.isAlpha()
		.withMessage(' Must be a letters only')
		.isLength({ min: 3 })
		.withMessage('first name min Length must 3 or more')
		.trim(),
	body('email').optional().isEmail().withMessage(' Must be a valid email').normalizeEmail(),
	body('password')
		.optional()
		.isLength({ min: 8 })
		.withMessage(' Must be at least 8 characters long')
		.matches(/\d/)
		.withMessage('must contain a number'),
	body('birthDate').optional().isDate().withMessage(' Must be a valid date').toDate(),
	body('salary').optional().isInt({ min: 0 }).withMessage(' Must be an Integer').toInt(),
	body('role').optional().isIn(roles).withMessage(`role mu be in ${roles}`),
];

exports.validateSearchEmployee = [
	body('term').isAlpha('en-US', { ignore: ' ' }).withMessage(' Must be Enter First Name'),
];
