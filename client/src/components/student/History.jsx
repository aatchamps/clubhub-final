import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const History = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const response = await axios.get("/events/registered");
        // Get detailed event information for each registration
        const eventsWithDetails = await Promise.all(
          response.data.map(async (reg) => {
            const eventDetails = await axios.get(`/events/${reg.event}`);
            return {
              ...eventDetails.data,
              registrationStatus: reg.attendance,
              registrationDate: reg._id.toString().substring(0, 8),
            };
          })
        );
        setRegisteredEvents(eventsWithDetails);
      } catch (err) {
        setError("Failed to load registration history");
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredEvents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{
      maxWidth: "800px",
      margin: "0 auto",
      padding: "clamp(15px, 3vw, 30px)",
      width: "90%"
    }}>
      <h2>Registration History</h2>
      {registeredEvents.length === 0 ? (
        <p>No events registered yet.</p>
      ) : (
        <div>
          {registeredEvents.map((event) => (
            <div 
              key={event._id} 
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '15px',
                backgroundColor: '#f8f9fa'
              }}
            >
              <h3>{event.name}</h3>
              <div style={{ marginTop: '10px' }}>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Venue:</strong> {event.venue}</p>
                <p><strong>Description:</strong> {event.description}</p>
                <p>
                  <strong>Status:</strong>
                  <span style={{
                    color: event.registrationStatus === 'P' ? 'green' : 'orange',
                    marginLeft: '5px',
                    fontWeight: 'bold'
                  }}>
                    {event.registrationStatus === 'P' ? 'Attended' : 'Registered'}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
