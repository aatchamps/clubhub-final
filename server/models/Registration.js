const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  attendance: { type: String, enum: ["A", "P"], default: "A" },
});

module.exports = mongoose.model("Registration", registrationSchema);
