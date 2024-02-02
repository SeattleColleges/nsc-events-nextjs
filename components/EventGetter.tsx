'use client';

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardMedia, Typography, Grid, Box, CardActions, Button } from '@mui/material';
import Link from "next/link";

const getEvents = async() => {
    const response = await fetch("http://localhost:3000/api/events");
    return response.json();
}

export function EventsList(){

    const { data, isLoading, isError } = useQuery<any>({
        queryKey: ["event"],
        queryFn: getEvents
    });

    if(isLoading) {
        return <span>Loading events...</span>
    } else if (isError) {
        return <span>Error when fetching events...</span>
    } else {
        return (
            <Grid container spacing={1}>
                {data?.map((event: any) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={event._id}>
                        <Box sx={{ width: 450, height: 400 }}>
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
                                    
                                </CardContent>
                                <CardActions>
                                    <Link href={
                                        {
                                            pathname: "/event-detail",
                                            query: {
                                                id: event._id,
                                            },
                                        }

                                    } >
                                    <Button   size={"small"}>Details</Button>
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

export default EventsList;







