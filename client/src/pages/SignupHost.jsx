import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const SignupHost = () => {
  const [form, setForm] = useState({
    orgName: "",
    email: "",
    password: "",
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
      await axios.post("/auth/host/signup", form);
      navigate("/host/login");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div>
      <h2>Host Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="orgName"
          placeholder="Organisation Name"
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
        <button type="submit">Signup</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
    </div>
  );
};

export default SignupHost;
