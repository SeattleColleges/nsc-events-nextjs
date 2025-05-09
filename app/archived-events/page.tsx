'use client';

import useAuth from "@/hooks/useAuth";
import EventCard from "@/components/EventCard";
import { useArchivedEvents } from "@/utility/queries";
import { ActivityDatabase } from "@/models/activityDatabase";
import { Button, Container, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import UnauthorizedPageMessage from "@/components/UnauthorizedPageMessage";
import Link from "next/link";

const ArchivedEvents = () => {
    const { isAuth, user } = useAuth();
    const [page, setPage] = useState(1);
    const [hasReachedLastPage, setHasReachedLastPage] = useState(false);
    const [events, setEvents] = useState<ActivityDatabase[]>([]);
    const { data } = useArchivedEvents(page, true);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  
    useEffect(() => {
        if (data) {
            setEvents((prevEvents) => [...prevEvents, ...data]);
            setHasReachedLastPage(data.length < 5);
        }
    }, [data]);
const handleLoadMoreEvents = () => {
  setPage((page) => page + 1);
};

if (isAuth && (user?.role === 'admin' || user?.role === 'creator')) {
    return (
        <Container maxWidth={false} className="bg-solid">
            <Typography
                fontSize={isMobile ? "1.75rem" : "2.25rem"}
                textAlign={"center"}
                padding={"1rem"}
                marginTop={"1rem"}
                marginBottom={"1rem"}
            >Archived Events</Typography>
            <Grid
              container
              direction={"column"}
              spacing={1}
              alignItems={"center"}
              justifyItems={"center"}
            >
                {events?.map((event: ActivityDatabase) => (
                  <Grid key={event._id} sx={{ width: isMobile ? "100%" : "60%" }} size={12}>
                    <Link key={event._id} href={
                        {
                            pathname: "/event-detail",
                            query: {
                                id: event._id,
                                events: JSON.stringify(events.map(e => e._id)),
                                from: 'archived',
                                page: page
                            },
                        }
                    }>
                        <EventCard event={event}/>
                    </Link>
                  </Grid>
                ))}
              {!hasReachedLastPage && (
                <Button
                  onClick={handleLoadMoreEvents}
                  type='button'
                  variant="contained"
                  color="primary"
                  style={{
                    textTransform: "none",
                    margin: '1em auto',
                  }}
                >
                  Load more events
                </Button>
              )}
            </Grid>
        </Container>
    );
} else {
    return <UnauthorizedPageMessage />;
  }
};

export default ArchivedEvents;