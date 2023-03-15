const jwt = require("jsonwebtoken");

require("dotenv").config();

// middleware to verify JWT token
module.exports = (request, response, next) => {
  try {
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (decode !== undefined) {
      request.role = decode.role;
      request.userEmail = decode.email;
      request.id = decode.id;
      next();
    }
  } catch (error) {
    error.message = "Not Authorized";
    error.status = 403;
    next(error);
  }
};
