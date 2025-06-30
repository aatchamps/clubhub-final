import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useParams, Link } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`/events/${id}`);
        setEvent(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#000000",
          color: "#ffffff",
        }}
      >
        Loading...
      </div>
    );

  if (!event)
    return (
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#000000",
          color: "#ffffff",
        }}
      >
        Event not found
      </div>
    );

  return (
    <div
      style={{
        backgroundColor: "#000000",
        padding: "20px",
        color: "#ffffff",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "clamp(15px, 3vw, 30px)",
          width: "90%",
        }}
      >
        {event.poster && (
          <div
            style={{
              width: "100%",
              height: "400px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src={`http://13.127.127.131:5000/uploads/${event.poster}`}
              alt="Event Poster"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        )}

        <div style={{ padding: "20px" }}>
          <h2
            style={{
              color: "#20643e",
              marginBottom: "20px",
            }}
          >
            {event.name}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "15px",
              marginBottom: "20px",
            }}
          >
            <div>
              <strong style={{ color: "#20643e" }}>Date:</strong>
              <div>{new Date(event.date).toLocaleDateString()}</div>
            </div>
            <div>
              <strong style={{ color: "#20643e" }}>Venue:</strong>
              <div>{event.venue}</div>
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <strong style={{ color: "#20643e" }}>Description:</strong>
            <p style={{ color: "#333", marginTop: "5px" }}>
              {event.description}
            </p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <strong style={{ color: "#20643e" }}>Rules:</strong>
            <p style={{ color: "#333", marginTop: "5px" }}>{event.rules}</p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <strong style={{ color: "#20643e" }}>Registrations:</strong>
            <p style={{ color: "#333", marginTop: "5px" }}>
              {event.registrations?.length || 0} students registered
            </p>
          </div>

          <Link
            to={`/host/events/${id}/registrations`}
            style={{ textDecoration: "none" }}
          >
            <button
              className="ripple"
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#20643e",
                color: "#ffffff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                transition: "all 0.3s ease",
              }}
            >
              View Registrations & Attendance →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
