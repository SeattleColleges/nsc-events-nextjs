import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { ActivityDatabase } from "@/models/activityDatabase";
import Link from "next/link";
import React from 'react'
import { formatDate } from "@/utility/dateUtils";

// declare the event prop that will get passed to the component
interface EventCardProps {
    event: ActivityDatabase; 
  }

function EventCard({ event }: EventCardProps) {
  return (
    <div>
      <Grid item xs={12} key={event._id}>
        <Box sx={{ width: 700, height: 130 }}>
            <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" align="left">
                        {event.eventTitle}
                    </Typography>
                    <Typography variant="body2" align="right" color="text.secondary">
                        Date: { formatDate(event.eventDate) }
                    </Typography>
                </CardContent>
            </Card>
        </Box>
      </Grid>
    </div>
  )
}

export default EventCard



