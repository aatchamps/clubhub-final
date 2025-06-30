import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/events");
        setEvents(response.data);
      } catch (err) {
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: '#ffffff'
    }}>Loading...</div>
  );

  if (error) return (
    <div className="error-message" style={{ margin: '20px' }}>{error}</div>
  );

  return (
    <div style={{ backgroundColor: '#000000', padding: '20px', color: '#ffffff' }}>
      <h2 style={{ 
        color: '#20643e',
        animation: 'slideIn 0.5s ease',
        marginBottom: '30px'
      }}>All Events</h2>

      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        padding: '20px'
      }}>
        {events.map((event) => (
          <div 
            key={event._id}
            className="card"
            style={{ 
              width: '300px',
              margin: 'auto',
              overflow: 'hidden'
            }}
          >
            {event.poster && (
              <div style={{ overflow: 'hidden' }}>
                <img 
                  src={`http://localhost:5000/uploads/${event.poster}`}
                  alt={`${event.name} poster`}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                />
              </div>
            )}
            <div style={{ padding: '15px' }}>
              <h4 style={{ 
                margin: '0 0 10px 0',
                color: '#20643e'
              }}>{event.name}</h4>
              <p style={{ fontSize: '14px', margin: '5px 0' }}>
                <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}<br/>
                <strong>Venue:</strong> {event.venue}<br/>
                <strong>Host:</strong> {event.host?.orgName}
              </p>
              <p style={{ 
                fontSize: '14px',
                margin: '10px 0',
                color: '#666'
              }}>{event.description}</p>
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#666',
          animation: 'fadeIn 0.5s ease'
        }}>
          No events available at the moment.
        </div>
      )}
    </div>
  );
};

export default EventsList;
