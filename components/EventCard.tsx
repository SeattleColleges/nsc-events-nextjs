import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { ActivityDatabase } from "@/models/activityDatabase";
import Link from "next/link";
import React from 'react'

// declare the event prop that will get passed to the component
interface EventCardProps {
    key: string;
    event: ActivityDatabase; 
  }

function EventCard({ key, event }: EventCardProps) {

  return (
    <div>
        <Grid item xs={12} key={key}>
            <Link href={
                {
                    pathname: "/event-detail",
                    query: {
                        id: event._id,
                    },
                }
            } >
                <Box sx={{ width: 700, height: 130 }}>
                    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h5" align="left" fontWeight={"bold"}>
                                {event.eventTitle}
                            </Typography>
                            <Typography variant="body2" align="right" color="text.secondary">
                                Date: {event.eventDate}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Link>
        </Grid>
    </div>
  )
}

export default EventCard