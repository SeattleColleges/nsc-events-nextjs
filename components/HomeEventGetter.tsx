'use client';

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Grid, Button } from '@mui/material';
import Link from "next/link";
import { ActivityDatabase } from "@/models/activityDatabase";
import EventCard from "./EventCard";

export function HomeEventsList(){
    // const [numEvents, setNumEvents] = useState(5);
    const [page, setPage] = useState(1)
    const [events, setEvents] = useState<ActivityDatabase[] | undefined>([]);
    const [reachedMaxEvents, setReachedMaxEvents] = useState(false)
    const getNumEvents = async(numEvents: number) => {
        const response = await fetch(`http://localhost:3000/api/events?page=${page}`);
        return response.json();
    }
    useEffect(() => {
        const eventData = getNumEvents(page);
        eventData.then(events => {
            // Filter out events where either isArchived or isHidden is true.
            const activeEvents = events.filter((event: { isArchived: boolean; isHidden: boolean; }) => !(event.isArchived || event.isHidden))
            setEvents(existing => existing?.concat(activeEvents) )
            // setReachedMaxEvents(events.length < page*5);
        });
    }, [page]);
    const handleLoadMoreEvents = () => {
        setPage(num => num + 1);
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