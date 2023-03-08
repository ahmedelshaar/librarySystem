exports.isSuperAdmin = (request, response, next) => {
  if (request.role == "super-admin") {
    next();
  } else {
    throw new Error("not permitted");
  }
};

exports.isAdmin = (request, response, next) => {
  if (request.role == "super-admin" || request.role == "admin") {
    next();
  } else {
    throw new Error("not permitted");
  }
};

exports.isEmployee = (request, response, next) => {
  if (request.role == "super-admin" || request.role == "admin" || request.role == "employee") {
    next();
  } else {
    throw new Error("not permitted");
  }
};

exports.isMember = (request, response, next) => {
  if (request.role == "member") {
    next();
  } else {
    throw new Error("not permitted");
  }
};
