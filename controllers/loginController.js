const { request, response} = require("express");

exports.login=(request,response,next)=>{
    response.status(200).json({"massage":"login"})
 }