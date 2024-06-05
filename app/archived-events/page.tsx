"use client";

import useAuth from "@/hooks/useAuth";
import styles from "@/app/home.module.css";
import EventCard from "@/components/EventCard";
import UnauthorizedPages from "@/components/UnauthorizedPages";
import { useArchivedEvents } from "@/utility/queries";
import { ActivityDatabase } from "@/models/activityDatabase";
import { Button, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

const ArchivedEvents = () => {
  const { isAuth, user } = useAuth();

  // check if user is authorized to access page
  if (isAuth && (user?.role === 'admin' || user?.role === 'creator')) {
    const [page, setPage] = useState(1);
    const [hasReachedLastPage, setHasReachedLastPage] = useState(false);
    const [events, setEvents] = useState<ActivityDatabase[]>([]);
    const { data } = useArchivedEvents(page);

    useEffect(() => {
      if (data) {
        setEvents((prevEvents) => [...prevEvents, ...data]);
        setHasReachedLastPage(data.length < 5);
      }
    }, [data]);

    const handleLoadMoreEvents = () => {
      setPage((page) => page + 1);
    };

    return (
      <Container maxWidth={false} className={styles.container}>
        <p className={styles.title}>Archived Events</p>
        <Grid
          container
          direction={'column'}
          spacing={1}
          alignItems={'center'}
          justifyItems={'center'}
        >
          {events?.map((event: ActivityDatabase) => (
            <EventCard key={event._id} event={event} />
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
    return <UnauthorizedPages />;
  }
};

export default ArchivedEvents;
