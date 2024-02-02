"use client"

import React from 'react';
import { Typography, Card, CardContent, CardMedia, Box } from '@mui/material';
import { useQueryClient } from "@tanstack/react-query";
import { Activity } from "@/models/activity";

const EventDetail = ( { searchParams }) => {
  const queryClient = useQueryClient();

  const id = searchParams.id

  const data = queryClient.getQueryData(["event"])
      .find((event: { _id: String; }) => event._id == id) as Activity;

    return (

      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image={data.eventCoverPhoto}
            alt={data.eventTitle}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.eventTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.eventDescription}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Date: {data.eventDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Start Time: {data.eventStartTime}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              End Time: {data.eventEndTime}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Location: {data.eventLocation}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
};

export default EventDetail;
