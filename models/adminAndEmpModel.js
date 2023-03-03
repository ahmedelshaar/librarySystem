const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const adminAndEmpSchema = mongoose.Schema({
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
    required: [true, "You need to enter email"],
  },
  password: {
    type: String,
    required: [true, "You need to enter password"],
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
    required: [true, "You need to enter image"],
  },
  role: {
    type: String,
    required: [true, "You need to enter role"],
  },
});

adminSchema.plugin(autoIncrement, { id: "adminId", inc_field: "_id" });
mongoose.model("adminAndEmp", adminAndEmpSchema);
