const { request, response} = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
exports.login=(request,response,next)=>{
    if(true){ // handling users here 


        // TOOD: get user from dataBase if  exists


        // create refresh token
        const accessToken = jwt.sign({
            id:"id",
            email:"email",
            role:"role",
        },process.env.SECRET_KEY,
        {expiresIn:"1h"})

        // create refresh token
        const refreshToken = jwt.sign({
            id:"id",
            email:"email",
            role:"role",
        },process.env.SECRET_KEY,
        {expiresIn:"7d"})

        // TOOD: store refreshToken in dataBase (user Model)

        response.status(200).json({accessToken,refreshToken})
    }
  
 }