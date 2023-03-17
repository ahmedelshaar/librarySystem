const moment = require('moment');

const { body, param, query } = require('express-validator');
const { categories } = require('../Core/Static/categories');

const isIsoDateInRange = (value, { minDate, maxDate } ) => {
	if ( !moment(value, moment.ISO_8601).isValid() ) {
		throw new Error('Invalid date format');
	}

	const date = moment(value);
	if (minDate && date.isSameOrBefore(moment(minDate))) {
		throw new Error(`Date must be on or after ${minDate}`);
	}

	if (maxDate && date.isSameOrAfter(moment(maxDate))) {
		throw new Error(`Date must be on or before ${maxDate}`);
	}

	return value;
};

const checkAfterToday = (value) => {
	const minDate = new Date().toISOString(); 
	const maxDate = moment().add(1,"month").toISOString();
	return isIsoDateInRange(value, { minDate,maxDate });
};
const checkBeforeToday = (value) => {
	const minDate = null;
	const maxDate = new Date().toISOString();
	return isIsoDateInRange(value, { minDate,maxDate });
};

exports.getValidator = exports.deleteValidator = [param('id').isInt().withMessage('Id should be Number').toInt()];

exports.postValidator = [
	// Strings
	body('title').isLength({ min: 3 }).withMessage('title should be String and min length 3').trim(),
	body('author').isLength({ min: 3 }).withMessage('author should be String and min length 3').trim(),
	body('publisher').isLength({ min: 3 }).withMessage('publisher should be String and min length 3').trim(),
	body('category').isIn(categories).withMessage(`Category should be in [${categories}]`).trim(),
	// Date
	body('publishingDate')
		// .isISO8601().withMessage('PublishingDate should be A valid Date')
		.custom(checkBeforeToday)
		.toDate(),
	// Numbers
	body('edition').isInt({ min: 1 }).withMessage('Edition should be Number').toInt(),
	body('pages').isInt({ min: 1 }).withMessage('Edition should be Number').toInt(),
	body('noOfCopies').isInt({ min: 1 }).withMessage('NoOfCopies should be Number').toInt(),
	body('shelfNo').isInt({ min: 1 }).withMessage('shelfNo should be Number').toInt(),
];

exports.patchValidator = [
	param('id').isInt().withMessage('ID should be Number').toInt(),
	...[exports.postValidator.map((elem) => elem.optional())],
];

exports.borrowBookValidator = [
	body('member_id').isInt().withMessage('Member ID should be Number').toInt(),
	body('book_id').isInt().withMessage('Book ID should be Number').toInt(),
	body('expectedDate')
		//.isISO8601()
		// .withMessage('expectedDate should be A valid Date')
		.custom(checkAfterToday)
		.toDate(),
];
exports.returnValidator = [
	body('member_id').isInt().withMessage('Member ID should be Number').toInt(),
	body('book_id').isInt().withMessage('Book ID should be Number').toInt(),
];

exports.readingBookValidator = [
	body('member_id').isInt().withMessage('Member ID should be Number').toInt(),
	body('book_id').isInt().withMessage('Book ID should be Number').toInt(),
];
exports.searchBookValidator = [
	query('author').optional().isLength({ min: 3 }).withMessage('author Must Be String').trim(),
	query('publisher').optional().isLength({ min: 3 }).withMessage('publisher Must Be String').trim(),
	query('category').optional().isIn(categories).withMessage(`Category should be in [${categories}]`).trim(),
	query('year').optional().isInt({ min: 0, max: 9999 }).withMessage('year Must Be Intger').toInt(),
	query("available").optional().isBoolean().withMessage("year Must Be Boolean").toBoolean(),
];
exports.paramName = [
	param('name').isLength({ min: 3 }).withMessage('name Must Be String').trim(),
]
exports.paramYear = [
	param('year').isInt().withMessage('year should be Number').toInt(),
	param('month').optional().isInt().withMessage('month should be Number').toInt(),
]
