exports.isRoot = (req, res, next) => {
	if (req.role == 'root') {
		next();
	} else {
		throw new Error('Only root is allowed to do this actions');
	}
};
exports.isSuperAdmin = (request, response, next) => {
	if (['root', 'super-admin'].includes(request.role)) {
		next();
	} else {
		throw new Error('Only root and super-admin are allowed to do this actions');
	}
};

exports.isAdmin = (request, response, next) => {
	if (['root', 'super-admin', 'admin'].includes(request.role)) {
		next();
	} else {
		throw new Error('Only root, super-admin and admin are allowed to do this actions');
	}
};

exports.isEmployee = (request, response, next) => {
	if (['root', 'super-admin', 'admin', 'employee'].includes(request.role)) {
		next();
	} else {
		throw new Error('Only root, super-admin, admin and employee are allowed to do this actions');
	}
};

exports.isMember = (request, response, next) => {
	if (['root', 'super-admin', 'admin', 'employee', 'member'].includes(request.role)) {
		next();
	} else {
		throw new Error('Only root, super-admin, admin, employee and member are allowed to do this actions');
	}
};
exports.isMemberOnly = (request, response, next) => {
	if (['member'].includes(request.role)) {
		next();
	} else {
		throw new Error('this route is for members only.');
	}
};
