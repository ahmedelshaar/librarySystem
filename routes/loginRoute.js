const { Router, request, response } = require("express");

const routes = new Router();


 routes.post('/login', (request,response,next)=>{
    response.status(200).json({"massage":"login"})
 });


module.exports = routes;
