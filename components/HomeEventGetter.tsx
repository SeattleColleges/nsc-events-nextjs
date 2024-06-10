'use client';

import React, { useEffect, useState } from "react";
import { Grid, Button } from '@mui/material';
import { ActivityDatabase } from "@/models/activityDatabase";
import EventCard from "./EventCard";
import { useFilteredEvents } from "@/utility/queries";

export function HomeEventsList(){
    const [page, setPage] = useState(1)
    const [events, setEvents] = useState<ActivityDatabase[]>([]);
    const [reachedLastPage, setReachedLastPage] = useState(false);
    const { data } = useFilteredEvents(page);
    useEffect(() => {
        if (data) {
            setEvents((prevEvents) => {
                const newEvents = [...prevEvents, ...data];
                // filter events to avoid duplicates (fixes Unarchive Event bug)
                const uniqueEvents = newEvents.filter((event, index, self) =>
                    index === self.findIndex((e) => e._id === event._id)
                );
                return uniqueEvents;
            });
            setReachedLastPage(data.length < 5);
        }
    }, [data]);
    const handleLoadMoreEvents = () => {
        setPage(num => num + 1);
    };
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
                !reachedLastPage &&
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

export default HomeEventsList;