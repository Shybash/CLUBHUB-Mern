import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EventList.css';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('https://clubhub-backend.vercel.app/api/GetEvents', {
        withCredentials: true
    });
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <div className="get-events">
      <h1 className="upcoming-events">Upcoming Events</h1>
      <div className="event-list">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={index} className="event-card">
              <h2>{event.name}</h2>
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              <p>Time: {event.time}</p>
              <p>Venue: {event.location}</p>
              <p>Description: {event.description}</p>
            </div>
          ))
        ) : (
          <p className="no-events">No upcoming events at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default EventList;
