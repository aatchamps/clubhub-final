const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const Host = require("../models/Host");

exports.signupStudent = async (req, res) => {
  try {
    const {
      name,
      dob,
      phone,
      email,
      password,
      usn,
      year,
      department,
      college,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({
      name,
      dob,
      phone,
      email,
      password: hashedPassword,
      usn,
      year,
      department,
      college,
    });
    await student.save();
    res.status(201).json({ msg: "Student registered" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ msg: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    const token = jwt.sign(
      { id: student._id, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.signupHost = async (req, res) => {
  try {
    const { orgName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const host = new Host({ orgName, email, password: hashedPassword });
    await host.save();
    res.status(201).json({ msg: "Host registered" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.loginHost = async (req, res) => {
  try {
    const { email, password } = req.body;
    const host = await Host.findOne({ email });
    if (!host) return res.status(400).json({ msg: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, host.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    const token = jwt.sign(
      { id: host._id, role: "host" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
