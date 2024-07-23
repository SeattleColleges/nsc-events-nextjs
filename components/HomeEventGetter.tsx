'use client';

import React, { useEffect, useState } from "react";
import { Grid, Button, useMediaQuery, useTheme, Container } from '@mui/material';
import { ActivityDatabase } from "@/models/activityDatabase";
import EventCard from "./EventCard";
import { useFilteredEvents } from "@/utility/queries";
import Link from "next/link";

export function HomeEventsList(){
    const [page, setPage] = useState(1)
    const [events, setEvents] = useState<ActivityDatabase[]>([]);
    const [reachedLastPage, setReachedLastPage] = useState(false);
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
    const { data } = useFilteredEvents(page, true);

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
        <Container maxWidth={false}>
            <Grid
                container
                flexDirection={(isMobile || isTablet) ? "column" : "row" }
                justifyContent="center"
                alignItems="center"
                sx={{ m: "auto" }}
            >
            {
                events?.map((event: ActivityDatabase) => (
                    <Grid item xs={12} key={event._id}>
                        <Link key={event._id} href={
                            {
                                pathname: "/event-detail",
                                query: {
                                    id: event._id,
                                    events: JSON.stringify(events.map(e => e._id)),
                                    from: 'home',
                                    page: page,
                                },
                            }
                        } >
                        <EventCard
                            key={event._id}
                            event={event}
                        />
                        </Link>
                    </Grid>
                ))}
            {
                !reachedLastPage &&
                <Button onClick={handleLoadMoreEvents}
                        type="button"
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
        </Container>
    );
}

export default HomeEventsList;