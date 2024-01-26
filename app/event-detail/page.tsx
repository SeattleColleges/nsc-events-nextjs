import React from 'react';

const EventDetail = () => {

  const dummyEvent = {
    eventTitle: "Sample Event",
    imageUrl: "https://via.placeholder.com/150",
    description: "This is a sample event description.",
    date: "2024-01-30",
    startTime: "10:00 AM",
    endTime: "4:00 PM",
    location: "123 Main St, City, Country"
  }

    return (
      <div>
        <h1>Event Detail</h1>
        <h1>{dummyEvent.eventTitle}</h1>
        <img src={dummyEvent.imageUrl} alt={dummyEvent.eventTitle} />
        <p>{dummyEvent.description}</p>
        <p>Date: {dummyEvent.date}</p>
        <p>Start Time: {dummyEvent.startTime}</p>
        <p>End Time: {dummyEvent.endTime}</p>
        <p>Location: {dummyEvent.location}</p>
      </div>
    );
};

export default EventDetail;
