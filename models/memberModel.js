const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const AddressSchema = new mongoose.Schema({
	city: { type: String, required: [true, "Please Enter Your City"] },
	street: { type: String, required: [true, "Please Enter Street Name"] },
	building: { type: Number, required: [true, "Please Enter Bulding No"] },
	_id: false,
}); // Schema For the Full Address

const MemberSchema = mongoose.Schema(
	{
		_id: Number,
		full_name: { type: String, required: [true, "Please Enter Your Full Name"] },
		email: {
			type: String,
			unique: [true, "This Email Already Exists try with another email"],
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
		birth_date: {
			type: Date,
			required: [true, "Please Enter Your Birth Date"],
			trim: true,
		},
		address: { type: AddressSchema, required: true },
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
	}
);

MemberSchema.plugin(autoIncrement, { id: "member_id", inc_field: "_id" });

mongoose.model("members", MemberSchema);
