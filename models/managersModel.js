const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const managersSchema = mongoose.Schema(
  {
    _id: Number,
    firstName: {
      type: String,
      required: [true, "You need to enter first name"],
    },
    lastName: {
      type: String,
      required: [true, "You need to enter last name"],
    },
    email: {
      type: String,
      match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, "Please Enter a valid Email"],
      unique: true,
      required: [true, "You need to enter email"],
    },
    password: {
      type: String,
      required: [true, "You need to enter password"],
      minlength: [4, "Password must be at least 4 characters long"],
    },
    birthDate: {
      type: Date,
      required: [true, "You need to enter birth date"],
    },
    hireDate: {
      type: Date,
      required: [true, "you need to enter a hire date"],
      immutable: true,
    },
    salary: {
      type: Number,
      required: [true, "You need to enter salary "],
    },
    image: {
      type: String,
      required: [false],
    },
    role: {
      type: String,
      enum: ["super-admin", "admin", "employee"],
      required: [true, "You need to enter role"],
    },
  },
  { timestamps: true }
);

managersSchema.plugin(autoIncrement, { id: "managerId", inc_field: "_id" });
mongoose.model("managers", managersSchema);
