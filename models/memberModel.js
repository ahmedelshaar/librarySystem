const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const addressSchema = new mongoose.Schema({
	city: { type: String, required: [true, "Please Enter Your City"] },
	street: { type: String, required: [true, "Please Enter Street Name"] },
	building: { type: Number, required: [true, "Please Enter Bulding No"] },
	_id: false,
}); // Schema For the Full Address

const memberSchema = mongoose.Schema({
	_id: Number,
	fullName: { type: String, required: [true, "Please Enter Your Full Name"] },
	email: {
		type: String,
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please Enter a valid email address"],
		required: [true, "Please Enter Your Email"],
	},
	password: {
		type: String,
		required: [true, "Please Enter Your Password"],
	},
	image: {
		type: String,
		required: [true, "Please Upload Image"],
	},
	phone_number: {
		type: String,
		match: [/^01[0125][0-9]{8}$/, "Please Enter Valid Phone Number"],
		required: [true, "Please Enter Phone Number"],
	},
	birthDate: {
		type: Date,
		required: [true, "Please Enter Your Birth Date"],
		trim: true,
	},
	address: { type: addressSchema, required: true },
	timestamps: {
		createdAt: "created_at", // Use `created_at` to store the created date
		updatedAt: "updated_at", // and `updated_at` to store the last updated date,
	},
});

adminSchema.plugin(autoIncrement, { id: "member_id", inc_field: "_id" });

mongoose.model("member", memberSchema);
