const Registration = require("../models/Registration");

exports.getRegistrations = async (req, res) => {
  try {
    const { eventId } = req.params;
    const registrations = await Registration.find({ event: eventId }).populate(
      "student",
      "name usn email"
    );
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.toggleAttendance = async (req, res) => {
  try {
    const { registrationId } = req.params;
    const registration = await Registration.findById(registrationId);
    if (!registration)
      return res.status(404).json({ msg: "Registration not found" });
    registration.attendance = registration.attendance === "A" ? "P" : "A";
    await registration.save();
    res.json({
      msg: "Attendance updated",
      attendance: registration.attendance,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
