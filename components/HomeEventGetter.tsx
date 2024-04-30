'use client';

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Grid, Button } from '@mui/material';
import Link from "next/link";
import { ActivityDatabase } from "@/models/activityDatabase";
import EventCard from "./EventCard";

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
    }
}

export default HomeEventsList;