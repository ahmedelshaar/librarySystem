const mongoose = require("mongoose");
require("./../models/memberModel");

const bcrypt = require("bcrypt");
const { request } = require("../app");
const saltRound = 10;
const salt = bcrypt.genSaltSync(saltRound);
const MemberSchema = mongoose.model("members");
const path = require("path");
const fs = require("fs");

exports.getAllMembers = (req, res, next) => {
	MemberSchema.find({})
		.then((data) => {
			res.status(200).json({ data });
		})
		.catch((error) => {
			next(error);
		});
};

exports.getMembers = (req, res, next) => {
	MemberSchema.findById(req.params.id)
		.then((data) => {
			// console.log(data + "Hi");
			if (data == null) {
				next(new Error("Member Not Found"));
			} else {
				res.status(200).json({ data });
			}
		})
		.catch((error) => {
			next(error);
		});
};

exports.addMember = (req, res, next) => {
	if (req.file && req.file.path) {
		req.body.image = req.file.path;
	}
	new MemberSchema({
		full_name: req.body.full_name,
		password: bcrypt.hashSync(req.body.password, salt),
		email: req.body.email,
		image: req.body.image,
		phone_number: req.body.phone_number,
		birth_date: req.body.birth_date, // year-month-day => 1996-02-01
		address: req.body.address,
	})
		.save()
		.then((data) => {
			res.status(201).json({ success: true, data: data });
		})
		.catch((error) => {
			if (error.message.includes("E11000")) {
				return res.status(500).json({
					message: "This Email Already Exists try with another email",
					success: false,
				});
			}
			next(error);
		});
};

exports.updateMember = (req, res, next) => {
	MemberSchema.findOne({
		_id: req.body.id,
	}).then((data) => {
		if (data.matchedCount == 0) {
			next(new Error("Member Not Found"));
		} else {
			let hashedPass = req.body.password ? bcrypt.hashSync(req.body.password, salt) : req.body.password;
			if (req.file && req.file.path) {
				fs.unlinkSync(data.image);
				req.body.image = req.file.path;
			}
			return MemberSchema.updateOne(
				{
					_id: req.body.id,
				},
				{
					$set: {
						full_name: req.body.full_name,
						password: hashedPass,
						email: req.body.email,
						image: req.body.image,
						phone_number: req.body.phone_number,
						birth_date: req.body.birth_date, // year-month-day => 1996-02-01
						address: req.body.address,
					},
				}
			)
				.then((data) => {
					res.status(200).json({ data: "Updated" });
				})
				.catch((error) => {
					next(error);
				});
		}
	});
};

exports.deleteMember = (req, res, next) => {
	MemberSchema.findOne({
		_id: req.body.id,
	}).then((data) => {
		if (data.matchedCount == 0) {
			next(new Error("Member Not Found"));
		} else {
			fs.unlinkSync(data.image);
			return MemberSchema.deleteOne({ _id: req.body.id })
				.then((data) => {
					res.status(200).json({ data: "Deleted" });
				})
				.catch((error) => {
					next(error);
				});
		}
	});
};
