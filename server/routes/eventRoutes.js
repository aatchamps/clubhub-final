const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Public
router.get("/", eventController.getAllEvents);

// Student
router.post("/:id/register", auth("student"), eventController.registerForEvent);
router.get("/registered", auth("student"), eventController.getRegisteredEvents);

// Host
router.post(
  "/create",
  auth("host"),
  upload.single("poster"),
  eventController.createEvent
);
router.get("/host", auth("host"), eventController.getHostEvents);
router.get("/:id", eventController.getEventDetails);

module.exports = router;
