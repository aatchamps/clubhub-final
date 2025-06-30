const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  phone: String,
  email: { type: String, unique: true },
  password: String,
  usn: { type: String, unique: true },
  year: String,
  department: String,
  college: String,
  eventHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

module.exports = mongoose.model("Student", studentSchema);
