'use client';

import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid, Box, CardActions, Button } from '@mui/material';
import Link from "next/link";
import { ActivityDatabase } from "@/models/activityDatabase";
import { useFilteredEvents } from "@/components/HomeEventGetter";
import { formatDate } from "@/utility/dateUtils";
export function UpcomingEvent(){

    const { data, isLoading, isError } = useFilteredEvents();

    if(isLoading) {
        return <span>Loading events...</span>
    } else if (isError) {
        return <span>Error when fetching events...</span>
    } else {
        return (
            <Grid container spacing={1}>
                {data?.slice(0, 1).map((event: ActivityDatabase) => (
                    <Grid item xs={12} key={event._id}>
                        <Box sx={{ width: 400, height: 130 }}>
                            <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ height: 200, objectFit: 'cover' }}
                                    image={event.eventCoverPhoto}
                                    alt={event.eventTitle}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h5" align="center" fontWeight={"bold"}>
                                        {event.eventTitle}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Date: {formatDate(event.eventDate)}
                                    </Typography>
                                </CardContent>
                                <CardActions >
                                    <Link href={
                                        {
                                            pathname: "/event-detail",
                                            query: {
                                                id: event._id,
                                            },
                                        }

                                    } >
                                    <Button size={"small"} >Details</Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        );
    }
}

export default UpcomingEvent;