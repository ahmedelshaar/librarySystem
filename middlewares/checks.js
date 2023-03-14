const moment = require('moment');
const mongoose = require('mongoose');
const MemberSchema = mongoose.model('members');

exports.isBanned = (req, res, next) => {
	MemberSchema.findById(req.body.member_id)
    .then((data) => {
		// console.log(data);
		if (
			data.ban_date 
			&& moment(data.ban_date, moment.ISO_8601).isValid() 
			&& moment(data.ban_date).isSameOrAfter(moment())
			)
               throw new Error(`user is baned to ${data.ban_date}`);
		else 
			next();
	})
    .catch((err)=>{
        next(err);
    })
};
