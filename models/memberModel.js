const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const AddressSchema = new mongoose.Schema({
	city: { type: String, required: [true, 'Please Enter Your City'] },
	street: { type: String, required: [true, 'Please Enter Street Name'] },
	building: { type: Number, required: [true, 'Please Enter Bulding No'] },
	_id: false,
}); // Schema For the Full Address

const MemberSchema = mongoose.Schema(
	{
		_id: Number,
		full_name: { type: String, required: [true, 'Please Enter Your Full Name'] },
		email: {
			type: String,
			unique: [true, 'This Email Already Exists try with another email'],
			match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please Enter a valid email address'],
			required: [true, 'Please Enter Your Email'],
		},
		password: {
			type: String,
			minlength: [8, 'Password must be at least 8 characters long'],
			required: [true, 'Please Enter Your Password'],
		},
		image: {
			type: String,
			required: false,
		},
		phone_number: {
			type: String,
			match: [/^01[0125][0-9]{8}$/, 'Please Enter Valid Phone Number'],
			required: false,
		},
		birth_date: {
			type: Date,
			trim: true,
			required: false,
			// Min & Max Date 
			min: new Date(1950, 0, 1),
			max: new Date(2010, 11, 31),
		},
		address: { type: AddressSchema, required: false },
		last_login: {
			type: Date,
			required: false,
		},
		ban_date: { type: Date, required: false },
		activated: { type: Boolean, required: false, default: false },
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	}
);

MemberSchema.plugin(autoIncrement, { id: 'member_id', inc_field: '_id' });

mongoose.model('members', MemberSchema);
