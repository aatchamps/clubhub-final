import React, { useEffect, useState, useContext } from "react";
import axios from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState(new Set());
  const [msg, setMsg] = useState("");
  const [attendanceMap, setAttendanceMap] = useState({});
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch both events and registration status
  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    // Fetch all events and user's registrations
    const fetchData = async () => {
      try {
        const [eventsRes, registrationsRes] = await Promise.all([
          axios.get("/events"),
          axios.get("/events/registered"), // You'll need to add this endpoint
        ]);

        setEvents(eventsRes.data);
        // Create a Set of registered event IDs
        const registeredIds = new Set(
          registrationsRes.data.map((reg) => reg.event)
        );
        setRegisteredEvents(registeredIds);
        // Map eventId to attendance
        const attMap = {};
        registrationsRes.data.forEach((reg) => {
          attMap[reg.event] = reg.attendance;
        });
        setAttendanceMap(attMap);
      } catch (err) {
        setMsg(err.response?.data?.error || "Failed to load data");
      }
    };

    fetchData();
  }, [token, navigate]);

  const handleRegister = async (eventId) => {
    try {
      await axios.post(`/events/${eventId}/register`);
      // Update local state to show registration success immediately
      setRegisteredEvents((prev) => new Set([...prev, eventId]));
      setMsg("Registration successful!");
    } catch (err) {
      setMsg(err.response?.data?.error || "Registration failed");
    }
  };

  const handleDownloadCertificate = async (eventId) => {
    try {
      const response = await axios.get(`/certificates/${eventId}/download`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "certificate.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setMsg(err.response?.data?.msg || "Certificate download failed");
    }
  };

  return (
    <div
      style={{ backgroundColor: "#000000", padding: "20px", color: "#ffffff" }}
    >
      <h2
        style={{
          color: "#20643e",
          animation: "slideIn 0.5s ease",
        }}
      >
        Student Dashboard
      </h2>
      {msg && (
        <div
          className={
            msg.includes("failed") ? "error-message" : "success-message"
          }
          style={{ animation: "fadeIn 0.3s ease" }}
        >
          {msg}
        </div>
      )}
      <h3>Live Events</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
          gap: "clamp(10px, 2vw, 20px)",
          width: "100%",
        }}
      >
        {events.map((event) => (
          <div
            key={event._id}
            className="card"
            style={{
              width: "300px",
              margin: "auto",
              overflow: "hidden",
              transition: "all 0.3s ease",
              backgroundColor: "#ffffff",
              color: "#000000",
            }}
          >
            {event.poster && (
              <div style={{ overflow: "hidden" }}>
                <img
                  src={`http://13.127.127.131:5000/uploads/${event.poster}`}
                  alt={`${event.name} poster`}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                    ":hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />
              </div>
            )}
            <div style={{ padding: "15px" }}>
              <h4
                style={{
                  margin: "0 0 10px 0",
                  color: "#20643e",
                  transition: "color 0.3s ease",
                }}
              >
                {event.name}
              </h4>
              <p style={{ fontSize: "14px", margin: "5px 0" }}>
                <strong>Date:</strong>{" "}
                {new Date(event.date).toLocaleDateString()}
                <br />
                <strong>Venue:</strong> {event.venue}
                <br />
                <strong>Host:</strong> {event.host?.orgName}
              </p>
              <div style={{ marginTop: "15px" }}>
                {registeredEvents.has(event._id) ? (
                  attendanceMap[event._id] === "P" ? (
                    <button
                      onClick={() => handleDownloadCertificate(event._id)}
                      className="ripple"
                      style={{
                        width: "100%",
                        padding: "8px",
                        backgroundColor: "#20643e",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        marginTop: "8px",
                      }}
                    >
                      Download Certificate
                    </button>
                  ) : (
                    <span
                      style={{
                        backgroundColor: "#ffffff",
                        color: "#20643e",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        display: "inline-block",
                        border: "1px solid #20643e",
                        transition: "all 0.3s ease",
                      }}
                    >
                      Registration Successful ✓
                    </span>
                  )
                ) : (
                  <button
                    onClick={() => handleRegister(event._id)}
                    className="ripple"
                    style={{
                      width: "100%",
                      padding: "8px",
                      backgroundColor: "#20643e",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    Register
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
