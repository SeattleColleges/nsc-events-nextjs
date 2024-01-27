import React from 'react';
import { Typography, Card, CardContent, CardMedia, Box } from '@mui/material';


const EventDetail = () => {

  // todo: fetch event data from backend using event id from url
    // can use useEffect to fetch event data from backend when component mounts
    // handle any errors that may arise during data fetching process, (network & server errors)
  // todo: once data is fetched, store in state variable
    // format any data that needs to be formatted (date, time, etc..)
    // use state variable to deplay event details in component 
  
  // temporary: mockEvent is placeholder for the event that'll be captured
  const mockEvent = {
    eventTitle: "Sample Event",
    eventDescription: "This is a sample event description.",
    eventDate: new Date().toDateString(),
    eventStartTime: "10:00 AM",
    eventEndTime: "4:00 PM",
    eventLocation: "123 Main St, City, Country",
    eventCoverPhoto: "https://via.placeholder.com/150"
  }

    return (
      // <div>
      //   <h1>{mockEvent.eventTitle}</h1>
      //   <img src={mockEvent.eventCoverPhoto} alt={mockEvent.eventTitle}/>
      //   <p>{mockEvent.eventDescription}</p>
      //   <p>Date: {mockEvent.eventDate}</p>
      //   <p>Start Time: {mockEvent.eventStartTime}</p>
      //   <p>End Time: {mockEvent.eventEndTime}</p>
      //   <p>Location: {mockEvent.eventLocation}</p>
      // </div>

      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image={mockEvent.eventCoverPhoto}
            alt={mockEvent.eventTitle}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {mockEvent.eventTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {mockEvent.eventDescription}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Date: {mockEvent.eventDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Start Time: {mockEvent.eventStartTime}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              End Time: {mockEvent.eventEndTime}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Location: {mockEvent.eventLocation}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
};

export default EventDetail;
