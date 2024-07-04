'use client';

import { ActivityDatabase } from "@/models/activityDatabase";
import { Button, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import styles from '@/app/home.module.css'
import { useMyEvents } from "@/utility/queries";
import { getCurrentUserId } from "@/utility/userUtils";
import Link from "next/link";

export function MyEventsList() {
    // useState to hold the events from the API call
    const [events, setEvents] = useState<ActivityDatabase[]>([]);
    const [page, setPage] = useState(1);
    const [hasReachedLastPage, setHasReachedLastPage] = useState(false)
    const { data } = useMyEvents(getCurrentUserId(), page);
    useEffect(() => {
        if (data) {
            setEvents((prevEvents) => [...prevEvents, ...data]);
            setHasReachedLastPage(data.length < 5)
        }
    }, [data]);
    const handleLoadMoreEvents = () => {
        setPage(page => page + 1)
    }
    return (
        <Container maxWidth={false}>
            <Grid
                container
                direction={'column'}
                alignItems={'center'}
            >
                {events?.map((event: ActivityDatabase) => (
                    <Grid item xs={12} key={event._id}>
                        <EventCard
                            event={event} key={""}                        />
                    </Grid>
                ))}
                {/* {events.map(event => (
                <Link key={event._id} href={`/eventDetails?id=${event._id}`} passHref>
                    <a>{event.eventTitle}</a>
                </Link>
                ))} */}
                {!hasReachedLastPage && (
                    <Grid item>
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
                        </Grid>
                    )}
            </Grid>
        </Container>
    );
}

export default MyEventsList;