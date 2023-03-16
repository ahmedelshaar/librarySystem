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
	console.log('sending data to DB.');
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

	for (let i = 1; i < 4; i++) {
		console.log(i);
		await new managersSchema({
			firstName: 'super',
			lastName: 'admin',
			email: `superadmin${i}@gmail.com`,
			password: bcrypt.hashSync('12345678', salt),
			hireDate: Date.now(),
			salary: 5000,
			role: 'super-admin',
		}).save();
		await new managersSchema({
			firstName: 'admin',
			lastName: 'role',
			email: `admin${i}@gmail.com`,
			password: bcrypt.hashSync('12345678', salt),
			hireDate: Date.now(),
			salary: 5000,
			role: 'admin',
		}).save();
		await new managersSchema({
			firstName: 'employee',
			lastName: 'role',
			email: `employee${i}@gmail.com`,
			password: bcrypt.hashSync('12345678', salt),
			hireDate: Date.now(),
			salary: 5000,
			role: 'employee',
		}).save();
		await new membersSchema({
			full_name: 'Member',
			email: `member${i}@gmail.com`,
			password: bcrypt.hashSync('12345678', salt),
			manager: 'manager',
		}).save();
	}
})();
