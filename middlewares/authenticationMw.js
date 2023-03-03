const jwt = require("jsonwebtoken");

require('dotenv').config();

// middleware to verify JWT token
module.exports = (request, response, next) => {
    let token, decode;
    try {
        const authHeader = request.get['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        decode = jwt.verify(token, process.env.SECRET_KEY)
    } catch (error) {
        error.message = "Not Authorized";
        error.status = 403;
        next(error);
    }
    if (decode !== undefined) {
        request.role = decode.role;
        request.userEmail = decode.email;
        request.id = decode.id;
        console.log(decode)
        next();
    }
}
