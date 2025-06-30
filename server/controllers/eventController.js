const Event = require("../models/Event");
const Registration = require("../models/Registration");

exports.createEvent = async (req, res) => {
  try {
    const { name, description, date, rules, venue } = req.body;
    const poster = req.file ? req.file.filename : "";
    const event = new Event({
      name,
      description,
      poster,
      date,
      rules,
      venue,
      host: req.user.id,
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("host", "orgName");
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHostEvents = async (req, res) => {
  try {
    const events = await Event.find({ host: req.user.id });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEventDetails = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("registrations");
    res.json(event);
  } catch (err) {
    res.status(404).json({ error: "Event not found" });
  }
};

exports.registerForEvent = async (req, res) => {
  try {
    // Check if already registered
    const existingRegistration = await Registration.findOne({
      event: req.params.id,
      student: req.user.id
    });

    if (existingRegistration) {
      return res.status(400).json({ error: "Already registered for this event" });
    }

    const registration = new Registration({
      event: req.params.id,
      student: req.user.id,
    });
    await registration.save();
    
    await Event.findByIdAndUpdate(req.params.id, {
      $push: { registrations: registration._id },
    });
    
    res.status(201).json({ 
      msg: "Registered successfully",
      registration: registration 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Add this new controller method:
exports.getRegisteredEvents = async (req, res) => {
  try {
    const registrations = await Registration.find({ 
      student: req.user.id 
    });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
