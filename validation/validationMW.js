const { validationResult } = require("express-validator");
const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return `${location}[${param}]:${value} ==> ${msg}`;
};
module.exports = (request, respond, next) => {	// console.log(validationResult(request));
  // let result = validationResult(request).formatWith(errorFormatter);  let result = validationResult(request).errors;	// console.log(result)	
  if (result.length) {	  // console.log("inside")	  err = {}	result.forEach(e=>{		// console.log(e)		let k = 0,v =0;		err[e['param']] = e['msg']})	// console.log(err);	respond.status(422).json({message:err})	return
    let error = new Error(result.array());
    error.status = 422;
    next(error);
  } else next();
};
