import React, { useState, useEffect, useContext } from "react";
import axios from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const HostProfile = () => {
  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in and is a host
    if (!token || user?.role !== "host") {
      navigate("/");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setProfile(response.data);
          setForm(response.data);
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        setMsg(err.response?.data?.error || "Failed to load profile");
        if (err.response?.status === 403) {
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put("/user/profile", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        setProfile(response.data);
        setMsg("Profile updated successfully!");
        setEdit(false);
      }
    } catch (err) {
      setMsg(err.response?.data?.error || "Update failed");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#000000",
          color: "#ffffff",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!profile) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#000000",
          color: "#ffffff",
        }}
      >
        {msg || "Failed to load profile"}
      </div>
    );
  }

  return (
    <div
      style={{ backgroundColor: "#000000", padding: "20px", color: "#ffffff" }}
    >
      <h2
        style={{
          color: "#20643e",
          animation: "slideIn 0.5s ease",
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        Organization Profile
      </h2>

      {msg && (
        <div
          className={
            msg.includes("failed") ? "error-message" : "success-message"
          }
          style={{ animation: "fadeIn 0.3s ease", marginBottom: "20px" }}
        >
          {msg}
        </div>
      )}

      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          animation: "slideIn 0.5s ease",
        }}
      >
        {edit ? (
          <div style={{ display: "grid", gap: "20px" }}>
            <div>
              <label
                style={{
                  color: "#20643e",
                  marginBottom: "8px",
                  display: "block",
                }}
              >
                Organization Name
              </label>
              <input
                name="orgName"
                value={form.orgName || ""}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  color: "#000000",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  color: "#20643e",
                  marginBottom: "8px",
                  display: "block",
                }}
              >
                Email
              </label>
              <input
                name="email"
                value={form.email || ""}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  color: "#000000",
                }}
              />
            </div>
            <button
              onClick={handleSave}
              className="ripple"
              style={{
                backgroundColor: "#20643e",
                color: "#ffffff",
                padding: "12px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "10px",
                fontSize: "16px",
                transition: "all 0.3s ease",
              }}
            >
              Save Changes
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "20px" }}>
            <div>
              <label style={{ color: "#20643e", fontWeight: "bold" }}>
                Organization Name:
              </label>
              <div
                style={{ marginTop: "5px", fontSize: "16px", color: "#000000" }}
              >
                {profile.orgName}
              </div>
            </div>
            <div>
              <label style={{ color: "#20643e", fontWeight: "bold" }}>
                Email:
              </label>
              <div
                style={{ marginTop: "5px", fontSize: "16px", color: "#000000" }}
              >
                {profile.email}
              </div>
            </div>
            <button
              onClick={() => setEdit(true)}
              className="ripple"
              style={{
                backgroundColor: "#20643e",
                color: "#ffffff",
                padding: "12px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "10px",
                fontSize: "16px",
                transition: "all 0.3s ease",
              }}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostProfile;
