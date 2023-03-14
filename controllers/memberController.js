const mongoose = require('mongoose');
require('./../models/memberModel');

const bcrypt = require('bcrypt');
const saltRound = 10;
const salt = bcrypt.genSaltSync(saltRound);
const MemberSchema = mongoose.model('members');
const path = require('path');
const fs = require('fs');

exports.getAllMembers = (req, res, next) => {
	MemberSchema.find({})
		.then((data) => {
			res.status(200).json({ data });
		})
		.catch((error) => {
			next(error);
		});
};

exports.getAllMemberById = (req, res, next) => {
	MemberSchema.findById(req.params.id)
		.then((data) => {
			if (data == null) {
				throw new Error('Member Not Found');
			} else {
				res.status(200).json({ data });
			}
		})
		.catch((error) => {
			next(error);
		});
};

exports.searchByName = (req, res, next) => {
	MemberSchema.find({ full_name: { $regex: '^' + req.body.full_name } })
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
				if (req.params.id != req.id) {
					// throw new Error("Not Authenticated");
					let error = new Error('Not Authenticated');
					error.status = 401;
					throw error;
				}
				let hashedPass = req.body.password ? bcrypt.hashSync(req.body.password, salt) : req.body.password;
				if (req.file && req.file.path && data.image != null) {
					if (fs.existsSync(path.join(__dirname, '..', 'images', `${data.image}`))) {
						fs.unlinkSync(path.join(__dirname, '..', 'images', `${data.image}`));
					}
				}
				return MemberSchema.updateOne(
					{
						_id: req.params.id,
					},
					{
						$set: {
							full_name: req.body.full_name,
							password: hashedPass,
							image: req.file.filename,
							phone_number: req.body.phone_number,
							birth_date: req.body.birth_date,
							address: req.body.address,
						},
					}
				);
			}
		})
		.then((data) => {
			console.log('100');
			res.status(200).json({ data1: 'Updated' });
			console.log(10000);
		})
		.catch((error) => {
			next(error);
		});
};

exports.deleteMember = (req, res, next) => {
	MemberSchema.findOne({
		_id: req.params.id,
	}).then((data) => {
		if (!data) {
			next(new Error('Member Not Found'));
		} else {
			status;
			if (fs.existsSync(path.join(__dirname, '..', 'images', `${data.image}`))) {
				fs.unlinkSync(path.join(__dirname, '..', 'images', `${data.image}`));
			}

			return MemberSchema.deleteOne({ _id: req.params.id })
				.then((data) => {
					res.status(200).json({ data: 'Deleted' });
				})
				.catch((error) => {
					next(error);
				});
		}
	});
};
