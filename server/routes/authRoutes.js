const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Student
router.post("/student/signup", authController.signupStudent);
router.post("/student/login", authController.loginStudent);

// Host
router.post("/host/signup", authController.signupHost);
router.post("/host/login", authController.loginHost);

router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    let User = role === "student" ? Student : Host;
    
    const user = await User.findOne({ email });
    // ... rest of login logic
    
    // Make sure role is included in the token payload
    const token = jwt.sign(
      { id: user._id, role: user.role || role },
      process.env.JWT_SECRET
    );
    
    res.json({ token, user: { ...user._doc, password: undefined } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
