'use client';

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import Link from "next/link";
import { ActivityDatabase } from "@/models/activityDatabase";

const getEvents = async() => {
    const response = await fetch("http://localhost:3000/api/events");
    return response.json();
}


export function HomeEventsList(){

    const { data, isLoading, isError } = useQuery<ActivityDatabase[]>({
        queryKey: ["event"],
        queryFn: getEvents,
        select: (data: ActivityDatabase[]) => {
            return data.filter( (event) => event.isHidden?.valueOf() === false)
        },
    });

    if(isLoading) {
        return <span>Loading events...</span>
    } else if (isError) {
        return <span>Error when fetching events...</span>
    } else {
        return (
            <Grid container spacing={1}>
                {data?.map((event: ActivityDatabase) => (
                    <Grid item xs={12} key={event._id}>
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
                ))}
            </Grid>
        );
    }
}

export default HomeEventsList;