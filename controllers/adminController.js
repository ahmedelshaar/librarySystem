const path = require('path');
const fs = require('fs');
const moment = require('moment');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('../models/managersModel');
const managersSchema = mongoose.model('managers');
const mailer = require('../services/sendMails');
const generator = require('generate-password');
const maxBirthDate = moment(new Date('1996-01-01 00:00:00'));

// bcrybt
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

// Get all Admins
exports.getAllAdmins = (req, res, next) => {
	managersSchema
		.find({ role: 'admin' }, { password: 0 })
		.then((data) => {
			res.status(200).json({ data });
		})
		.catch((err) => {
			next(err);
		});
};

// Get Admin by id
exports.getAdminById = (req, res, next) => {
	if ((req.role == 'admin' && req.params.id == req.id) || req.role == 'super-admin') {
		managersSchema
			.findOne({ _id: req.params.id, role: 'admin' }, { password: 0 })
			.then((data) => {
				if (!data) {
					throw new Error('Admin not found');
				} else {
					res.status(200).json({ data });
				}
			})
			.catch((err) => {
				next(err);
			});
	} else {
		next(
			new Error('You are not authorized to view this admin data, please contact the super admin to get the data')
		);
	}
};

// Add new admin
exports.addAdmin = (req, res, next) => {
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
		role: 'admin',
	});
	newAdmin
		.save()
		.then((data) => {
			data.password = '';
			// console.log(data);
			mailer(req.body.email, `Admin ${req.body.firstName} ${req.body.lastName}`, password);
			res.status(201).json({ data });
		})
		.catch((err) => {
			next(err);
		});
};

// Update admin data
exports.updateAdmin = (req, res, next) => {
	managersSchema
		.findOne({ _id: req.params.id, role: 'admin' })
		.then((data) => {
			if (!data) {
				throw new Error('Admin not found');
			} else {
				let hashedPass = req.body.password ? bcrypt.hashSync(req.body.password, salt) : req.body.password;
				if (req.role == 'admin') {
					if (req.params.id == req.id) {
						delete req.body.email;
						delete req.body.salary;
						delete req.body.role;
					} else {
						throw new Error('You are not authorized to update this admin data');
					}
				}
				if (req.role == 'super-admin' && req.body.role == 'root') {
					throw new Error("You can't upgrate to root role");
				}
				if (req.body.birthDate && moment(req.body.birthDate).isAfter(maxBirthDate)) {
					throw new Error(`Birth Year Cannot Be After ${maxBirthDate}`);
				}
				if (req.file && data.image && fs.existsSync(path.join(__dirname, '..', 'images', `${data.image}`))) {
					// fs.unlinkSync(path.join(__dirname, '..', 'images', `${data.image}`));
					req.delete_image = path.join(__dirname, '..', 'images', `${data.image}`);
				}
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
							image: req.file?.filename ?? undefined,
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

// Delete admin
exports.deleteAdmin = (req, res, next) => {
	managersSchema
		.findOne({ _id: req.params.id, role: 'admin' })
		.then((data) => {
			if (!data) {
				throw new Error('Admin not found');
			} else {
				if (data.image && fs.existsSync(path.join(__dirname, '..', 'images', `${data.image}`))) {
					req.delete_image = path.join(__dirname, '..', 'images', `${data.image}`);
				}
				return managersSchema.deleteOne({ _id: req.body.id });
			}
		})
		.then((data) => {
			res.status(200).json({ data });
			if (req.delete_image) fs.unlinkSync(req.delete_image);
		})
		.catch((err) => {
			next(err);
		});
};
