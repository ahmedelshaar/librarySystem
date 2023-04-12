const moment = require('moment'); // require
console.log(moment()); 				//Moment<2023-03-14T17:48:20+02:00>
console.log(moment().add(7,"d"));  	//Moment<2023-03-21T17:48:59+02:00>
console.log(moment().add(7,'d').format('YYYY-MM-DD')); //2023-03-21
console.log(moment().add(1,'M').toISOString())
let year = moment("2023")
console.log(year); 
console.log(year.year()); 
console.log(year.add(1,"year").toISOString()); 
console.log(year.toISOString()); 
console.log(moment().startOf("month").toDate()); 
console.log(moment().add(1,"month").startOf("month").toDate()); 
year = moment("2023-03")
console.log(year.startOf("month").toDate()); 
console.log(year.add(1,"month").startOf("month").toDate()); 
console.log(moment().month(4)); 

// console.log(moment()); 
// console.log(moment()); 
// console.log(moment()); 
// console.log(moment()); 
// console.log(moment()); 
// console.log(moment()); 
// console.log(moment()); 

