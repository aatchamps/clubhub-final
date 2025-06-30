import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { login } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("student");
  const [isFlipped, setIsFlipped] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
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
    orgName: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const endpoint = `/${activeTab}/${isFlipped ? "signup" : "login"}`;
      const response = await axios.post(`/auth${endpoint}`, form);
      if (!isFlipped) {
        login({ role: activeTab, email: form.email }, response.data.token);
        navigate(`/${activeTab}/dashboard`);
      } else {
        setIsFlipped(false);
      }
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div style={{
      width: "min(90%, 800px)",
      margin: "0 auto",
      padding: "clamp(10px, 3vw, 20px)",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: "#000000",
      paddingTop: "40px",
      paddingBottom: "20px"
    }}>
      <h1 style={{ 
        textAlign: "center", 
        marginBottom: "20px" 
      }}>
        <span style={{ color: "#ffffff" }}>Welcome to </span>
        <span className="logo-large">ClubHub</span>
      </h1>

      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        marginBottom: "20px" 
      }}>
        <div className="toggle-container">
          <div className={`toggle-slider ${activeTab}`}></div>
          <button
            onClick={() => setActiveTab("student")}
            className={`toggle-button ${activeTab === "student" ? "active" : "inactive"}`}
          >
            Student
          </button>
          <button
            onClick={() => setActiveTab("host")}
            className={`toggle-button ${activeTab === "host" ? "active" : "inactive"}`}
          >
            Host
          </button>
        </div>
      </div>

      <div className={`flip-container ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-card">
          {/* Login Side */}
          <div className="flip-front">
            <div className="card-title">
              {activeTab === "student" ? "Student Login" : "Host Login"}
            </div>
            <form onSubmit={handleSubmit} className="form-container">
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                required
                className="input-field"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="input-field"
              />
              <button type="submit" className="submit-button ripple">
                Login
              </button>
              <div className="card-switch">
                Don't have an account? 
                <button onClick={() => setIsFlipped(true)}>
                  Sign up
                </button>
              </div>
            </form>
          </div>

          {/* Signup Side */}
          <div className="flip-back">
            <div className="card-title">
              {activeTab === "student" ? "Student Registration" : "Host Registration"}
            </div>
            <form onSubmit={handleSubmit} className="form-container">
              {activeTab === "student" ? (
                <>
                  <input
                    name="name"
                    placeholder="Full Name"
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    name="dob"
                    type="date"
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    name="phone"
                    placeholder="Phone Number"
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    name="usn"
                    placeholder="USN"
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    name="year"
                    placeholder="Year"
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    name="department"
                    placeholder="Department"
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    name="college"
                    placeholder="College"
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </>
              ) : (
                <>
                  <input
                    name="orgName"
                    placeholder="Organization Name"
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </>
              )}
              <button type="submit" className="submit-button ripple">
                Sign Up
              </button>
              <div className="card-switch">
                Already have an account? 
                <button onClick={() => setIsFlipped(false)}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {error && (
        <div style={{ 
          color: "#ff4444", 
          marginTop: "10px", 
          textAlign: "center",
          animation: "fadeIn 0.3s ease"
        }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Home;
