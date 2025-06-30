import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

const EventsList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("/events/host").then((res) => setEvents(res.data));
  }, []);

  return (
    <div>
      <h3>My Events</h3>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <Link to={`/host/events/${event._id}`}>{event.name}</Link> -{" "}
            {event.date?.slice(0, 10)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsList;
