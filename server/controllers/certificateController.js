const Registration = require("../models/Registration");
const Student = require("../models/Student");
const Event = require("../models/Event");
const Host = require("../models/Host");
const pdfGenerator = require("../utils/pdfGenerator");

exports.downloadCertificate = async (req, res) => {
  try {
    const { eventId } = req.params;
    const studentId = req.user.id;
    const registration = await Registration.findOne({
      event: eventId,
      student: studentId,
    });
    if (!registration || registration.attendance !== "P") {
      return res.status(403).json({ msg: "Not eligible for certificate" });
    }
    const student = await Student.findById(studentId);
    const event = await Event.findById(eventId).populate("host");
    const host = event.host;
    const pdfBuffer = await pdfGenerator(student, event, host);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=certificate.pdf`,
    });
    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
