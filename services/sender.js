const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('../models/managersModel');
require('../models/memberModel');
const managersSchema = mongoose.model('managers');
const membersSchema = mongoose.model('members');

// bcrybt
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

(async () => {
	let count = await managersSchema.countDocuments();
	if (count > 0) {
		return;
	}
	await new managersSchema({
		firstName: 'root',
		lastName: 'root',
		email: 'root@root.com',
		password: bcrypt.hashSync('12345678', salt),
		hireDate: Date.now(),
		activated: true,
		role: 'root',
		salary: 20000,
	}).save();
})();
