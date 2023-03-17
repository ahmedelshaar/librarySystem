const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('../models/managersModel');
const path = require('path');
const fs = require('fs');
const managersSchema = mongoose.model('managers');
const mailer = require("../services/sendMails");
const generator = require('generate-password');

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

exports.getAllEmployees = (req, res, next) => {
	managersSchema
		.find({ role: 'employee' }, { password: 0 })
		.then((data) => {
			res.status(200).json({ data });
		})
		.catch((err) => {
			next(err);
		});
};

exports.getEmployeeById = (req, res, next) => {
	managersSchema
		.findOne(
			{
				_id: req.params.id,
				role: 'employee',
			},
			{ password: 0 }
		)
		.then((data) => {
			if (req.params.id != req.id && req.role == 'employee') {
				throw new Error('Not Premitted');
			} else {
				res.status(200).json({ data: data });
			}
		})
		.catch((err) => {
			next(err);
		});
};

exports.seacrchEmployee = (req, res, next) => {
	const term = req.body.term.trim().split(' ');
	const firstName = '^' + term[0];
	const lastName = '^' + (term[1] ?? firstName);
	managersSchema
		.find(
			{
				$and: [
					{ role: 'employee' },
					{
						$or: [
							{ firstName: { $regex: firstName, $options: 'i' } },
							{ lastName: { $regex: lastName, $options: 'i' } },
						],
					},
				],
			},
			{ password: 0 }
		)
		.then((data) => {
			res.status(200).json({ data });
		})
		.catch((err) => {
			next(err);
		});
};

exports.autoComplete = (req, res, next) => {
	const term = req.body.term.trim().split(' ');
	const firstName = '^' + term[0];
	const lastName = '^' + (term[1] ?? firstName);
	managersSchema
		.find(
			{
				$and: [
					{ role: 'employee' },
					{
						$or: [
							{ firstName: { $regex: firstName, $options: 'i' } },
							{ lastName: { $regex: lastName, $options: 'i' } },
						],
					},
				],
			},
			{ firstName: 1, lastName: 1 }
		)
		.then((data) => {
			res.status(200).json({ data });
		})
		.catch((err) => {
			next(err);
		});
};

exports.addEmployee = (req, res, next) => {
	let password = generator.generate({
		length: 10,
		numbers: true
	});
	const newEmployee = new managersSchema({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: bcrypt.hashSync(password, salt),
		hireDate: req.body.hireDate,
		salary: req.body.salary,
		role: 'employee',
	});
	newEmployee
		.save()
		.then((data) => {
			data.password=""; 
			// console.log(data);
			mailer(req.body.email,`${req.body.firstName} ${req.body.lastName}`,password)
			res.status(201).json({ data });
		})
		.catch((err) => {
			next(err);
		});
};

exports.updateEmployee = (req, res, next) => {
	managersSchema
		.findOne({
			_id: req.params.id,
			role: 'employee',
		})
		.then((data) => {
			if (!data) {
				throw new Error('Employee not found');
			}
			let password = req.body.password ? bcrypt.hashSync(req.body.password, salt) : undefined;
			console.log(req.id);
			if (req.role == 'employee') {
				if (req.params.id != req.id) {
					throw new Error("You can't update other employee");
				}
				delete req.body.email;
				delete req.body.salary;
				delete req.body.role;
			}
			if (req.role != 'super-admin') {
				delete req.body.role;
			}
			if (req.role == 'super-admin' && req.role == 'root') {
				throw new Error("You can't upgrate to root role");
			}
			// لييييه لييييه؟
			if (!data.image) {
				delete req.file;
			}
			if (req.file && data.image && fs.existsSync(path.join(__dirname, '..', 'images', `${data.image}`))) {
				fs.unlinkSync(path.join(__dirname, '..', 'images', `${data.image}`));
			}

			return managersSchema.updateOne(
				{
					_id: req.params.id,
				},
				{
					$set: {
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						password: password,
						email: req.body.email,
						birthDate: req.body.birthDate,
						image: req.file?.filename,
						salary: req.body.salary,
						role: req.body.role,
					},
				}
			);
		})
		.then((data) => {
			res.status(200).json({ data });
		})
		.catch((err) => {
			next(err);
		});
};

exports.deleteEmployee = (req, res, next) => {
	managersSchema
		.findOne({ _id: req.params.id, role: 'employee' })
		.then((data) => {
			if (!data) {
				throw new Error('Employee not found');
			} else {
				if (data.image && fs.existsSync(path.join(__dirname, '..', 'images', `${data.image}`))) {
					fs.unlinkSync(path.join(__dirname, '..', 'images', `${data.image}`));
				}
				return managersSchema.deleteOne({ _id: req.params.id });
			}
		})
		.then((data) => {
			res.status(200).json({ data });
		})
		.catch((err) => {
			next(err);
		});
};
