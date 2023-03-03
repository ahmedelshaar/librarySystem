
exports.isSuperAdmin = (request, response, next) => {
    if (request.role == "super-admin") {
        next()
    } else {
        throw new Error("not permitted")
    }
}


exports.isAdmin = (request, response, next) => {
    if (request.role == "super-admin" ||request.role == "admin") {
        next()
    } else {
        throw new Error("not permitted")
    }
}
exports.isAdmin = (request, response, next) => {
    if (request.role == "super-admin" ||request.role == "admin") {
        next()
    } else {
        throw new Error("not permitted")
    }
}



