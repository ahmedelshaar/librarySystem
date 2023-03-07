exports.isSuperAdmin = (request, response, next) => {
  if (request.role == "super-admin") {
    next();
  } else {
    throw new Error("not permitted");
  }
};

exports.isSuperAdminOrAdmin = (request, response, next) => {
  if (request.role == "super-admin" || request.role == "admin") {
    next();
  } else {
    throw new Error("not permitted");
  }
};

exports.isSuperAdminOrAdminOrEmp = (request, response, next) => {
  if (request.role == "super-admin" || request.role == "admin" || request.role == "employee") {
    next();
  } else {
    throw new Error("not permitted");
  }
};

exports.isSuperAdminOrAdminOrEmpOrMember = (request, response, next) => {
  if (
    request.role == "super-admin" ||
    request.role == "admin" ||
    request.role == "employee" ||
    request.role == "member"
  ) {
    next();
  } else {
    throw new Error("not permitted");
  }
};
