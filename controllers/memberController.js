const mongoose = require('mongoose');
require('./../models/memberModel');

const moment = require('moment');
const bcrypt = require('bcrypt');
const saltRound = 10;
const salt = bcrypt.genSaltSync(saltRound);
const MemberSchema = mongoose.model('members');
const path = require('path');
const fs = require('fs');
const maxBirthDate = moment().subtract(15, 'year').toISOString();

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
	new MemberSchema({
		full_name: req.body.full_name,
		password: bcrypt.hashSync(req.body.password, salt),
		email: req.body.email,
	})
		.save()
		.then((data) => {
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
				if (req.birth_date > maxBirthDate) {
					throw new Error(`Birth Day Cannot Be After ${maxBirthDate}`);
				}
				let hashedPass = req.body.password ? bcrypt.hashSync(req.body.password, salt) : req.body.password;
				if (req.file && req.file.path) {
					if (data.image != null && fs.existsSync(path.join(__dirname, '..', 'images', `${data.image}`))) {
						fs.unlinkSync(path.join(__dirname, '..', 'images', `${data.image}`));
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
