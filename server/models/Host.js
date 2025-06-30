const mongoose = require("mongoose");

const hostSchema = new mongoose.Schema({
  orgName: String,
  email: { type: String, unique: true },
  password: String,
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

module.exports = mongoose.model("Host", hostSchema);
