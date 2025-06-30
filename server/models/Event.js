const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  poster: String, // file path or URL
  date: Date,
  rules: String,
  venue: String,
  host: { type: mongoose.Schema.Types.ObjectId, ref: "Host" },
  registrations: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Registration" },
  ],
});

module.exports = mongoose.model("Event", eventSchema);
