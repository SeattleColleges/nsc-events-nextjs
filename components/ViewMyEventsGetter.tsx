'use client';

import { ActivityDatabase } from "@/models/activityDatabase";
import { Button, Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { useMyEvents } from "@/utility/queries";
import { getCurrentUserId } from "@/utility/userUtils";
import Link from "next/link";

export function MyEventsList() {
    const [events, setEvents] = useState<ActivityDatabase[]>([]);
    const [page, setPage] = useState(1);
    const [hasReachedLastPage, setHasReachedLastPage] = useState(false)
    const { data } = useMyEvents(getCurrentUserId(), page, true);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
    
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
                direction={"column"}
                spacing={1}
                alignItems={"center"}
                justifyItems={"center"}
              >
                  {events?.map((event: ActivityDatabase) => (
                    <Grid item xs={12} key={event._id} sx={{ width: isMobile ? "100%" : "60%" }}>
                        <Link key={event._id} href={
                            {
                                pathname: "/event-detail",
                                query: {
                                    id: event._id,
                                    events: JSON.stringify(events.map(e => e._id)),
                                    from: 'mine',
                                    page: page,
                                },
                            }
                        } >
                        <EventCard
                            event={event} />
                        </Link>
                    </Grid>
                ))}
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