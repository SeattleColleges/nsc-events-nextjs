'use client';

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Grid, Button } from '@mui/material';
import Link from "next/link";
import { ActivityDatabase } from "@/models/activityDatabase";
import EventCard from "./EventCard";

export function HomeEventsList(){
    const [numEvents, setNumEvents] = useState(5);
    const [events, setEvents] = useState<ActivityDatabase[] | undefined>([]);
    const [reachedMaxEvents, setReachedMaxEvents] = useState(false)
    const getNumEvents = async(numEvents: number) => {
        const apiUrl = process.env.NSC_EVENTS_PUBLIC_API_URL || `http://localhost:3000/api`;
        const response = await fetch(`${apiUrl}/events?numEvents=${numEvents}`);
        return response.json();
    }
    useEffect(() => {
        const eventData = getNumEvents(numEvents);
        eventData.then(events => {
            // Filter out events where either isArchived or isHidden is true.
            const activeEvents = events.filter((event: { isArchived: boolean; isHidden: boolean; }) => !(event.isArchived || event.isHidden))
            setEvents(activeEvents)
            setReachedMaxEvents(events.length < numEvents);
        });
    }, [numEvents]);
    const handleLoadMoreEvents = () => {
        setNumEvents(num => num + 5);
    };
    // if(isLoading) {
    //     return <span>Loading events...</span>
    // } else if (isError) {
    //     return <span>Error when fetching events...</span>
    // } else {
    return (
        <Grid container spacing={1}>
            {
                events?.map((event: ActivityDatabase) => (
                    <EventCard
                        key={event._id}
                        event={event}
                    />

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
    // }
}

export default HomeEventsList;