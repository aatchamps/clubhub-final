const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");
const auth = require("../middleware/authMiddleware");

// Host only
router.get("/:eventId", auth("host"), attendanceController.getRegistrations);
router.patch(
  "/toggle/:registrationId",
  auth("host"),
  attendanceController.toggleAttendance
);

module.exports = router;
