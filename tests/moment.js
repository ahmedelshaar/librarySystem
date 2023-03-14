const moment = require('moment'); // require
console.log(moment()); 				//Moment<2023-03-14T17:48:20+02:00>
console.log(moment().add(7,"d"));  	//Moment<2023-03-21T17:48:59+02:00>
console.log(moment().add(7,'d').format('YYYY-MM-DD')); //2023-03-21
console.log(moment().add(1,'M').toISOString())
// console.log(moment()); 
// console.log(moment()); 
// console.log(moment()); 
// console.log(moment()); 
// console.log(moment()); 
// console.log(moment()); 
// console.log(moment()); 

