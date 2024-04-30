'use client';

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, Typography, Grid, Box, Button } from '@mui/material';
import Link from "next/link";
import { ActivityDatabase } from "@/models/activityDatabase";

const getEvents = async() => {
    const response = await fetch("http://localhost:3000/api/events");
    return response.json();
}

export function useFilteredEvents() {
    return useQuery({
        queryKey: ["event"],
        queryFn: getEvents,
        select: (data: ActivityDatabase[]) => data.filter( event =>
            !(event.isHidden) && !(event.isArchived))?.sort((event1, event2) => {
            return new Date(event1.eventDate).getTime() - new Date(event2.eventDate).getTime();
        }),
    });
}

export function HomeEventsList(){
    const [numEvents, setNumEvents] = useState(5);
    const [events, setEvents] = useState<ActivityDatabase[] | undefined>([]);
    const [reachedMaxEvents, setReachedMaxEvents] = useState(false)
    const { isLoading, isError } = useFilteredEvents();
    useEffect(() => {
        const eventData = getNumEvents(numEvents);
        eventData.then(events => {
            const newEvents = events.filter((event: { isArchived: boolean; isHidden: boolean; }) => !(event.isArchived || event.isHidden))
            setEvents(newEvents)
            setReachedMaxEvents(events.length < numEvents);
        });
    }, [numEvents]);
    const getNumEvents = async(numEvents: number) => {
        const response = await fetch(`http://localhost:3000/api/events/${numEvents}`);
        return response.json();
    }
    const handleLoadMoreEvents = () => {
        setNumEvents(num => num + 5);
    };
    if(isLoading) {
        return <span>Loading events...</span>
    } else if (isError) {
        return <span>Error when fetching events...</span>
    } else {
        return (
            <Grid container spacing={1}>
                {events?.map((event: ActivityDatabase) => (
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
                {
                    !reachedMaxEvents &&
                    <Button onClick={handleLoadMoreEvents}
                            type='button'
                            variant="contained"
                            color="primary"
                            style={{
                                textTransform: "none",
                                margin: '1em auto',
                            }}>
                        Load more events
                    </Button>
                }
            </Grid>
        );
    }
}

export default HomeEventsList;