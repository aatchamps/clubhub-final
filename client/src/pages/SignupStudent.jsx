import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const SignupStudent = () => {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    phone: "",
    email: "",
    password: "",
    usn: "",
    year: "",
    department: "",
    college: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("/auth/student/signup", form);
      navigate("/student/login");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div>
      <h2>Student Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          name="dob"
          type="date"
          placeholder="DOB"
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <input name="usn" placeholder="USN" onChange={handleChange} required />
        <input
          name="year"
          placeholder="Year"
          onChange={handleChange}
          required
        />
        <input
          name="department"
          placeholder="Department"
          onChange={handleChange}
          required
        />
        <input
          name="college"
          placeholder="College"
          onChange={handleChange}
          required
        />
        <button type="submit">Signup</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
    </div>
  );
};

export default SignupStudent;
