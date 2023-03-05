exports.isSuperAdmin = (request, response, next) => {
  if (request.role == "super-admin") {
    next();
  } else {
    throw new Error("not permitted");
  }
};

exports.isSuperAdmin = (request, response, next) => {
  if (request.role == "super-admin") {
    next();
  } else {
    throw new Error("not permitted");
  }
};
exports.isAdminOrAdmin = (request, response, next) => {
  if (request.role == "super-admin" || request.role == "admin") {
    next();
  } else {
    throw new Error("not permitted");
  }
};
