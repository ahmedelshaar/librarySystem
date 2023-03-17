const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const moment = require('moment');
require('../models/managersModel');
const managersSchema = mongoose.model('managers');
const path = require('path');
const fs = require('fs');
const mailer = require('../services/sendMails');
const generator = require('generate-password');
const maxBirthDate = moment(new Date('1995-01-01 00:00:00'));

// bcrybt
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

// Get all Admins
exports.getAllSuperAdmins = (req, res, next) => {
	managersSchema
		.find({ role: 'super-admin' })
		.then((data) => {
			res.status(200).json({ data });
		})
		.catch((err) => {
			next(err);
		});
};

// Get Admin by id
exports.getSuperAdminById = (req, res, next) => {
	managersSchema
		.findOne({
			_id: req.params.id,
			role: 'super-admin',
		})
		.then((data) => {
			res.status(200).json({ data });
		})
		.catch((err) => {
			next(err);
		});
};

// Add new admin
exports.addSuperAdmin = (req, res, next) => {
	let password = generator.generate({
		length: 10,
		numbers: true,
	});
	if (req.body.hireDate > moment().add(1, 'day')) {
		throw new Error('Hire Date Cannot Be After Today');
	}
	const newAdmin = new managersSchema({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: bcrypt.hashSync(password, salt),
		hireDate: req.body.hireDate,
		salary: req.body.salary,
		role: 'super-admin',
	});
	newAdmin
		.save()
		.then((data) => {
			data.password = '';
			// console.log(data);
			mailer(req.body.email, `Super ${req.body.firstName} ${req.body.lastName}`, password);
			res.status(201).json({ data });
		})
		.catch((err) => {
			next(err);
		});
};

// Update admin data
exports.updateSuperAdmin = (req, res, next) => {
	managersSchema
		.findOne({
			_id: req.params.id,
			role: 'super-admin',
		})
		.then((data) => {
			if (!data) {
				throw new Error('Super Admin not found');
			} else {
				let hashedPass = req.body.password ? bcrypt.hashSync(req.body.password, salt) : req.body.password;
				if (req.file && data.image && fs.existsSync(path.join(__dirname, '..', 'images', `${data.image}`))) {
					req.delete_image = path.join(__dirname, '..', 'images', `${data.image}`);
					// fs.unlinkSync(path.join(__dirname, '..', 'images', `${data.image}`));
				}
				if (req.body.birthDate && moment(req.body.birthDate).isAfter(maxBirthDate)) {
					throw new Error(`Birth Year Cannot Be After ${maxBirthDate}`);
				}
				//Case root ??
				// sper admin can only update his data and can't update his salary and email
				if (req.role == 'super-admin') {
					if (req.id == req.params.id) {
						delete req.body.salary;
						delete req.body.email;
						delete req.body.role;
					}
				}
				// ↑↑ Delete in case root is not required
				return managersSchema.updateOne(
					{
						_id: req.params.id,
					},
					{
						$set: {
							firstName: req.body.firstName,
							lastName: req.body.lastName,
							email: req.body.email,
							password: hashedPass,
							birthDate: req.body.birthDate,
							salary: req.body.salary,
							image: req.file?.filename,
							role: req.body.role,
						},
					}
				);
			}
		})
		.then((data) => {
			res.status(200).json({ data });
			if (req.delete_image) fs.unlinkSync(req.delete_image);
		})
		.catch((err) => next(err));
};

exports.deleteSuperAdmin = (req, res, next) => {
	// managersSchema
	// .find({ role: 'super-admin' })
	// .then((data) => {
	// 	if (data.length == 1) {
	// 		throw new Error("You can't delete the last super admin");
	// 	}
	// 	return managersSchema.findOne({ _id: req.params.id, role: 'super-admin' })
	// })

	// Case root Required??
	managersSchema
		.findOne({ _id: req.params.id, role: 'super-admin' })
		.then((data) => {
			if (!data) {
				throw new Error('Super Admin not found');
			} else {
				if (data.image && fs.existsSync(path.join(__dirname, '..', 'images', `${data.image}`))) {
					fs.unlinkSync(path.join(__dirname, '..', 'images', `${data.image}`));
				}
				return managersSchema.deleteOne({ _id: req.params.id });
			}
		})
		.then(() => {
			res.status(200).json({ data: 'Deleted' });
		})
		.catch((err) => {
			next(err);
		});
};
