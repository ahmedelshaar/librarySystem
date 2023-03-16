exports.isSuperAdmin = (request, response, next) => {
	if (['root', 'super-admin'].includes(request.role)) {
		next();
	} else {
		throw new Error('not permitted');
	}
};

exports.isAdmin = (request, response, next) => {
	if (['root', 'super-admin', 'admin'].includes(request.role)) {
		next();
	} else {
		throw new Error('not permitted');
	}
};

exports.isEmployee = (request, response, next) => {
	if (['root', 'super-admin', 'admin', 'employee'].includes(request.role)) {
		next();
	} else {
		throw new Error('not permitted');
	}
};

exports.isMember = (request, response, next) => {
	if (['root', 'super-admin', 'admin', 'employee', 'member'].includes(request.role)) {
		next();
	} else {
		throw new Error('not permitted');
	}
};
exports.isMemberOnly = (request, response, next) => {
	if (['member'].includes(request.role)) {
		next();
	} else {
		throw new Error('this route is for members only.');
	}
};
