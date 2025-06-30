import React, { useState, useEffect } from "react";
import axios from "../../api/axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios.get("/user/profile").then((res) => {
      setProfile(res.data);
      setForm(res.data);
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put("/user/profile", form);
      setMsg("Profile updated successfully!");
      setEdit(false);
      setProfile(form);
    } catch {
      setMsg("Update failed");
    }
  };

  if (!profile)
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

  return (
    <div
      style={{
        backgroundColor: "#000000",
        padding: "20px",
        color: "#ffffff",
      }}
    >
      <h2
        style={{
          color: "#20643e",
          animation: "slideIn 0.5s ease",
          marginBottom: "30px",
        }}
      >
        My Profile
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
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          color: "#000000",
        }}
      >
        {edit ? (
          <div style={{ display: "grid", gap: "15px" }}>
            <div>
              <label
                style={{
                  color: "#20643e",
                  marginBottom: "5px",
                  display: "block",
                }}
              >
                Email
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  color: "#20643e",
                  marginBottom: "5px",
                  display: "block",
                }}
              >
                Phone
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
              />
            </div>
            <button
              onClick={handleSave}
              className="ripple"
              style={{
                backgroundColor: "#20643e",
                color: "#ffffff",
                padding: "10px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Save Changes
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "15px" }}>
            <div>
              <label style={{ color: "#20643e", fontWeight: "bold" }}>
                Email:
              </label>
              <div>{profile.email}</div>
            </div>
            <div>
              <label style={{ color: "#20643e", fontWeight: "bold" }}>
                Phone:
              </label>
              <div>{profile.phone}</div>
            </div>
            <div>
              <label style={{ color: "#20643e", fontWeight: "bold" }}>
                USN:
              </label>
              <div>{profile.usn}</div>
            </div>
            <div>
              <label style={{ color: "#20643e", fontWeight: "bold" }}>
                Year:
              </label>
              <div>{profile.year}</div>
            </div>
            <div>
              <label style={{ color: "#20643e", fontWeight: "bold" }}>
                Department:
              </label>
              <div>{profile.department}</div>
            </div>
            <div>
              <label style={{ color: "#20643e", fontWeight: "bold" }}>
                College:
              </label>
              <div>{profile.college}</div>
            </div>
            <button
              onClick={() => setEdit(true)}
              className="ripple"
              style={{
                backgroundColor: "#20643e",
                color: "#ffffff",
                padding: "10px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "10px",
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

export default Profile;
