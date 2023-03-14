const moment = require('moment');
const mongoose = require('mongoose');
const MemberSchema = mongoose.model('members');

exports.isBanned = (req, res, next) => {
	MemberSchema.findById(req.body.member_id)
    .then((data) => {
		if (data.ban_date) {
			const date = moment(data.ban_date);
			if (moment(date, moment.ISO_8601).isValid() && !date.isBefore(moment())) {
				next();
			}else{
               throw new Error(`user is baned to ${data.ban_date}`);
            }
		}else next();
	})
    .catch((err)=>{
        next(err);
    })
};
