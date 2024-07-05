import { Box, Card, CardContent, CardMedia, Grid, Typography, useMediaQuery } from '@mui/material'
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
            <Box sx={{ height: isMobile ? 325 : 130, width: isMobile ? 260 : isTablet ? 500 : 700, display: "block" }}>
                <Card sx={{ display: 'flex', flexDirection: 'column', marginTop: 0 }}>
                    {isMobile && (
                      <CardMedia
                        component="img"
                        sx={{ height: 200, objectFit: "cover" }}
                        image={event.eventCoverPhoto}
                        alt={event.eventTitle}
                      />
                    )}
                    <CardContent sx={{ flexGrow: 1 }} >
                        <Typography variant="h5" align={isMobile ? "center" : "left"}>
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



