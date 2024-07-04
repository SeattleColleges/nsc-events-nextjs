import { Box, Card, CardContent, Grid, Typography, useMediaQuery } from '@mui/material'
import { ActivityDatabase } from "@/models/activityDatabase";
import Link from "next/link";
import React from 'react'
import { formatDate } from "@/utility/dateUtils";
import theme from '@/app/theme';

// declare the event prop that will get passed to the component
interface EventCardProps {
    key: string;
    event: ActivityDatabase; 
  }

function EventCard({ event }: EventCardProps) {
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

  return (
    <div>
      <Grid item xs={12} key={event._id}>
        <Link href={
            {
                pathname: "/event-detail",
                query: {
                    id: event._id,
                },
            }
        } >
            <Box sx={{ height: 130, width: isMobile ? 260 : isTablet ? 500 : 700, display: "block" }}>
                <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h5" align={isMobile ? "center" : "left"} pb={isMobile ? 1 : 0}>
                            {event.eventTitle}
                        </Typography>
                        <Typography variant="body2" align={isMobile ? "center" : "right"} color="text.secondary">
                            Date: { formatDate(event.eventDate) }
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



