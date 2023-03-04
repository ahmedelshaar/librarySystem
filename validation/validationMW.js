const { validationResult } = require("express-validator");
const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
	return `${location}[${param}]:${value} ==> ${msg}`;
};
module.exports = (request, respond, next) => {
	let result = validationResult(request).formatWith(errorFormatter);
	if (!result.isEmpty()) {
		let error = new Error(result.array());
		error.status = 422;
		next(error);
	} else next();
};
