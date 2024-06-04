import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { ActivityDatabase } from "@/models/activityDatabase";
import Link from "next/link";
import React from 'react'
import { formatDate } from "@/utility/dateUtils";

// declare the event prop that will get passed to the component
interface EventCardProps {
    key: string;
    event: ActivityDatabase; 
  }

function EventCard({ event }: EventCardProps) {
  return (
    <Link href={{pathname: "/event-detail", query: {id: event._id}}} passHref >
        <Box component='a' sx={{textDecoration: 'none', width: '100%', display: 'block' }}>
            <Card sx={{ width: '100%', height: 130, display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h5" align="left" fontWeight="bold">
                            {event.eventTitle}
                        </Typography>
                        <Typography variant="body2" align="right" color="text.secondary">
                            Date: {formatDate(event.eventDate)}
                        </Typography>
                    </CardContent>
            </Card>
        </Box>
    </Link>
  )
}

export default EventCard



