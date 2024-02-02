"use client"

import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, CardMedia, Box } from '@mui/material';
import { useQueryClient } from "@tanstack/react-query";
import { activityDatabase, ActivityDatabase } from "@/models/activityDatabase";

interface SearchParams {
  searchParams: {
    id: string;
  };
}

const EventDetail = ({ searchParams }: SearchParams) => {
  const [event, setEvent] = useState(activityDatabase)
  
  const queryClient = useQueryClient();
  
  useEffect( () => {
    if(searchParams.id) {
      const selectedEvent = (queryClient.getQueryData<ActivityDatabase[]>(['event']) as ActivityDatabase[])
          .find(event => event._id === searchParams.id) as ActivityDatabase;
      setEvent(selectedEvent)
    }

      }, [queryClient, searchParams.id]

  )
  return (

      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
              component="img"
              height="140"
              image={event.eventCoverPhoto}
              alt={event.eventTitle}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {event.eventTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.eventDescription}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Date: {event.eventDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Start Time: {event.eventStartTime}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              End Time: {event.eventEndTime}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Location: {event.eventLocation}
            </Typography>
          </CardContent>
        </Card>
      </Box>
  );
  
};

export default EventDetail;
