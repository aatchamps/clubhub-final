const express = require("express");
const router = express.Router();
const certificateController = require("../controllers/certificateController");
const auth = require("../middleware/authMiddleware");

// Student only
router.get(
  "/:eventId/download",
  auth("student"),
  certificateController.downloadCertificate
);

module.exports = router;
