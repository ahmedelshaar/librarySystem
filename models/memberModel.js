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
      immutable: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
    },
    image: {
      type: String,
    },
    phone_number: {
      type: String,
      match: [/^01[0125][0-9]{8}$/, "Please Enter Valid Phone Number"],
    },
    birth_date: {
      type: Date,
      trim: true,
    },
    address: { type: AddressSchema },
    last_login: {
      type: Date,
      default: Date.now(),
    },
    ban_date: { type: Date },
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
