const moment = require('moment');

const { body, param, query } = require('express-validator');
const { categories } = require('../Core/Static/categories');

const isIsoDateInRange = (value, { minDate, maxDate }) => {
	if (!moment(value, moment.ISO_8601).isValid()) {
		throw new Error('Invalid date format');
	}

	const date = moment(value);
	if (minDate && moment(minDate, moment.ISO_8601).isValid() && date.isBefore(moment(minDate))) {
		throw new Error(`Date must be on or after ${minDate}`);
	}

	if (maxDate && moment(maxDate, moment.ISO_8601).isValid() && date.isAfter(moment(maxDate))) {
		throw new Error(`Date must be on or before ${maxDate}`);
	}

	return value;
};

const checkAfterToday = (value) => {
	const minDate = new Date().toISOString(); // default to UNIX epoch
	// const maxDate = req.body.maxDate; // can be null
	return isIsoDateInRange(value, { minDate });
};

exports.getValidator = exports.deleteValidator = [param('id').isInt().withMessage('Id should be Number').toInt()];

exports.postValidator = [
	// Strings
	body('title').isLength({ min: 3 }).withMessage('title should be String and min length 3').trim(),
	body('author').isLength({ min: 3 }).withMessage('author should be String and min length 3').trim(),
	body('publisher').isLength({ min: 3 }).withMessage('publisher should be String and min length 3').trim(),
	body('category').isIn(categories).withMessage(`Category should be in [${categories}]`).trim(),
	// Date
	body('publishingDate').isISO8601().withMessage('PublishingDate should be A valid Date').toDate(),
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
	query('author').isLength({ min: 3 }).withMessage('author Must Be String').trim(),
	query('publisher').isLength({ min: 3 }).withMessage('publisher Must Be String').trim(),
	query('category').isLength({ min: 3 }).withMessage('Category Must Be String').trim(),
	query('year').isInt({ min: 0, max: 9999 }).withMessage('year Must Be Intger').toInt(),
	// query("available").isBoolean().withMessage("year Must Be Boolean"),
];
