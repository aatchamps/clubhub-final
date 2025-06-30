import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

const HostEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/events/host");
        setEvents(response.data);
      } catch (err) {
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

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

  return (
    <div
      style={{ backgroundColor: "#000000", padding: "20px", color: "#ffffff" }}
    >
      <h2
        style={{
          color: "#20643e",
          animation: "slideIn 0.5s ease",
          marginBottom: "30px",
        }}
      >
        My Events
      </h2>

      {error && (
        <div className="error-message" style={{ marginBottom: "20px" }}>
          {error}
        </div>
      )}

      <Link to="/host/events/create" style={{ textDecoration: "none" }}>
        <button
          className="ripple"
          style={{
            backgroundColor: "#20643e",
            color: "#ffffff",
            padding: "12px 24px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.3s ease",
          }}
        >
          <span style={{ fontSize: "20px" }}>+</span>
          Create New Event
        </button>
      </Link>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
          gap: "clamp(10px, 2vw, 20px)",
          padding: "clamp(10px, 2vw, 20px)",
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
                  }}
                />
              </div>
            )}

            <div style={{ padding: "15px" }}>
              <h4
                style={{
                  margin: "0 0 10px 0",
                  color: "#20643e",
                }}
              >
                {event.name}
              </h4>

              <p style={{ fontSize: "14px", margin: "5px 0" }}>
                <strong>Date:</strong>{" "}
                {new Date(event.date).toLocaleDateString()}
                <br />
                <strong>Venue:</strong> {event.venue}
              </p>

              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "14px", color: "#666" }}>
                  Registrations: {event.registrations?.length || 0}
                </span>

                <Link
                  to={`/host/events/${event._id}/registrations`}
                  style={{ textDecoration: "none" }}
                >
                  <button
                    className="ripple"
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "#20643e",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "14px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    View Details →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: "#666",
            animation: "fadeIn 0.5s ease",
          }}
        >
          No events created yet. Start by creating your first event!
        </div>
      )}
    </div>
  );
};

export default HostEvents;
