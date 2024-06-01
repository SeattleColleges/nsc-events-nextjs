'use client';

import { ActivityDatabase } from "@/models/activityDatabase";
import { Button, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import styles from '@/app/home.module.css'
import { useMyEvents } from "@/utility/queries";

// decode the userId from localStorage
const getUserId = () => {
    const token = localStorage.getItem('token');
    if (token !== null){
        const userId = JSON.parse(atob(token.split(".")[1])).id;
        return userId;
    }
    return null;
}
// fetch API endpoint that contains the user's created events
const getMyEvents = async(userId: string) => {
    const apiUrl = process.env.NSC_EVENTS_PUBLIC_API_URL || `http://localhost:3000/api`;
    const response = await fetch(`${apiUrl}/events/user/${userId}`);
    return response.json();
}

export function MyEventsList() {
    // useState to hold the events from the API call
    const [events, setEvents] = useState<ActivityDatabase[]>([]);
    const [page, setPage] = useState(1);
    const [hasReachedLastPage, setHasReachedLastPage] = useState(false)
    const { data } = useMyEvents(getUserId(), page);
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
        <Container maxWidth={false} className={styles.container}>
            <Grid
                container
                direction={'column'}
                spacing={1}
                alignItems={'center'}
                justifyItems={'center'}
            >
                    {events?.map((event: ActivityDatabase) => (
                        <EventCard
                            key={event._id}
                            event={event}
                        />
                    ))}
                {
                    !hasReachedLastPage &&
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
        </Container>
    );
}

export default MyEventsList;