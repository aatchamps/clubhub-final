const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

// Get profile - for both student and host
router.get("/profile", auth(), userController.getProfile);

// Update profile - handle both roles
router.put("/profile", auth(), userController.updateProfile);

module.exports = router;
