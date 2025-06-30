const Student = require("../models/Student");
const Host = require("../models/Host"); // Add this line

exports.getProfile = async (req, res) => {
  try {
    let user;
    if (req.user.role === "student") {
      user = await Student.findById(req.user.id).select("-password");
    } else if (req.user.role === "host") {
      user = await Host.findById(req.user.id).select("-password");
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password;
    let user;

    if (req.user.role === "student") {
      user = await Student.findByIdAndUpdate(req.user.id, updates, {
        new: true,
      }).select("-password");
    } else if (req.user.role === "host") {
      user = await Host.findByIdAndUpdate(req.user.id, updates, {
        new: true,
      }).select("-password");
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
