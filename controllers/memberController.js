const mongoose = require('mongoose');
require('./../models/memberModel');

const moment = require('moment');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const maxBirthDate = moment(new Date('2009-01-01 00:00:00'));
const mailer = require("../services/sendMails");
const generator = require('generate-password');

const saltRound = 10;
const salt = bcrypt.genSaltSync(saltRound);

const MemberSchema = mongoose.model('members');

exports.getAllMembers = (req, res, next) => {
	MemberSchema.find({})
		.then((data) => {
			console.log(maxBirthDate);
			res.status(200).json({ data });
		})
		.catch((error) => {
			next(error);
		});
};

exports.getAllMemberById = (req, res, next) => {
	MemberSchema.findById(req.params.id)
		.then((data) => {
			if (req.role == 'member' && req.params.id != req.id) {
				throw new Error('Not Autorized');
			} else {
				if (data == null) {
					throw new Error('Member Not Found');
				} else {
					res.status(200).json({ data });
				}
			}
		})
		.catch((error) => {
			next(error);
		});
};

exports.searchMember = (req, res, next) => {
	MemberSchema.find(
		{ $or: [{ full_name: { $regex: '^' + req.body.full_name } }, { email: { $regex: '^' + req.body.email } }] },
		{ password: 0 }
	)
		.then((data) => {
			res.status(200).json({ data });
		})
		.catch((err) => {
			next(err);
		});
};

exports.autocompleteMember = (req, res, next) => {
	MemberSchema.find(
		{ $or: [{ full_name: { $regex: '^' + req.body.full_name } }, { email: { $regex: '^' + req.body.email } }] },
		{ full_name: 1, email: 1 }
	)
		.then((data) => {
			res.status(200).json({ data });
		})
		.catch((err) => {
			next(err);
		});
};

exports.addMember = (req, res, next) => {
	let password = generator.generate({
		length: 10,
		numbers: true
	});
	new MemberSchema({
		full_name: req.body.full_name,
		password: bcrypt.hashSync(password, salt),
		email: req.body.email,
	})
		.save()
		.then((data) => {
			data.password=""; 
			// console.log(data);
			mailer(req.body.email,`Member ${req.body.full_name}`,password)
			res.status(201).json({ success: true, data: data });
		})
		.catch((error) => {
			if (error.message.includes('E11000')) {
				error.message = 'This Email Allready Exists';
			}
			next(error);
		});
};

exports.updateMember = (req, res, next) => {
	MemberSchema.findOne({
		_id: req.params.id,
	})
		.then((data) => {
			if (!data) {
				throw new Error('Member Not Found');
			} else {
				if (req.role == 'member' && req.params.id != req.id) {
					let error = new Error('Not Authonticated');
					error.status = 401;
					throw error;
				} else if (req.role == 'member' && req.params.id == req.id) {
					delete req.body.email;
				}
				if (req.body.birth_date && moment(req.body.birth_date).isAfter(maxBirthDate)) {
					throw new Error(`Birth Year Cannot Be After ${maxBirthDate}`);
				}
				let hashedPass = req.body.password ? bcrypt.hashSync(req.body.password, salt) : req.body.password;
				if (req.file && req.file.path) {
					if (data.image != null && fs.existsSync(path.join(__dirname, '..', 'images', `${data.image}`))) {
						req.delete_image = path.join(__dirname, '..', 'images', `${data.image}`);
						// fs.unlinkSync(path.join(__dirname, '..', 'images', `${data.image}`));
					}
					req.body.image = req.file.filename;
				}
				return MemberSchema.updateOne(
					{
						_id: req.params.id,
					},
					{
						$set: {
							full_name: req.body.full_name,
							password: hashedPass,
							image: req.body.image,
							phone_number: req.body.phone_number,
							birth_date: req.body.birth_date,
							address: req.body.address,
							email: req.body.email,
						},
					}
				);
			}
		})
		.then((data) => {
			res.status(200).json({ data: 'Updated' });
			if (req.delete_image) fs.unlinkSync(req.delete_image);
		})
		.catch((error) => {
			next(error);
		});
};

exports.deleteMember = (req, res, next) => {
	MemberSchema.findOne({
		_id: req.params.id,
	})
		.then((data) => {
			if (!data) {
				next(new Error('Member Not Found'));
			} else {
				// status;
				if (fs.existsSync(path.join(__dirname, '..', 'images', `${data.image}`))) {
					fs.unlinkSync(path.join(__dirname, '..', 'images', `${data.image}`));
				}

				return MemberSchema.deleteOne({ _id: req.params.id }).then((data) => {
					res.status(200).json({ data: 'Deleted' });
				});
			}
		})
		.catch((error) => {
			next(error);
		});
};
